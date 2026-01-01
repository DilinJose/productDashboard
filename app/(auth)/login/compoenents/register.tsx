'use client'
import ButtonWithLabel from '@/app/components/ui/button/buttonWithLabel'
import { authService } from '@/app/service/auth'
import React, { useState } from 'react'

type RegisterProps = {
    phoneNumber: string
    onRegisterComplete: (token: string, userData: { user_id: string; name: string; phone_number: string }) => void
}

const Register = ({ phoneNumber, onRegisterComplete }: RegisterProps) => {
    const [name, setName] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!name.trim()) {
            setError('Please enter your name')
            return
        }

        setLoading(true)
        try {
            const response = await authService.loginRegister({
                name: name.trim(),
                phone_number: phoneNumber,
            })
            onRegisterComplete(response.token.access, {
                user_id: response.user_id,
                name: response.name,
                phone_number: response.phone_number,
            })
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to register. Please try again.')
            console.error('Register error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex-1 bg-black flex flex-col gap-14 items-center justify-center px-6 md:px-15">
            <h3 className="text-[28px] font-semibold text-white text-center">
                Welcome, You are?
            </h3>

            <form className="w-full flex flex-col gap-9" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <label className="font-medium text-base text-white">
                        Name
                    </label>
                    <input
                        placeholder="Eg: John Mathew"
                        value={name}
                        className="bg-[#FFFFFF1A] placeholder:text-white/30 text-white rounded-xl h-14 px-4 outline-none focus:ring-2 focus:ring-white/40"
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                    />
                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}
                </div>
                <ButtonWithLabel 
                    label={loading ? 'Registering...' : 'Continue'} 
                    type='submit' 
                    disabled={loading}
                />
            </form>
        </div>
    )
}

export default Register