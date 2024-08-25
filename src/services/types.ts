import { Model } from "@strapi/database/lib/schema"

export type Action =
  | "beforeCreate"
  | "afterCreate"
  | "beforeFindOne"
  | "afterFindOne"
  | "beforeFindMany"
  | "afterFindMany"
  | "beforeCount"
  | "afterCount"
  | "beforeCreateMany"
  | "afterCreateMany"
  | "beforeUpdate"
  | "afterUpdate"
  | "beforeUpdateMany"
  | "afterUpdateMany"
  | "beforeDelete"
  | "afterDelete"
  | "beforeDeleteMany"
  | "afterDeleteMany"

export interface Params<T> {
  select?: unknown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  where?: any
  _q?: unknown
  orderBy?: unknown
  groupBy?: unknown
  offset?: unknown
  limit?: unknown
  populate?: unknown
  data?: Partial<T>
}

export interface Event<T> {
  action: Action
  model: Model
  params: Params<T>
  result: T
}
