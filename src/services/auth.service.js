// api/src/services/auth.service.js
import bcrypt               from 'bcryptjs';
import ms                   from 'ms';
import crypto               from 'crypto';
import { Users, RefreshTokens } from '../models/index.js';
import { signToken }        from '../middleware/auth.js';
import ACLService           from './acl.service.js';

const ACCESS_EXP  = process.env.JWT_EXPIRES       || '15m';
const REFRESH_EXP = process.env.REFRESH_EXPIRES   || '7d';
const SALT        = 10;

export default class AuthService {
  /** Creates access + refresh tokens and returns user payload with permissions */
  static async issueTokens(userRecord) {
    /* 1️⃣  Get effective permissions */
    const permsSet = await ACLService.getPermissionsForUser(userRecord.id, userRecord.roleId);
    const permissions = Array.from(permsSet);           // ['users:create', 'view_dashboard', …]

    /* 2️⃣  Access token */
    const payload     = { id: userRecord.id, roleId: userRecord.roleId, email: userRecord.email };
    const accessToken = signToken(payload, ACCESS_EXP);

    /* 3️⃣  Refresh token */
    const plainRefresh = crypto.randomUUID();
    const tokenHash    = await bcrypt.hash(plainRefresh, SALT);
    const expiresAt    = new Date(Date.now() + ms(REFRESH_EXP));

    await RefreshTokens.create({ userId: userRecord.id, tokenHash, expiresAt });

    /* 4️⃣  Return consolidated object */
    return {
      user: {
        id:          userRecord.id,
        fullName:    userRecord.fullName,
        email:       userRecord.email,
        roleId:      userRecord.roleId,
        permissions  // ← array for the frontend sidebar
      },
      accessToken,
      refreshToken: plainRefresh
    };
  }

  /** Login with email & password, returns tokens + user data */
  static async login({ email, password }) {
    const userRecord = await Users.findOne({ where: { email, isActive: true } });
    if (!userRecord) throw new Error('Invalid credentials');

    const ok = await bcrypt.compare(password, userRecord.passwordHash);
    if (!ok) throw new Error('Invalid credentials');

    return this.issueTokens(userRecord);
  }

  /** Refresh flow: validate, rotate, issue new tokens */
  static async refresh(userId, refreshToken) {
    const rows = await RefreshTokens.findAll({ where: { userId } });

    let matchedRow = null;
    for (const row of rows) {
      const ok = await bcrypt.compare(refreshToken, row.tokenHash);
      if (ok && row.expiresAt > new Date()) { matchedRow = row; break; }
    }
    if (!matchedRow) throw new Error('Invalid refresh token');

    // rotation
    await matchedRow.destroy();
    const userRecord = await Users.findByPk(userId);
    return this.issueTokens(userRecord);
  }
}
