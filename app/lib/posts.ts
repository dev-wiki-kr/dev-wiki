import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostMatter {
  title: string
  date: Date
  description: string
  lastModified: string
}

export interface Post extends PostMatter {
  url: string
  slug: string
  content: string
}

const BASE_PATH = path.join(process.cwd(), 'posts')

// MDX 상세 가져오기
const parsePostDetail = async (postPath: string) => {
  const file = fs.readFileSync(postPath, 'utf8')
  const { data, content } = matter(file)
  const grayMatter = data as PostMatter
  const lastModified = grayMatter.lastModified
  return { ...grayMatter, content, lastModified }
}

// 슬러그 가져오기
export const getPostSlugs = () => {
  return fs.readdirSync(BASE_PATH).filter((file) => path.extname(file) === '.mdx')
}

// 상세 내용 가져오기
export const getPostBySlug = async (slug: string) => {
  const filePath = path.join(BASE_PATH, `${slug}.mdx`)
  return await parsePostDetail(filePath)
}
