module.exports = {
  HOST: process.env.HOST || "localhost",
  USER: process.env.User || "",
  PASSWORD: process.env.Password || "123",
  DB: process.env.Database || "testdb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
