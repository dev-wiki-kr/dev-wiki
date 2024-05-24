import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_PATH = path.join(process.cwd(), 'posts')

// 파일 슬러그 가져오기
export function getPostSlugs() {
  return fs.readdirSync(POSTS_PATH).filter((file) => path.extname(file) === '.mdx')
}

// 슬러그를 기반으로 게시물 가져오기
export async function getPostBySlug(slug: string) {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf-8')
  const { data: frontMatter, content } = matter(fileContents)

  return {
    frontMatter,
    content,
  }
}

// 모든 게시물 가져오기
export async function getAllPosts() {
  const slugs = getPostSlugs()
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug.replace('.mdx', ''))))
  return posts
}
