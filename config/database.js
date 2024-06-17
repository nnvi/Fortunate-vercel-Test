

const {
  PGHOST = "localhost",
  PGPORT = "5432",
  PGUSER = "postgres",
  PGPASSWORD = "fendys",
  PGDATABASE = "fortunate-coffee",

  // RPGHOST = "viaduct.proxy.rlwy.net",
  // RPGPORT = "54940",
  // RPGUSER = "postgres",
  // RPGPASSWORD = "HhYtTjHIxVqDQsGbLAwmkLJXQDnTKdDA",
  // RPGDATABASE = "railway",

  POSTGRES_URL="postgres://default:TIdk9BSof5Mu@ep-wild-base-a1x1pls8-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require",
  POSTGRES_PRISMA_URL="postgres://default:TIdk9BSof5Mu@ep-wild-base-a1x1pls8-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15",
  POSTGRES_URL_NO_SSL="postgres://default:TIdk9BSof5Mu@ep-wild-base-a1x1pls8-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb",
  POSTGRES_URL_NON_POOLING="postgres://default:TIdk9BSof5Mu@ep-wild-base-a1x1pls8.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require",
  POSTGRES_USER="default",
  POSTGRES_HOST="ep-wild-base-a1x1pls8-pooler.ap-southeast-1.aws.neon.tech",
  POSTGRES_PASSWORD="TIdk9BSof5Mu",
  POSTGRES_DATABASE="verceldb",
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
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
    host: POSTGRES_HOST,
    dialect: 'postgres',
    dialectModule: pg,
    port: PGPORT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
}