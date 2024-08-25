/* eslint @typescript-eslint/no-var-requires: 0 */
const crypto = require("crypto")

export default ({ env }) => ({
  "content-versioning": {
    enabled: true
  },
  "duplicate-button": true,
  "preview-button": {
    config: {
      contentTypes: [
        {
          uid: "api::article.article",
          draft: {
            url: "localhost:5173/articles/{id}/preview"
          }
        },
        {
          uid: "api::auction.auction",
          draft: {
            url: "localhost:5173/auctions/{id}/preview"
          }
        },
        {
          uid: "api::recruitment.recruitment",
          draft: {
            url: "localhost:5173/recruitments/{id}/preview"
          }
        }
      ]
    }
  },
  documentation: {
    enabled: true,
    config: {
      "x-strapi-config": {
        plugins: []
      },
      servers: [{ url: "http://localhost:8080/api/", description: "Development server" }]
    }
  },
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET") || crypto.randomBytes(16).toString("base64"),
      jwt: {
        expiresIn: "1h"
      }
    }
  },
  publisher: {
    enabled: true,
    config: {
      components: {
        dateTimePicker: {
          step: 30
        }
      },
      hooks: {
        beforePublish: async ({ strapi, uid, entity }) => {
          console.log("beforePublish")
        },
        afterPublish: async ({ strapi, uid, entity }) => {
          console.log("afterPublish")
        },
        beforeUnpublish: async ({ strapi, uid, entity }) => {
          console.log("beforeUnpublish")
        },
        afterUnpublish: async ({ strapi, uid, entity }) => {
          console.log("afterUnpublish")
        }
      }
    }
  }
})
