import { OpenSourceProject } from '@/payload-types'
import { IBaseFields } from '.'

export interface IOpenSourceComponents extends IBaseFields {
  docs: OpenSourceProject[]
}
