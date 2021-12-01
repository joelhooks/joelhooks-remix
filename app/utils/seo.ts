import {getGenericSocialImage} from '~/images'

export function getSocialMetas({
  url,
  title = 'Ramblings of a software developer',
  description = `joel's digital garden`,
  origin,
  // image = getGenericSocialImage({
  //   origin,
  //   url,
  //   words: title,
  //   featuredImage: 'kentcdodds.com/illustrations/kody-flying_blue',
  // }),
  keywords = '',
}: {
  origin: string
  image?: string
  url: string
  title?: string
  description?: string
  keywords?: string
}) {
  return {
    title,
    description,
    keywords,
    image,
    'og:url': url,
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'twitter:card': image ? 'summary_large_image' : 'summary',
    'twitter:creator': '@kentcdodds',
    'twitter:site': '@kentcdodds',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
    'twitter:alt': title,
  }
}
