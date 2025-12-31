'use client'
import ButtonWithLabel from '@/app/components/ui/button/buttonWithLabel'
import React, { useState } from 'react'

const Register = () => {
    const [name, setName] = useState<string>('')

    const handleSubmit = () => {
        console.log('cliked register',name)
    }
    return (
        <div className="flex-1 bg-black flex flex-col gap-14 items-center justify-center px-6 md:px-15">
            <h3 className="text-[28px] font-semibold text-white text-center">
                Welcome, You are?
            </h3>

            <form className="w-full  flex flex-col gap-9" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <label className="font-medium text-base text-white">
                        Name
                    </label>
                    <input
                        placeholder="Eg: John Mathew"
                        className="bg-[#FFFFFF1A] placeholder:text-white rounded-xl h-14 px-4 outline-none focus:ring-2 focus:ring-white/40"
                         onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <ButtonWithLabel label={'Continue'} type='submit' />
            </form>
        </div>
    )
}

export default Register