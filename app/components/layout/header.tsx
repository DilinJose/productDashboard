'use client'
import { getUser, removeAccessToken } from '@/app/lib/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import logo from '../../../public/images/logo.png'
import Image from 'next/image'

const Header = () => {
    const [userName, setUserName] = useState<string>('')
    const router = useRouter()

    useEffect(() => {
        // Get user details from storage
        const user = getUser()
        if (user) {
            setUserName(user.name)
        }
    }, [])

    const handleLogout = () => {
        removeAccessToken()
        router.push('/login')
    }

    return (
        <div className="px-15 mx-auto bg-[#191919] h-17.5 ">
            <div className='px-2.25 flex justify-between items-center h-full w-full'>
                <div >
                    <Image width={54.17} height={28.54} src={logo} alt='Logo' />
                </div>
                <div className='flex items-center gap-4'>
                    {userName ? (
                        <>
                            <span className='text-white text-sm md:text-base'>
                                {userName}
                            </span>
                            <button 
                                onClick={handleLogout}
                                className='text-white text-sm md:text-base hover:text-gray-300 transition-colors'
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <span className='text-white text-sm md:text-base'>
                            LogIn
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header