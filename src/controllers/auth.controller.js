// api/src/controllers/auth.controller.js
import AuthService from '../services/auth.service.js';

export default {
  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'email & password required' });
    }
    try {
      const { user, accessToken, refreshToken } = await AuthService.login({ email, password });
      return res.json({ user, accessToken, refreshToken });
    } catch {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  },

  async refresh(req, res) {
    const { userId, refreshToken } = req.body;
    if (!userId || !refreshToken) {
      return res.status(400).json({ message: 'userId & refreshToken required' });
    }
    try {
      const { accessToken, refreshToken: newRefresh } = await AuthService.refresh(userId, refreshToken);
      return res.json({ accessToken, refreshToken: newRefresh });
    } catch {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
  }
};
