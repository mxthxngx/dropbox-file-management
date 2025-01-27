import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/postgres";

class FileMetadata extends Model {
  public id!: string;
  public name!: string;
  public type!: string; 
  public size?: number;
  public uploadedAt?: Date;
  public s3Path?: string;
  public directoryPath!: string;
  public parentId?: string;
}

FileMetadata.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Value is "directory" for directories, file extension for files (pdf, txt, etc)'
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    uploadedAt: {
      type: DataTypes.DATE,
      allowNull: false, 
    },
    s3Path: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    directoryPath: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '/',
      validate: {
        endsWith(value: string) {
          if (!value.startsWith('/')) {
            throw new Error('Directory path must begin with /');
          }
        }
      }
    },
    parentPath: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        endsWith(value: string) {
          if (value!=null && !value.startsWith('/')) {
            throw new Error('Directory path must start with /');
          }
        }
      }
    }
  },
  {
    sequelize,
    modelName: "FileMetadata",
    tableName: "file_metadata",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['directoryPath', 'name'],
        name: 'unique_path_name'
      }
    ]
  }
);

export default FileMetadata;