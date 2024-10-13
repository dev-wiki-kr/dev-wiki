import { Tiptap } from './_components/editor/tiptap-editor'
import { LatestArticleWrapper } from './_components/main/latest-article-wrapper'
import { MainPage } from './_components/main/main-page'

export default function Home() {
  return (
    <MainPage>
      <LatestArticleWrapper />
      <Tiptap />
    </MainPage>
  )
}
