import { Roles } from "../user/types";
import Permission from "./Permissions";
import PermissionsRepository from "./repository";

type DefaultPermission = {
  functionName: string;
  permissions: Array<"read" | "write" | "delete" | "update">;
};

class PermissionService {
  assignDefaultPermissions = async (userId: string, role: Roles) => {
    let defaultPermissions: DefaultPermission[] = [];

    if (role === "researcher") {
      defaultPermissions = [
        {
          functionName: "agregar bitacora",
          permissions: ["read", "write", "delete", "update"],
        },
      ];
    } else if (role === "partner") {
      defaultPermissions = [
        {
          functionName: "agregar bitacora",
          permissions: ["read"],
        },
      ];
    }

    for (const permission of defaultPermissions) {
      await Permission.create({
        functionName: permission.functionName,
        userId,
        role,
        permissions: permission.permissions,
      });
    }
  };

  getPermissions = async (userId: string, role: string) => {
    const permissions = PermissionsRepository.getPermissions(userId, role);
    return permissions;
  };
}

export default new PermissionService();
