import { Header } from './_components/layout/header'
import { StyledComponentsRegistry } from './_external/styled-components'
import { GlobalStyle } from './_styles/global-style'
import { Metadata } from 'next'

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

//QUESTION: 위키피디아 형식에서는 어떤 json-ld 구조화형식이 맞을지..? 아니면 안해도 될지

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html>
      <head></head>
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
