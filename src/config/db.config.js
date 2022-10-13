/*
pool is optional, it will be used for Sequelize connection pool configuration:
  max: maximum number of connection in pool
  min: minimum number of connection in pool
  idle: maximum time, in milliseconds, that a connection can be idle before being released
  acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error
*/

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER || process.env.MYSQLDB_USER,
  PASSWORD: process.env.DB_PASSWORD || process.env.MYSQLDB_ROOT_PASSWORD,
  DB: process.env.DB_NAME || process.env.MYSQLDB_DATABASE,
  port: process.env.DB_PORT || process.env.MYSQLDB_DOCKER_PORT,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
