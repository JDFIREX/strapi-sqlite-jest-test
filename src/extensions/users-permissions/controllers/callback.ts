import _ from "lodash"

import { validateCallbackBody } from "@strapi/plugin-users-permissions/server/controllers/validation/auth"
import { getService } from "@strapi/plugin-users-permissions/server/utils"
import utils from "@strapi/utils"

const { sanitize } = utils
const { ApplicationError, ValidationError, ForbiddenError } = utils.errors

const sanitizeUser = (user, ctx) => {
  const { auth } = ctx.state
  const userSchema = strapi.getModel("plugin::users-permissions.user")

  return sanitize.contentAPI.output(user, userSchema, { auth })
}

const callback = async (ctx) => {
  const provider = ctx.params.provider || "local"
  const params = ctx.request.body

  const store = strapi.store({ type: "plugin", name: "users-permissions" })
  const grantSettings = await store.get({ key: "grant" })

  const grantProvider = provider === "local" ? "email" : provider

  if (!_.get(grantSettings, [grantProvider, "enabled"])) {
    throw new ApplicationError("This provider is disabled")
  }

  if (provider === "local") {
    await validateCallbackBody(params)

    const { identifier } = params

    // Check if the user exists.
    const user = await strapi.query("plugin::users-permissions.user").findOne({
      where: {
        provider,
        $or: [{ email: identifier.toLowerCase() }, { username: identifier }]
      }
    })

    if (!user) {
      throw new ValidationError("Invalid identifier or password")
    }

    if (!user.password) {
      throw new ValidationError("Invalid identifier or password")
    }

    const validPassword = await getService("user").validatePassword(params.password, user.password)

    if (!validPassword) {
      throw new ValidationError("Invalid identifier or password")
    }

    const advancedSettings = await store.get({ key: "advanced" })
    const requiresConfirmation = _.get(advancedSettings, "email_confirmation")

    if (requiresConfirmation && user.confirmed !== true) {
      throw new ApplicationError("Your account email is not confirmed")
    }

    if (user.blocked === true) {
      throw new ApplicationError("Your account has been blocked by an administrator")
    }

    return ctx.send({
      jwt: getService("jwt").issue({ id: user.id }),
      user: await sanitizeUser(user, ctx)
    })
  }

  // Connect the user with the third-party provider.
  try {
    let user = await getService("providers").connect(provider, ctx.request.body.body)

    if (user.blocked) {
      throw new ForbiddenError("Your account has been blocked by an administrator")
    }

    const { token } = ctx.request.body.body

    if (!token) {
      throw new ForbiddenError("Provider token cannot be empty")
    }

    user = await strapi.service("plugin::users-permissions.user").edit(user.id, {
      providerToken: token
    })

    return ctx.send({
      jwt: getService("jwt").issue({ id: user.id }),
      user: await sanitizeUser(user, ctx)
    })
  } catch (error) {
    throw new ApplicationError(error.message)
  }
}

export default callback
