import Permission, { IPermission } from "./Permissions";

class PermissionsRepository {
  async getPermissions(
    userId?: string,
    role?: string
  ): Promise<IPermission[] | IPermission | null> {
    if (role === "admin") {
      // Si el rol es admin, trae todos los permisos.
      return (await Permission.find().lean().exec()) as IPermission[];
    } else {
      // De lo contrario, solo devuelve los permisos del usuario logueado.
      return (await Permission.findOne({ userId, role })
        .lean()
        .exec()) as IPermission | null;
    }
  }
}

export default new PermissionsRepository();
