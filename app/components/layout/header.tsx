import React from 'react'
import logo from '../../../public/images/logo.png'
import Image from 'next/image'

const Header = () => {
    return (
        <div className="px-15 mx-auto bg-[#191919] h-17.5 ">
            <div className='px-2.25 flex justify-between items-center h-full w-full'>
                <div >
                    <Image width={54.17} height={28.54} src={logo} alt='Logo' />
                </div>
                <div className='text-white'>
                    LogIn
                </div>
            </div>
        </div>
    )
}

export default Header