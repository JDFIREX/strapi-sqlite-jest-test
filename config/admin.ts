export default ({ env }) => ({
  secret: env("SERVE_ADMIN_PANEL", true),
  auth: {
    secret: env("ADMIN_JWT_SECRET")
  },
  apiToken: {
    salt: env("ADMIN_API_TOKEN_SALT")
  }
})
