import { NextResponse } from "next/server"

export async function GET(preq: Request) {
    try {

        

    } catch (error) {
        console.error('Verify API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }

}