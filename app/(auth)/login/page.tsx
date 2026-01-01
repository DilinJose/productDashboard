'use client'
import { IMAGES } from '@/app/constants/icons'
import { setAccessToken, setUser } from '@/app/lib/auth'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import LoginPage from './compoenents/loginPage'
import VarifyOtp from './compoenents/varifyOtp'
import Register from './compoenents/register'

type Step = 'login' | 'otp' | 'register'

const Login = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState<Step>('login')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [isExistingUser, setIsExistingUser] = useState<boolean>(false)

  const handlePhoneSubmit = (phone: string) => {
    setPhoneNumber(phone)
    setStep('otp')
  }

  const handleOtpVerified = (userExists: boolean, token?: string, userData?: { user_id?: string; name: string; phone_number: string }) => {
    if (token) {
      setAccessToken(token)
    }
    // Store user data if available
    if (userData) {
      setUser(userData)
    }
    setIsExistingUser(userExists)
    if (userExists) {
      // Redirect to original destination or dashboard
      const redirectPath = searchParams.get('redirect') || '/dashboard'
      router.push(redirectPath)
    } else {
      setStep('register')
    }
  }

  const handleRegisterComplete = (token: string, userData: { user_id: string; name: string; phone_number: string }) => {
    setAccessToken(token)
    setUser(userData)
    // Redirect to original destination or dashboard
    const redirectPath = searchParams.get('redirect') || '/dashboard'
    router.push(redirectPath)
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full h-full flex flex-col md:flex-row overflow-hidden">

        <div className="flex-1 relative">
          <Image
            src={IMAGES.loginImage}
            alt="Login Image"
            fill
            className="object-cover"
            priority
          />
        </div>

        {step === 'login' && <LoginPage onPhoneSubmit={handlePhoneSubmit} />}
        {step === 'otp' && (
          <VarifyOtp
            phoneNumber={phoneNumber}
            onOtpVerified={handleOtpVerified}
          />
        )}
        {step === 'register' && (
          <Register
            phoneNumber={phoneNumber}
            onRegisterComplete={handleRegisterComplete}
          />
        )}
      </div>
    </div>
  )
}

export default Login
