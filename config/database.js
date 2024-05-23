const {
  DB_USER = "postgres",
  DB_PASSWORD = "fendys",
  DB_NAME = "fortunate-coffee",
  DB_HOST = "postgresql://postgres:hCAYUZzpedqxfKwKUQnbdJGlVyECZkum@viaduct.proxy.rlwy.net:30775/railway",
  DB_PORT = "5432",
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres"
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres"
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres"
  }
}