'use client'
import { ICONS } from '@/app/constants/icons'
import React, { useRef, useState } from 'react'

const OTP_LENGTH = 4

const VarifyOtp = () => {
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
    const inputsRef = useRef<(HTMLInputElement | null)[]>([])

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

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
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData('text').slice(0, OTP_LENGTH)

        if (!/^\d+$/.test(pasted)) return

        const newOtp = pasted.split('')
        setOtp(newOtp)

        newOtp.forEach((_, i) => {
            inputsRef.current[i]?.focus()
        })
    }

    const handleSubmit = () => {
        const otpValue = otp.join('')
        console.log('OTP:', otpValue)
    }

    return (
        <div className="flex-1 bg-black flex flex-col gap-14 items-center justify-center px-6 md:px-15">
            <div className="w-full  flex flex-col gap-10 items-center">

                <h2 className="text-[28px] font-semibold text-white text-center">
                    Verify phone
                </h2>

                <p className="text-[15px] text-center text-white flex items-center justify-center gap-1">
                    Enter the OTP sent to 0987654321<span><ICONS.Edit /></span>
                </p>

                {/* <div className="w-full  flex items-center justify-center gap-4 "> */}
                <div className="w-full grid grid-cols-4 gap-4">

                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputsRef.current[index] = el)}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            maxLength={1}
                            inputMode="numeric"
                            autoFocus={index === 0}
                            //     className="w-34.5 h-22 text-center text-xl font-semibold
                            //  bg-[#FFFFFF1A] text-white rounded-xl
                            //  outline-none focus:ring-2 focus:ring-white/40"
                            className="  w-full h-22 aspect-square  text-center text-xl font-semibold  bg-[#FFFFFF1A] text-white rounded-xl  outline-none focus:ring-2 focus:ring-white/40"
                        />
                    ))}
                </div>

                {true ? <p className="text-start w-full text-[15px]  text-white/60">
                    Resend OTP in <span className="text-base font-semibold text-white">34s</span>
                </p> : <p className="w-full text-start text-sm text-white/60">
                    Didn’t receive the code? <span className="underline cursor-pointer">Resend</span>
                </p>}

                <button onClick={handleSubmit} className="w-full flex items-center justify-center font-semibold text-base text-black bg-white rounded-xl h-14 hover:bg-gray-200 transition">

                    Verify OTP
                </button>



            </div>
        </div>
    )
}

export default VarifyOtp
