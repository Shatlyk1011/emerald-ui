import { AdditionalMediaPreviewField } from '@/app/(payload)/components/AdditionalMediaPreviewField';
import { FaviconPreviewField } from '@/app/(payload)/components/FaviconPreviewField';
import { ImagePreviewField } from '@/app/(payload)/components/ImagePreviewField';
import { MediaUploadField } from '@/app/(payload)/components/MediaUploadField';







export const importMap = {
  '@/app/(payload)/components/ImagePreviewField#ImagePreviewField': () =>
    import('@/app/(payload)/components/ImagePreviewField').then(() => (
      <ImagePreviewField />
    )),
  '@/app/(payload)/components/FaviconPreviewField#FaviconPreviewField': () =>
    import('@/app/(payload)/components/FaviconPreviewField').then(() => (
      <FaviconPreviewField />
    )),
  '@/app/(payload)/components/MediaUploadField#MediaUploadField': () =>
    import('@/app/(payload)/components/MediaUploadField').then(() => (
      <MediaUploadField />
    )),
  '@/app/(payload)/components/AdditionalMediaPreviewField#AdditionalMediaPreviewField':
    () =>
      import('@/app/(payload)/components/AdditionalMediaPreviewField').then(
        () => <AdditionalMediaPreviewField />
      ),
}
