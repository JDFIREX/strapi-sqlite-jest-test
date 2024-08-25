export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 8080),
  url: env("APP_URL"),
  app: {
    keys: env.array("APP_KEYS")
  },
  cron: {
    enabled: true
  }
})
