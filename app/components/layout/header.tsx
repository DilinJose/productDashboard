'use client'
import {  removeAccessToken } from '@/app/lib/auth'
import { useRouter } from 'next/navigation'
import React from 'react'
import logo from '../../../public/images/logo.png'
import Image from 'next/image'
import { useUserStore } from '@/app/store/userStore'
import { ICONS } from '@/app/constants/icons'

const Header = () => {
    const router = useRouter()

    const { user,clearUser } = useUserStore()

    const handleLogout = () => {
        removeAccessToken()
        clearUser()
        router.push('/login')
    }

    return (
        <div className="px-15 mx-auto bg-[#191919] h-17.5 ">
            <div className='px-2.25 flex justify-between items-center h-full w-full'>
                <div className='cursor-pointer' onClick={()=>router.push('/dashboard')}>
                    <Image width={54.17} height={28.54} src={logo} alt='Logo' />
                </div>
                <div className='flex items-center gap-4'>
                    {user && (
                        <>
                            <span className='text-white text-sm md:text-base cursor-pointer' onClick={() => { router.push("/order-list") }}>
                               <ICONS.user size={20} color='#ffffff'/>
                            </span>
                            <button
                                onClick={handleLogout}
                                className='text-white text-sm md:text-base font-medium hover:text-gray-300 transition-colors'
                            >
                                Log Out
                            </button>
                        </>
                    ) }
                </div>
            </div>
        </div>
    )
}

export default Header