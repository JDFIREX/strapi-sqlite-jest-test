import { createUser } from "../users/factory"
import {
  createDocumentWithTypeAndNameAndRegulationFile,
  createRegulationFile,
  findDocumentsByVuid,
  getDocumentById,
  getDocumentFolderById,
  getDocumentsFolder
} from "./factory"

describe(`Documents`, () => {
  jest.setTimeout(50000)
  let user
  let jwt

  beforeAll(async () => {
    user = await createUser({})
    jwt = strapi.plugins["users-permissions"].services.jwt.issue({
      id: user.id
    })
  })

  it("Check Documents DB", async () => {
    const documents = await strapi.entityService.findMany("api::document.document")
    expect(strapi).toBeDefined()
    expect(documents).toHaveLength(0)
  })

  it("Should create document", async () => {
    const regulationFile = await createRegulationFile()

    const document = await createDocumentWithTypeAndNameAndRegulationFile(
      "Procedura",
      "dokument-1",
      regulationFile.id
    )

    const documentsFolder = await getDocumentsFolder()
    const documentFolder = await getDocumentFolderById(document.folderId)

    expect(document.id).toEqual(1)
    expect(documentFolder).toBeDefined()
    expect(documentFolder.name).toEqual(document.name)
    expect(documentFolder.parent.id).toEqual(documentsFolder.id)
  })

  it("Should not create document - name already exists", async () => {
    const regulationFile = await createRegulationFile()
    const name = "document-duplicated-name"

    const created = await createDocumentWithTypeAndNameAndRegulationFile(
      "Procedura",
      name,
      regulationFile.id
    )
    expect(created).toBeDefined()

    const notCreated = async () =>
      strapi.entityService.create("api::document.document", {
        data: {
          type: "Regulamin",
          documentLinks: [],
          name,
          startDate: "2023-03-31",
          regulation: regulationFile.id
        }
      })

    try {
      await notCreated()
      expect(true).toBe(false)
    } catch (error) {
      expect(error.message).toEqual(
        `Dokument o nazwie: ${name} już istnieje, nazwa powinna być unikatowa dla dokumentów`
      )
    }
  })

  it("Should update current document version", async () => {
    const regulationFile = await createRegulationFile()

    const document = await createDocumentWithTypeAndNameAndRegulationFile(
      "Procedura",
      "dokument-2",
      regulationFile.id
    )

    const documentUpdated = await strapi.db.query("api::document.document").update({
      where: {
        id: document.id
      },
      data: {
        name: "dokument-2-updated"
      }
    })

    const documentVersions = await findDocumentsByVuid(document.vuid)

    const documentFolder = await getDocumentFolderById(document.folderId)

    expect(documentFolder).toBeDefined()
    expect(documentUpdated.versionNumber).toEqual(1)
    expect(documentUpdated.vuid).toEqual(document.vuid)
    expect(document.versionNumber).toEqual(1)
    expect(documentFolder.name).toEqual(documentUpdated.name)
    expect(documentVersions).toHaveLength(1)
    expect(documentFolder.name).not.toEqual(document.name)
  })

  it("Should create new version of document", async () => {
    const regulationFile = await createRegulationFile()

    const document = await createDocumentWithTypeAndNameAndRegulationFile(
      "Procedura",
      "dokument-2",
      regulationFile.id
    )

    expect(document).toBeDefined()
    expect(document.vuid).toBeDefined()
    expect(document.versionNumber).toEqual(1)

    const { id, ...rest } = document

    const documentNewVersions = await strapi.entityService.create("api::document.document", {
      data: {
        ...rest,
        name: "dokument-2-updated-new-version",
        type: "Regulamin",
        versionNumber: 2,
        regulation: regulationFile.id,
        startDate: "2024-06-30",
        publishedAt: undefined
      }
    })

    expect(documentNewVersions).toBeDefined()
    expect(documentNewVersions.vuid).toBeDefined()
    expect(documentNewVersions.vuid).toEqual(document.vuid)
    expect(documentNewVersions.versionNumber).toEqual(2)

    const documentVersions = await findDocumentsByVuid(document.vuid)

    expect(documentVersions).toHaveLength(2)

    const documentFolder = await getDocumentFolderById(document.folderId)

    expect(documentFolder).toBeDefined()
    expect(documentFolder.name).not.toEqual(documentNewVersions.name)
    expect(documentFolder.name).toEqual(document.name)
  })

  it("Should create new version of document with duplicated name", async () => {
    const regulationFile = await createRegulationFile()

    const document = await createDocumentWithTypeAndNameAndRegulationFile(
      "Procedura",
      "dokument-duplicate-new-version",
      regulationFile.id
    )

    expect(document).toBeDefined()
    expect(document.vuid).toBeDefined()
    expect(document.versionNumber).toEqual(1)

    const { id, ...rest } = document

    const documentNewVersions = await strapi.entityService.create("api::document.document", {
      data: {
        ...rest,
        type: "Regulamin",
        versionNumber: 2,
        regulation: regulationFile.id,
        startDate: "2024-06-30",
        publishedAt: undefined
      }
    })

    expect(documentNewVersions).toBeDefined()
    expect(documentNewVersions.vuid).toBeDefined()
    expect(documentNewVersions.vuid).toEqual(document.vuid)
    expect(documentNewVersions.versionNumber).toEqual(2)

    const documentVersions = await findDocumentsByVuid(document.vuid)

    expect(documentVersions).toHaveLength(2)

    const documentFolder = await getDocumentFolderById(document.folderId)

    expect(documentFolder).toBeDefined()
    expect(documentFolder.name).toEqual(documentNewVersions.name)
    expect(documentFolder.name).toEqual(document.name)
  })

  it("Should update new version of document and change folder name after published new version", async () => {
    const regulationFile = await createRegulationFile()

    const document = await createDocumentWithTypeAndNameAndRegulationFile(
      "Procedura",
      "dokument-3",
      regulationFile.id
    )

    const { id, ...rest } = document

    const documentNewVersions = await strapi.entityService.create("api::document.document", {
      data: {
        ...rest,
        name: "dokument-3-updated-new-version",
        type: "Regulamin",
        versionNumber: 2,
        regulation: regulationFile.id,
        startDate: "2024-06-30",
        publishedAt: undefined
      }
    })

    const { id: idNewVersions, ...restNewVersions } = documentNewVersions

    const documentNewVersionsUpdated = await strapi.db.query("api::document.document").update({
      where: {
        id: documentNewVersions.id
      },
      data: {
        ...restNewVersions,
        publishedAt: new Date().toISOString()
      }
    })

    expect(documentNewVersionsUpdated).toBeDefined()
    expect(documentNewVersionsUpdated.vuid).toBeDefined()
    expect(documentNewVersionsUpdated.vuid).toEqual(document.vuid)
    expect(documentNewVersionsUpdated.versionNumber).toEqual(2)

    const documentVersions = await findDocumentsByVuid(document.vuid)

    expect(documentVersions).toHaveLength(2)

    const documentFolder = await getDocumentFolderById(document.folderId)

    expect(documentFolder).toBeDefined()
    expect(documentFolder.name).toEqual(documentNewVersionsUpdated.name)
    expect(documentFolder.name).not.toEqual(document.name)
  })
})
