const DB_USER = "unbook";
const DB_PASSWORD = "XS30zlzxhc7kOMwQ";

export default {
  mongoUrl:
    process.env.MONGO_URL ||
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@unbook.ypguopm.mongodb.net/test`,
  port: process.env.PORT || 3000,
};
