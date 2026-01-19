import { IBaseFields } from '.'
import { InspirationWebsite, Category, WebsiteStyle } from '../../payload-types'

export interface IWebsites extends IBaseFields {
  docs: InspirationWebsite[]
}

export interface ICategories extends IBaseFields {
  docs: Category[]
}

export interface IWebsiteStyles extends IBaseFields {
  docs: WebsiteStyle[]
}
