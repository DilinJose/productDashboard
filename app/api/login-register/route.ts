import { NextRequest, NextResponse } from 'next/server'

// Generate user ID in format ARM####
let userCounter = 1
function generateUserId(): string {
  const paddedNumber = userCounter.toString().padStart(4, '0')
  userCounter++
  return `ARM${paddedNumber}`
}

// Generate JWT-like token (simplified for testing)
function generateAccessToken(phoneNumber: string): string {
  const payload = {
    phone_number: phoneNumber,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiry
  }
  // In production, use a proper JWT library like 'jsonwebtoken'
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64')
  return `jwt_access_token_${encoded}`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone_number, unique_id } = body

    // Validate request
    if (!name || !phone_number) {
      return NextResponse.json(
        { error: 'name and phone_number are required' },
        { status: 400 }
      )
    }

    // Generate user ID
    const user_id = generateUserId()

    // Generate access token
    const accessToken = generateAccessToken(phone_number)

    // Prepare response as per specification
    const response = {
      token: {
        access: accessToken,
      },
      user_id: user_id,
      name: name.trim(),
      phone_number: phone_number,
      message: 'Login Successful',
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('Login-Register API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

