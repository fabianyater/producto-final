import { NextFunction, Response } from "express";
import Permission from "../../modules/permissions/Permissions";
import { AuthenticatedRequest } from "./types";

export const checkPermission = (
  functionName: string,
  requiredPermission: string
) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId } = req.user as { userId: string };

      const permission = await Permission.findOne({
        functionName,
        userId,
        permissions: requiredPermission,
      });

      if (!permission) {
        res.status(403).json({ message: "Acceso denegado" });
      }

      next();
    } catch (error) {
      console.error("Error en checkPermission:", error);
      res.status(500).json({ message: "Error en la verificación de permisos" });
    }
  };
};

export default checkPermission;
