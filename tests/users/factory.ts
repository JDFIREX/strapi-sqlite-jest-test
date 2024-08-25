import { permissions } from "./permissions"

/**
 * Default data that factory use
 */
export const defaultData = {
  password: "1234Abc",
  provider: "local",
  confirmed: true
}

/**
 * Returns random username object for user creation
 * @param {object} options that overwrites default options
 * @returns {object} object that is used with `strapi.plugins["users-permissions"].services.user.add`
 */
export const mockUserData = (options = {}) => {
  const usernameSuffix = Math.round(Math.random() * 10000).toString()
  return {
    username: `tester${usernameSuffix}`,
    email: `tester${usernameSuffix}@strapi.com`,
    ...defaultData,
    ...options
  }
}

/**
 * Creates new user in strapi database
 * @param data
 * @returns {object} object of new created user, fetched from database
 */
export const createUser = async (data) => {
  /** Gets the default user role */
  const pluginStore = await strapi.store({
    type: "plugin",
    name: "users-permissions"
  })

  const settings = (await pluginStore.get({
    key: "advanced"
  })) as Record<string, unknown>

  const defaultRole = await strapi
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: settings.default_role } })

  const user = await strapi
    .plugin("users-permissions")
    .service("user")
    .add({
      ...mockUserData(),
      ...data,
      role: defaultRole ? defaultRole.id : null
    })

  if (defaultRole.id) {
    await strapi.plugins["users-permissions"].services.role.updateRole(defaultRole.id, permissions)
  }

  return user
}
