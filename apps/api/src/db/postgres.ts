import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || "dropbox_db", 
  process.env.POSTGRES_USER || "root",
  process.env.POSTGRES_PASSWORD || "root", 
  {
    host: process.env.POSTGRES_HOST || "localhost",
    dialect: "postgres",
    logging: false, 
  }
);
const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, connectDatabase };
