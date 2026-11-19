export type TUserRole = "customer" | "vendor" | "admin";

export type TUser = {
  name: string;
  email: string;
  image?: string | null;
  role: TUserRole;
};