import { IBaseFields } from "."

export interface IWebsite {
  title: string
  description: string
  category: string
  style: string
  pageUrl: string
  mode: "dark" | 'light' | 'hybrid'
  imgUrl?: string
  faviconUrl?: string
}

export interface IWebsites extends IBaseFields {
  docs: IWebsite[];
}
