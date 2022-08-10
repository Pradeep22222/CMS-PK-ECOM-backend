import AdminUserSchema from "./adminUserSchema.js";
// insert User
export const insertAdminUser = (obj) => {
  return AdminUserSchema(obj).save();
};
