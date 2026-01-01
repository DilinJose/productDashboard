import { NextRequest, NextResponse } from 'next/server'


export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const response = await fetch(
      'https://skilltestnextjs.evidam.zybotechlab.com/api/verify/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
        redirect: 'manual',
      }
    )

    const text = await response.text()

    console.log('Upstream status:', response.status)
    console.log('Upstream body:', text)

    let data
    try {
      data = JSON.parse(text)
    } catch {
      data = { raw: text }
    }

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Proxy request failed' },
      { status: 500 }
    )
  }
}



export async function GET() {
     console.log('GET /api/verify hit') 
  return NextResponse.json({ status: 'ok' })
}
