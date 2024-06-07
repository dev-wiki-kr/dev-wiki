import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const type = searchParams.get('type') as 'page' | 'layout' | null
  const body = await request.json()
  const path = body.path

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  try {
    revalidatePath(path, type || undefined)
    return NextResponse.json({ revalidated: true })
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
