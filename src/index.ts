import bootstrap from "./extensions/users-permissions/bootstrap"
import callback from "./extensions/users-permissions/controllers/callback"
import { register, run } from "./extensions/users-permissions/services/providers-registry"
import { dbLifecyclesSubscribe } from "./services"

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register() {
    strapi.service("plugin::upload.image-manipulation").isSupportedImage = () => false
    strapi.service("plugin::upload.image-manipulation").isImage = () => false
    strapi.service("plugin::upload.image-manipulation").generateThumbnail = () => {}
    strapi.service("plugin::upload.image-manipulation").generateResponsiveFormats = () => {}
    strapi.service("plugin::users-permissions.providers-registry").register = (
      providerName,
      provider
    ) => register(providerName, provider)
    strapi.service("plugin::users-permissions.providers-registry").run = ({
      provider,
      accessToken,
      query,
      providers
    }) => run({ provider, accessToken, query, providers })
    strapi.plugins["users-permissions"].bootstrap = () => bootstrap({ strapi })
    strapi.controllers["plugin::users-permissions.auth"].callback = (ctx) => callback(ctx)
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    strapi.db.lifecycles.subscribe(dbLifecyclesSubscribe)
  }
}
