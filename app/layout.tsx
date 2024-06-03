import { Header } from './_components/layout/header'
import { StyledComponentsRegistry } from './_external/styled-components'
import { GlobalStyle } from './_styles/global-style'
import { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'

import localFont from 'next/font/local'
interface LayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: '홈 - 데브위키',
  description: '개발정보를 모아놓은 devwiki입니다.',
  robots: {
    index: false,
    follow: false,
  },
  authors: [{ name: 'Devwiki team' }],
  keywords: ['Devwiki'],
  alternates: {
    canonical: 'https://dewiki.vercel.app',
  },
}
const pretendard = localFont({
  src: '../public/font/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})
//QUESTION: 위키피디아 형식에서는 어떤 json-ld 구조화형식이 맞을지..? 아니면 안해도 될지

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="kr" className={pretendard.className}>
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
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <Header />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
