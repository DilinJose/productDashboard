import { NextRequest, NextResponse } from "next/server"

const EXTERNAL_API_URL = 'http://skilltestnextjs.evidam.zybotechlab.com/api/new-products/'

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization')
        
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        }
        
        if (authHeader) {
            headers['Authorization'] = authHeader
        }

        const response = await fetch(EXTERNAL_API_URL, {
            method: 'GET',
            headers,
            next: { revalidate: 60 }, // Revalidate every 60 seconds
        })

        if (!response.ok) {
            console.error('External API error:', response.status, response.statusText)
            return NextResponse.json(
                { error: 'Failed to fetch products' },
                { status: response.status }
            )
        }

        const data = await response.json()
                return NextResponse.json(data, { status: 200 })

    } catch (error) {
        console.error('New Products API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

