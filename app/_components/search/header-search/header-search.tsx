import { headers } from 'next/headers'
import { isMobileServer } from '../../../_util/platform'
import { HeaderSearchClient } from './header-search-client'

export function HeaderSearch() {
  const nextHeaders = headers()
  const userAgent = nextHeaders.get('user-agent')
  const isMobileUserAgent = isMobileServer(userAgent || '')

  return <HeaderSearchClient isMobileAgent={isMobileUserAgent} />
}
