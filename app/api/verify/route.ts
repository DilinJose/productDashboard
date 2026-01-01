import { NextRequest, NextResponse } from 'next/server'

// Static OTP for testing (as per requirement)
const STATIC_OTP_EXISTING_USER = '1234'
const STATIC_OTP_NEW_USER = '5678'

// Mock user database (in production, this would be a real database)
// For testing: phone numbers ending in 0 are existing users, others are new users
const mockUsers: Record<string, { 
  phone_number: string
  exists: boolean
  user_id?: string
  name?: string
}> = {
  '9876543210': { 
    phone_number: '9876543210', 
    exists: true,
    user_id: 'ARM0001',
    name: 'Existing User'
  },
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
    const { phone_number } = body

    // Validate request
    if (!phone_number) {
      return NextResponse.json(
        { error: 'phone_number is required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = mockUsers[phone_number]
    const isExistingUser = user?.exists || phone_number.endsWith('0')

    // Generate static OTP based on user type
    const otp = isExistingUser ? STATIC_OTP_EXISTING_USER : STATIC_OTP_NEW_USER

    // Prepare response based on user type
    if (isExistingUser) {
      // Existing User Response - include user details if available
      const userData = mockUsers[phone_number]
      const response: any = {
        otp: otp,
        token: {
          access: generateAccessToken(phone_number),
        },
        user: true,
      }
      
      // Include user details if available
      if (userData?.name && userData?.user_id) {
        response.user_id = userData.user_id
        response.name = userData.name
        response.phone_number = phone_number
      }
      
      return NextResponse.json(response, { status: 200 })
    } else {
      // New User Response
      const response = {
        otp: otp,
        user: false,
      }
      return NextResponse.json(response, { status: 200 })
    }
  } catch (error) {
    console.error('Verify API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  console.log('GET /api/verify hit')
  return NextResponse.json({ status: 'ok' })
}
