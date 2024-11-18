export interface AuthResponse {
  userId?: string;
  token: string;
  role: string;
  username: string;
  expirationTime?: number;
  permissions?: Array<{
    functionName: string;
    permissions: Array<"read" | "write" | "delete" | "update">;
  }>;
}
