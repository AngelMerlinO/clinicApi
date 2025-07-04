# clinicApi
correr seeders 
npx sequelize-cli db:seed:all


ROLES :
Usuario ──(Login)──▶ AuthService.login
   │                      │
   ▼                      ▼
AccessToken 🔑        RefreshToken 🔁

AccessToken ──(Bearer Header)──▶ verifyToken ──▶ authorize('users:read')
                                             │
                                             └─▶ ACLService.getPermissionsForUser()
                                                   └─ permissions via Role + User
                                                        └─ validate access
