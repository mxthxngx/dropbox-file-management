import { sequelize } from "../db/postgres";

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

export default syncDatabase;
