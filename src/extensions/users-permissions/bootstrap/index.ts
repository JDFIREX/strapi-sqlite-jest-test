/* eslint @typescript-eslint/no-var-requires: 0 */

import crypto from "crypto"
import _ from "lodash"

import getGrantConfig from "./grant-config"

const usersPermissionsActions = require("@strapi/plugin-users-permissions/server/bootstrap/users-permissions-actions")
const { getService } = require("@strapi/plugin-users-permissions/server/utils")
const urljoin = require("url-join")

const initGrant = async (pluginStore) => {
  const apiPrefix = strapi.config.get("api.rest.prefix")
  const baseURL = urljoin(strapi.config.server.url, apiPrefix, "auth")

  const grantConfig = getGrantConfig(baseURL)

  const prevGrantConfig = (await pluginStore.get({ key: "grant" })) || {}
  if (!prevGrantConfig || !_.isEqual(_.keys(prevGrantConfig), _.keys(grantConfig))) {
    _.keys(grantConfig).forEach((key) => {
      if (key in prevGrantConfig) {
        grantConfig[key] = _.merge(grantConfig[key], prevGrantConfig[key])
      }
    })
    await pluginStore.set({ key: "grant", value: grantConfig })
  }
}

const initEmails = async (pluginStore) => {
  if (!(await pluginStore.get({ key: "email" }))) {
    const value = {
      reset_password: {
        display: "Email.template.reset_password",
        icon: "sync",
        options: {
          from: {
            name: "Administration Panel",
            email: "no-reply@strapi.io"
          },
          response_email: "",
          object: "Reset password",
          message: `<p>We heard that you lost your password. Sorry about that!</p>

<p>But don’t worry! You can use the following link to reset your password:</p>
<p><%= URL %>?code=<%= TOKEN %></p>

<p>Thanks.</p>`
        }
      },
      email_confirmation: {
        display: "Email.template.email_confirmation",
        icon: "check-square",
        options: {
          from: {
            name: "Administration Panel",
            email: "no-reply@strapi.io"
          },
          response_email: "",
          object: "Account confirmation",
          message: `<p>Thank you for registering!</p>

<p>You have to confirm your email address. Please click on the link below.</p>

<p><%= URL %>?confirmation=<%= CODE %></p>

<p>Thanks.</p>`
        }
      }
    }

    await pluginStore.set({ key: "email", value })
  }
}

const initAdvancedOptions = async (pluginStore) => {
  if (!(await pluginStore.get({ key: "advanced" }))) {
    const value = {
      unique_email: true,
      allow_register: true,
      email_confirmation: false,
      email_reset_password: null,
      email_confirmation_redirection: null,
      default_role: "authenticated"
    }

    await pluginStore.set({ key: "advanced", value })
  }
}

export = async ({ strapi }) => {
  const pluginStore = strapi.store({ type: "plugin", name: "users-permissions" })

  await initGrant(pluginStore)
  await initEmails(pluginStore)
  await initAdvancedOptions(pluginStore)

  await strapi.admin.services.permission.actionProvider.registerMany(
    usersPermissionsActions.actions
  )

  await getService("users-permissions").initialize()

  if (!strapi.config.get("plugin.users-permissions.jwtSecret")) {
    if (process.env.NODE_ENV !== "development") {
      throw new Error(
        `Missing jwtSecret. Please, set configuration variable "jwtSecret" for the users-permissions plugin in config/plugins.js (ex: you can generate one using Node with \`crypto.randomBytes(16).toString('base64')\`).
For security reasons, prefer storing the secret in an environment variable and read it in config/plugins.js. See https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.html#configuration-using-environment-variables.`
      )
    }

    const jwtSecret = crypto.randomBytes(16).toString("base64")

    strapi.config.set("plugin.users-permissions.jwtSecret", jwtSecret)

    if (!process.env.JWT_SECRET) {
      const envPath = process.env.ENV_PATH || ".env"
      strapi.fs.appendFile(envPath, `JWT_SECRET=${jwtSecret}\n`)
      strapi.log.info(
        `The Users & Permissions plugin automatically generated a jwt secret and stored it in ${envPath} under the name JWT_SECRET.`
      )
    }
  }
}
