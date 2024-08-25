import assert from "assert"
import purest from "purest"

const getInitialProviders = () => ({
  async keycloak({ accessToken }) {
    const keycloakAuthServerUrl = process.env.KEYCLOAK_AUTH_SERVER_URL || ""
    const subdomainUrlWithRealm = `${process.env.KEYCLOAK_AUTH_SUBDOMAIN}/realms/${process.env.KEYCLOAK_REALM}`
    const keycloak = purest({ provider: "keycloak" })
    const origin = keycloakAuthServerUrl.includes("https") ? "https" : "http"

    return keycloak
      .origin(`${origin}://${subdomainUrlWithRealm}`)
      .get(`protocol/openid-connect/userinfo`)
      .auth(accessToken)
      .request()
      .then((response) => {
        const {
          given_name: name,
          family_name: surname,
          email
        } = response.body as Record<string, unknown>
        return {
          name,
          surname,
          email
        }
      })
  }
})

export const register = (providerName, provider) => {
  const providersCallbacks = getInitialProviders()
  assert(typeof providerName === "string", "Provider name must be a string")
  assert(typeof provider === "function", "Provider callback must be a function")

  providersCallbacks[providerName] = provider({ purest })
}

export const run = async ({ provider, accessToken, query, providers }) => {
  const providersCallbacks = getInitialProviders()
  if (!providersCallbacks[provider]) {
    throw new Error("Unknown provider.")
  }

  const providerCb = providersCallbacks[provider]
  return providerCb({ accessToken, query, providers })
}
