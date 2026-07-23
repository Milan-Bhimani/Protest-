import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || 'dev-revalidation-secret'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tags, secret } = body

    if (secret !== REVALIDATION_SECRET) {
      return NextResponse.json({ success: false, message: 'Invalid secret' }, { status: 403 })
    }

    if (!Array.isArray(tags) || tags.length === 0) {
      return NextResponse.json({ success: false, message: 'Tags array required' }, { status: 400 })
    }

    for (const tag of tags) {
      revalidateTag(tag)
    }

    return NextResponse.json({ success: true, revalidated: tags })
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body' }, { status: 400 })
  }
}
