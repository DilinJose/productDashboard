'use client'
import { IMAGES } from '@/app/constants/icons'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import LoginPage from './compoenents/loginPage'
import VarifyOtp from './compoenents/varifyOtp'
import Register from './compoenents/register'

type Step = 'login' | 'otp' | 'register'

const Login = () => {
  const router = useRouter()
  const [step, setStep] = useState<Step>('login')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [isExistingUser, setIsExistingUser] = useState<boolean>(false)

  const handlePhoneSubmit = (phone: string) => {
    setPhoneNumber(phone)
    setStep('otp')
  }

  const handleOtpVerified = (userExists: boolean, token?: string) => {
    if (token) {
      localStorage.setItem('access_token', token)
    }
    setIsExistingUser(userExists)
    if (userExists) {
      // Redirect to dashboard
      router.push('/dashboard')
    } else {
      setStep('register')
    }
  }

  const handleRegisterComplete = (token: string) => {
    localStorage.setItem('access_token', token)
    // Redirect to dashboard
    router.push('/dashboard')
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
