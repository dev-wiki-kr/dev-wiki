export interface SearchAutocompliResponse {
  body: Body
  statusCode: number
  headers: Headers
  meta: Meta
}

export interface Body {
  took: number
  timed_out: boolean
  _shards: Shards
  hits: Hits
  suggest: Suggest
}

export interface Shards {
  total: number
  successful: number
  skipped: number
  failed: number
}

export interface Hits {
  total: Total
  max_score: any
  hits: any[]
}

export interface Total {
  value: number
  relation: string
}

export interface Suggest {
  autocomplete: Autocomplete[]
}

export interface Autocomplete {
  text: string
  offset: number
  length: number
  options: Option[]
}

export interface Option {
  text: string
  _index: string
  _id: string
  _score: number
  _source: Source
}

export interface Source {
  title: string
  content: string
}

export interface Headers {
  date: string
  'content-type': string
  'content-length': string
  connection: string
  'access-control-allow-origin': string
}

export interface Meta {
  context: any
  request: Request
  name: string
  connection: Connection
  attempts: number
  aborted: boolean
}

export interface Request {
  params: Params
  options: Options
  id: number
}

export interface Params {
  method: string
  path: string
  body: string
  querystring: string
  headers: Headers2
  timeout: number
}

export interface Headers2 {
  'user-agent': string
  'content-type': string
  'content-length': string
}

export interface Options {}

export interface Connection {
  url: string
  id: string
  headers: Headers3
  deadCount: number
  resurrectTimeout: number
  _openRequests: number
  status: string
  roles: Roles
}

export interface Headers3 {}

export interface Roles {
  data: boolean
  ingest: boolean
}

export async function getSearchAutocomplete(keyword: string) {
  try {
    if (!keyword) {
      return []
    }
    const res = await fetch(`https://devwiki.co.kr/wiki-api/search/autocomplete?q=${keyword}`)

    const json = (await res.json()) as SearchAutocompliResponse

    return json.body.suggest.autocomplete[0].options
  } catch (error) {
    console.log(error)
    return null
  }
}
