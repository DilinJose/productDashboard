'use client'
import ButtonWithLabel from '@/app/components/ui/button/buttonWithLabel'
import { ICONS } from '@/app/constants/icons'
import { authService } from '@/app/service/auth'
import React, { useEffect, useRef, useState } from 'react'

const OTP_LENGTH = 4

type VarifyOtpProps = {
    phoneNumber: string
    onOtpVerified: (userExists: boolean, token?: string, userData?: { user_id?: string; name: string; phone_number: string }) => void
}

const VarifyOtp = ({ phoneNumber, onOtpVerified }: VarifyOtpProps) => {
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
    const [expectedOtp, setExpectedOtp] = useState<string>('')
    const [isExistingUser, setIsExistingUser] = useState<boolean>(false)
    const [token, setToken] = useState<string | undefined>(undefined)
    const [userData, setUserData] = useState<{ user_id?: string; name: string; phone_number: string } | undefined>(undefined)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')
    const [resendTimer, setResendTimer] = useState(0)
    const inputsRef = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        // Call verify API to get OTP when component mounts
        const fetchOtp = async () => {
            try {
                const response = await authService.verify(phoneNumber)
                setExpectedOtp(response.otp)
                setIsExistingUser(response.user)
                if (response.token?.access) {
                    setToken(response.token.access)
                }
                // Store user data if available (for existing users)
                if (response.user && response.name && response.phone_number) {
                    setUserData({
                        user_id: response.user_id,
                        name: response.name,
                        phone_number: response.phone_number,
                    })
                }
                // Start resend timer (60 seconds)
                setResendTimer(60)
            } catch (err) {
                setError('Failed to get OTP. Please try again.')
                console.error('Verify error:', err)
            }
        }
        fetchOtp()
    }, [phoneNumber])

    useEffect(() => {
        // Countdown timer for resend
        if (resendTimer > 0) {
            const timer = setTimeout(() => {
                setResendTimer(resendTimer - 1)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [resendTimer])

    const handleResend = async () => {
        setError('')
        setOtp(Array(OTP_LENGTH).fill(''))
        setResendTimer(60)
        try {
            const response = await authService.verify(phoneNumber)
            setExpectedOtp(response.otp)
            setIsExistingUser(response.user)
            if (response.token?.access) {
                setToken(response.token.access)
            }
            // Store user data if available (for existing users)
            if (response.user && response.name && response.phone_number) {
                setUserData({
                    user_id: response.user_id,
                    name: response.name,
                    phone_number: response.phone_number,
                })
            }
            inputsRef.current[0]?.focus()
        } catch (err) {
            setError('Failed to resend OTP. Please try again.')
            console.error('Resend error:', err)
        }
    }

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        setError('')

        if (value && index < OTP_LENGTH - 1) {
            inputsRef.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus()
        }
        if (e.key === 'Enter' && otp.every(d => d !== '')) {
            handleSubmit()
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData('text').slice(0, OTP_LENGTH)

        if (!/^\d+$/.test(pasted)) return

        const newOtp = pasted.split('')
        setOtp(newOtp)
        setError('')

        newOtp.forEach((_, i) => {
            inputsRef.current[i]?.focus()
        })
    }

    const handleSubmit = () => {
        const otpValue = otp.join('')
        
        if (otpValue.length !== OTP_LENGTH) {
            setError('Please enter complete OTP')
            return
        }

        if (otpValue === expectedOtp) {
            // For existing users, pass user data if available, otherwise use phone number as name
            const userDataToPass = isExistingUser && userData 
                ? userData 
                : isExistingUser 
                    ? { name: phoneNumber, phone_number: phoneNumber }
                    : undefined
            onOtpVerified(isExistingUser, token, userDataToPass)
        } else {
            setError('Invalid OTP. Please try again.')
        }
    }

    return (
        <div className="flex-1 bg-black flex flex-col gap-14 items-center justify-center px-6 md:px-15">
            <div className="w-full  flex flex-col gap-10 items-center">

                <h2 className="text-[28px] font-semibold text-white text-center">
                    Verify phone
                </h2>

                <p className="text-[15px] text-center text-white flex items-center justify-center gap-1">
                    Enter the OTP sent to {phoneNumber}
                </p>

                <div className="w-full grid grid-cols-4 gap-4">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputsRef.current[index] = el
                            }}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            maxLength={1}
                            inputMode="numeric"
                            autoFocus={index === 0}
                            disabled={loading}
                            className="w-full h-22 aspect-square text-center text-xl font-semibold bg-[#FFFFFF1A] text-white rounded-xl outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-50"
                        />
                    ))}
                </div>

                {error && (
                    <p className="text-red-400 text-sm text-center w-full">{error}</p>
                )}

                {resendTimer > 0 ? (
                    <p className="text-start w-full text-[15px] text-white/60">
                        Resend OTP in <span className="text-base font-semibold text-white">{resendTimer}s</span>
                    </p>
                ) : (
                    <p className="w-full text-start text-sm text-white/60">
                        Didn't receive the code?{' '}
                        <span className="underline cursor-pointer hover:text-white" onClick={handleResend}>
                            Resend
                        </span>
                    </p>
                )}

                <ButtonWithLabel 
                    onClick={handleSubmit} 
                    label={loading ? 'Verifying...' : 'Verify OTP'} 
                    type='button'
                    disabled={loading}
                />
            </div>
        </div>
    )
}

export default VarifyOtp
