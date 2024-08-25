export const permissions = {
  permissions: {
    "api::document": {
      controllers: {
        document: {
          findOne: {
            enabled: true,
            policy: ""
          },
          find: {
            enabled: true,
            policy: ""
          },
          create: {
            enabled: true,
            policy: ""
          },
          update: {
            enabled: true,
            policy: ""
          },
          delete: {
            enabled: true,
            policy: ""
          }
        }
      }
    },
    "plugin::content-type-builder": {
      controllers: {
        components: {
          getComponents: {
            enabled: true,
            policy: ""
          },
          getComponent: {
            enabled: true,
            policy: ""
          }
        },
        "content-types": {
          getContentTypes: {
            enabled: true,
            policy: ""
          },
          getContentType: {
            enabled: true,
            policy: ""
          }
        }
      }
    },
    "plugin::email": {
      controllers: {
        email: {
          send: {
            enabled: true,
            policy: ""
          }
        }
      }
    },
    "plugin::upload": {
      controllers: {
        "content-api": {
          find: {
            enabled: true,
            policy: ""
          },
          findOne: {
            enabled: true,
            policy: ""
          },
          destroy: {
            enabled: true,
            policy: ""
          },
          upload: {
            enabled: true,
            policy: ""
          }
        }
      }
    },
    "plugin::content-versioning": {
      controllers: {
        client: {
          create: {
            enabled: true,
            policy: ""
          },
          findAllForUser: {
            enabled: true,
            policy: ""
          }
        }
      }
    },
    "plugin::users-permissions": {
      controllers: {
        auth: {
          callback: {
            enabled: true,
            policy: ""
          },
          changePassword: {
            enabled: true,
            policy: ""
          },
          resetPassword: {
            enabled: true,
            policy: ""
          },
          connect: {
            enabled: true,
            policy: ""
          },
          forgotPassword: {
            enabled: true,
            policy: ""
          },
          register: {
            enabled: true,
            policy: ""
          },
          emailConfirmation: {
            enabled: true,
            policy: ""
          },
          sendEmailConfirmation: {
            enabled: true,
            policy: ""
          }
        },
        user: {
          create: {
            enabled: true,
            policy: ""
          },
          update: {
            enabled: true,
            policy: ""
          },
          find: {
            enabled: true,
            policy: ""
          },
          findOne: {
            enabled: true,
            policy: ""
          },
          count: {
            enabled: true,
            policy: ""
          },
          destroy: {
            enabled: true,
            policy: ""
          },
          me: {
            enabled: true,
            policy: ""
          }
        },
        role: {
          createRole: {
            enabled: true,
            policy: ""
          },
          findOne: {
            enabled: true,
            policy: ""
          },
          find: {
            enabled: true,
            policy: ""
          },
          updateRole: {
            enabled: true,
            policy: ""
          },
          deleteRole: {
            enabled: true,
            policy: ""
          }
        },
        permissions: {
          getPermissions: {
            enabled: true,
            policy: ""
          }
        }
      }
    },
    "plugin::publisher": {
      controllers: {
        actionController: {
          find: {
            enabled: true,
            policy: ""
          },
          create: {
            enabled: true,
            policy: ""
          },
          update: {
            enabled: true,
            policy: ""
          },
          delete: {
            enabled: true,
            policy: ""
          }
        }
      }
    },
    "plugin::i18n": {
      controllers: {
        locales: {
          listLocales: {
            enabled: true,
            policy: ""
          }
        }
      }
    }
  }
}
