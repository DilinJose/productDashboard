import { NextResponse } from 'next/server'

const BACKEND_URL = 'http://skilltestnextjs.evidam.zybotechlab.com'

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const response = await fetch(
            `${BACKEND_URL}/api/login-register/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(body),
            }
        )

        const data = await response.json()

        return NextResponse.json(data, { status: response.status })
    } catch (error) {
        console.error('Login-Register API error:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}

