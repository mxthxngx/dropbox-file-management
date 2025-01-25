import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/postgres";

class FileMetadata extends Model {
  public id!: string;
  public fileName!: string;
  public fileType!: string;
  public fileSize!: number;
  public uploadedAt!: Date;
  public s3Path!: string; 
}

FileMetadata.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileSize: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    uploadedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    s3Path: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "FileMetadata",
    tableName: "file_metadata", 
    timestamps: false, 
  }
);

export default FileMetadata;