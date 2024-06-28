import { Header } from './_components/layout/header'
import { StyledComponentsRegistry } from './_external/styled-components'
import { GlobalStyle } from './_styles/global-style'
import { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import { QueryClientProvider, client } from './_external/react-query'

import localFont from 'next/font/local'
import { Footer } from './_components/layout/footer'
import { SearchContainerPostionProvider } from './_components/search/context'
import { HeaderSearch } from './_components/search/header-search/header-search'
interface LayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: '홈 - 데브위키',
  description: '개발정보를 모아놓은 devwiki입니다.',
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Devwiki team' }],
  openGraph: {
    title: '홈 - 데브위키',
    description: '개발정보를 모아놓은 devwiki입니다.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Devwiki',
    images: [
      {
        url: 'https://devwiki.co.kr/images/opengraph-image.jpg',
        width: 800,
        height: 600,
        alt: 'Devwiki',
      },
    ],
  },
  keywords: ['Devwiki'],
  alternates: {
    canonical: 'https://devwiki.co.kr',
  },
}
const pretendard = localFont({
  src: '../public/font/PretendardVariableSubset.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

//QUESTION: 위키피디아 형식에서는 어떤 json-ld 구조화형식이 맞을지..? 아니면 안해도 될지

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html>
      <head>
        <GoogleAnalytics gaId="G-MTBJ5VNE9S" />
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "mo3ghx9sv0");
          `}
        </Script>
      </head>
      <body className={pretendard.className}>
        <QueryClientProvider client={client}>
          <SearchContainerPostionProvider>
            <StyledComponentsRegistry>
              <GlobalStyle />
              <Header>
                <HeaderSearch />
              </Header>
              <div id="wrapper">{children}</div>
              <Footer />
            </StyledComponentsRegistry>
          </SearchContainerPostionProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
