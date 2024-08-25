export = (baseURL) => ({
  email: {
    enabled: true,
    icon: "envelope"
  },
  keycloak: {
    enabled: false,
    icon: "key",
    key: "",
    secret: "",
    oauth: 2,
    authorize_url: `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/auth`,
    access_url: `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
    callback: `/api/auth/keycloak/callback`,
    scope: ["openid"]
  }
})
