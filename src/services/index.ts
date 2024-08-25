const FOLDER_TABLE_NAME = "upload_folders"
const FILE_TABLE_NAME = "files"
const COMPLEX_REGULATIONS_TABLE_NAME = "complex_regulations"
const COMPANY_REGULATIONS_TABLE_NAME = "company_regulations"
const REGULATIONS_TABLE_NAME = "regulations"
const UP_USERS_TABLE = "up_users"
const FACTORY_REGULATIONS_TABLE_NAME = "factory_regulations"
const INTERNAL_REGULATION_PERMISSIONS = "internal_regulation_permissions"

export const dbLifecyclesSubscribe = async (event) => {
  const modelName = event.model.tableName

  switch (modelName) {
    case FOLDER_TABLE_NAME:
      return event
    case FILE_TABLE_NAME:
      return event
    case COMPLEX_REGULATIONS_TABLE_NAME:
      return event
    case REGULATIONS_TABLE_NAME:
      return event
    case COMPANY_REGULATIONS_TABLE_NAME:
      return event
    case UP_USERS_TABLE:
      return event
    case FACTORY_REGULATIONS_TABLE_NAME:
      return event
    case INTERNAL_REGULATION_PERMISSIONS:
      return event
    default:
      return event
  }
}
