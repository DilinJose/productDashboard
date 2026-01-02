import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization')

        if (!authHeader) {
            return NextResponse.json(
                { error: 'Authorization header missing' },
                { status: 401 }
            )
        }
 
        const response = await fetch(
            'https://skilltestnextjs.evidam.zybotechlab.com/api/user-orders/',
            {
                method: 'GET',
                headers: {
                    'Authorization': authHeader,
                },
                redirect: 'manual',
            }
        )

        let data
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
            data = await response.json()
        } else {
            const text = await response.text()
            data = { error: text || 'Unknown error' }
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