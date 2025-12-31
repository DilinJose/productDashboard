'use client'
import ButtonWithLabel from '@/app/components/ui/button/buttonWithLabel'
import React, { useState } from 'react'

type LoginPageProps = {
    onPhoneSubmit: (phone: string) => void
}

const LoginPage = ({ onPhoneSubmit }: LoginPageProps) => {
    const [phone, setPhone] = useState('')
    const [error, setError] = useState<string>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        
        if (!phone.trim()) {
            setError('Please enter a phone number')
            return
        }

        // Validate phone number format (basic validation)
        const phoneRegex = /^\d{10,}$/
        if (!phoneRegex.test(phone.trim())) {
            setError('Please enter a valid phone number')
            return
        }

        onPhoneSubmit(phone.trim())
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
                        value={phone}
                        className="bg-[#FFFFFF1A] text-white placeholder:text-white/30 rounded-xl h-14 px-4 outline-none focus:ring-2 focus:ring-white/40"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}
                </div>
                <ButtonWithLabel 
                    label='Continue' 
                    type='submit' 
                />
            </form>
        </div>
    )
}

export default LoginPage