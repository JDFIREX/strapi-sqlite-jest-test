import { cleanupStrapi } from "./helpers/strapi"

const teardown = async () => {
  await cleanupStrapi()
}

export default teardown
