import { IMAGES } from '@/app/constants/icons'
import Image from 'next/image'
import React from 'react'
import VarifyOtp from './compoenents/varifyOtp'
import Register from './compoenents/register'

const Login = () => {
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

        <Login />
        {/* <VarifyOtp /> */}
        {/* <Register /> */}
      </div>
    </div>
  )
}

export default Login
