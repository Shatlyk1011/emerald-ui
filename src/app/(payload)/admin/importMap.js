import { FaviconPreviewField } from '@/app/(payload)/components/FaviconPreviewField'
import { ImagePreviewField } from '@/app/(payload)/components/ImagePreviewField'

export const importMap = {
  '@/app/(payload)/components/ImagePreviewField#ImagePreviewField': () =>
    import('@/app/(payload)/components/ImagePreviewField').then((m) => (
      <ImagePreviewField />
    )),
  '@/app/(payload)/components/FaviconPreviewField#FaviconPreviewField': () =>
    import('@/app/(payload)/components/FaviconPreviewField').then((m) => (
      <FaviconPreviewField />
    )),
}
