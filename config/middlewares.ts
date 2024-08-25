export default [
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "img-src": ["'self'", "data:", "blob:", "strapi.io"],
          "media-src": ["'self'", "data:", "blob:", "strapi.io"],
          "connect-src": ["'self'", "https:"],
          upgradeInsecureRequests: null
        }
      }
    }
  },
  "strapi::cors",
  "strapi::errors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  {
    name: "strapi::session",
    config: {
      rolling: true,
      renew: true
    }
  },
  "strapi::favicon",
  "strapi::public"
]
