'use client'
import ButtonWithLabel from '@/app/components/ui/button/buttonWithLabel'
import React, { useState } from 'react'

const Login = () => {
    const [phone, setPhone] = useState('')

    const handleSubmit = () => {
        console.log('cliked login',phone)
    }

    return (
        <div className="flex-1 bg-black flex flex-col gap-14 items-center justify-center px-6 md:px-15">
            <h3 className="text-[28px] font-semibold text-white text-center">
                Log In
            </h3>

            <form className="w-full  flex flex-col gap-9" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <label className="font-medium text-base text-white">
                        Phone
                    </label>
                    <input
                        placeholder="Enter phone"
                        className="bg-[#FFFFFF1A] placeholder:text-white rounded-xl h-14 px-4 outline-none focus:ring-2 focus:ring-white/40"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <ButtonWithLabel label={'Continue'} type='submit' />
            </form>
        </div>
    )
}

export default Login