const {
  PGHOST = "localhost",
  PGPORT = "5432",
  PGUSER = "postgres",
  PGPASSWORD = "fendys",
  PGDATABASE = "fortunate-coffee",
  DATABASE_URL = "postgresql://postgres:kesbltRkSgEBOQqcpOcMTjiDVCjrIIuo@roundhouse.proxy.rlwy.net:53506/railway"
} = process.env;

module.exports = {
  development: {
    username: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    host: PGHOST,
    port: PGPORT,
    dialect: "postgres"
  },
  test: {
    username: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    host: PGHOST,
    port: PGPORT,
    dialect: "postgres"
  },
  production: {
    username: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    host: PGHOST,
    port: PGPORT,
    dialect: "postgres",
    // Gunakan DATABASE_URL dari lingkungan produksi
    url: DATABASE_URL
  }
}