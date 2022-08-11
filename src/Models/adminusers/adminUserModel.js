import AdminUserSchema from "./adminUserSchema.js";
// insert User
export const insertAdminUser = (obj) => {
  return AdminUserSchema(obj).save();
};
// update user
export const updateOneAdminUser = (filter, update) => {
  return AdminUserSchema.findOneAndUpdate(filter, update, { new: true });
};
export const findOneAdminUser = (filter) => {
  return AdminUserSchema.findOne(filter);
};
