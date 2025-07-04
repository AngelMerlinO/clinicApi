// api/src/services/auth.service.js
import bcrypt               from 'bcryptjs';
import ms                   from 'ms';
import crypto               from 'crypto';
import { Users, RefreshTokens } from '../models/index.js';
import { signToken }        from '../middleware/auth.js';

const ACCESS_EXP  = process.env.JWT_EXPIRES  || '15m';
const REFRESH_EXP = process.env.REFRESH_EXPIRES || '7d';
const SALT        = 10;

export default class AuthService {
  static async issueTokens(user) {
    const payload     = { id: user.id, fullName: user.fullName, email: user.email, roleId: user.roleId };
    const accessToken = signToken(payload, ACCESS_EXP);

    const plainRefresh = crypto.randomUUID();
    const tokenHash    = await bcrypt.hash(plainRefresh, SALT);
    const expiresAt    = new Date(Date.now() + ms(REFRESH_EXP));

    try {
      await RefreshTokens.create({ userId: user.id, tokenHash, expiresAt });
    } catch (err) {
      console.error('⚠️ RefreshTokens.create failed:', err.message);
      throw err;
    }

    return { user: payload, accessToken, refreshToken: plainRefresh };
  }

  static async login({ email, password }) {
    const userRecord = await Users.findOne({ where: { email, isActive: true } });
    if (!userRecord) throw new Error('Invalid credentials');

    const ok = await bcrypt.compare(password, userRecord.passwordHash);
    if (!ok) throw new Error('Invalid credentials');

    return this.issueTokens(userRecord);
  }

  static async refresh(userId, refreshToken) {
    const rows = await RefreshTokens.findAll({ where: { userId } });
    let matchedRow = null;
    for (const row of rows) {
      const ok = await bcrypt.compare(refreshToken, row.tokenHash);
      if (ok && row.expiresAt > new Date()) {
        matchedRow = row;
        break;
      }
    }
    if (!matchedRow) throw new Error('Invalid refresh token');

    await matchedRow.destroy();
    const userRecord = await Users.findByPk(userId);
    return this.issueTokens(userRecord);
  }
}
