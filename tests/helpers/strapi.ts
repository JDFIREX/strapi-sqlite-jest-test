import fs from "fs"

import strapi, { Strapi } from "@strapi/strapi"
import utils from "@strapi/typescript-utils"

let instance: Strapi

export const setupStrapi = async (): Promise<Strapi> => {
  if (!instance) {
    await utils.compile("")

    instance = await strapi({ distDir: "./dist" }).load()

    const { app } = instance.server
    app.use(instance.server.router.routes()).use(instance.server.router.allowedMethods())
  }
  return instance
}

export const cleanupStrapi = async () => {
  console.log(process.env.NODE_ENV)
  const dbSettings = instance.config.get("database.connection")
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const tmpDbFile = dbSettings.connection.filename

  instance.server.httpServer.close()

  await instance.db.connection.destroy()

  await instance.destroy()

  if (dbSettings && tmpDbFile) {
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile)
    }
  }
}
