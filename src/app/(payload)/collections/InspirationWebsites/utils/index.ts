export function getFaviconExtension(contentType: string, url: string): string {
  const typeMap: Record<string, string> = {
    svg: 'svg',
    png: 'png',
    jpeg: 'jpg',
    jpg: 'jpg',
    webp: 'webp',
    gif: 'gif'
  }

  for (const key in typeMap) {
    if (contentType.includes(key)) {
      return typeMap[key]
    }
  }

  const urlExt = new URL(url).pathname.split('.').pop()?.toLowerCase()
  if (urlExt && ['svg', 'png', 'jpg', 'jpeg', 'webp', 'gif', 'ico'].includes(urlExt)) {
    return urlExt === 'jpeg' ? 'jpg' : urlExt
  }

  return 'ico'
}

export function createUrlSlug(url: string): string {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9]/gi, '-')
    .toLowerCase()
}