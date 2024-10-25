import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IPermission extends Document {
  functionName: string;
  userId: Types.ObjectId;
  role: string;
  permissions: Array<"read" | "write" | "delete" | "update">;
}

const permissionSchema: Schema<IPermission> = new mongoose.Schema({
  functionName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, required: true },
  permissions: [{ type: String, enum: ["read", "write", "delete", "update"] }],
});

const Permission: Model<IPermission> = mongoose.model<IPermission>(
  "Permission",
  permissionSchema
);

export default Permission;
