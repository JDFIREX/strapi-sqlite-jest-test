export const createRegulationFile = async () =>
  strapi.db.query("plugin::upload.file").create({
    data: {
      name: "regulation",
      alternativeText: null,
      caption: null,
      width: null,
      height: null,
      formats: null,
      hash: "regulation",
      ext: ".pdf",
      mime: "application/pdf",
      size: 409.37,
      url: "fake url",
      previewUrl: null,
      provider: "local",
      provider_metadata: null,
      folderPath: "/",
      createdAt: "2024-05-02T09:04:56.660Z",
      updatedAt: "2024-05-02T09:04:56.660Z"
    }
  })

export const getDocumentsFolder = async () =>
  strapi.db.query("plugin::upload.folder").findOne({
    where: {
      systemName: "documents"
    }
  })

export const findDocumentsByVuid = async (vuid) =>
  strapi.entityService.findMany("api::document.document", {
    filters: {
      vuid
    }
  })

export const getDocumentFolderById = async (id) =>
  strapi.db.query("plugin::upload.folder").findOne({
    where: {
      id
    },
    populate: ["parent"]
  })

export const getDocumentById = async (id) =>
  strapi.db.query("api::document.document").findOne({
    where: {
      id
    },
    populate: ["permissions", "permissions.groups"]
  })

export const createDocumentWithTypeAndNameAndRegulationFile = async (
  documentType,
  name,
  regulationFileId
) => {
  return strapi.entityService.create("api::document.document", {
    data: {
      type: documentType,
      documentLinks: [],
      name,
      startDate: "2024-05-31",
      regulation: regulationFileId
    }
  })
}
