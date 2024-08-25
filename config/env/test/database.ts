export default ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: env("DATABASE_FILENAME", ".tmp/data.db")
    },
    useNullAsDefault: true,
    debug: false,
    pool: {
      min: 0,
      max: 1
    }
  }
})
