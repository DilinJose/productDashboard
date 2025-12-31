import React from 'react'
import logo from '../../../public/images/footerLogo.png'
import Image from 'next/image'
import { ICONS } from '@/app/constants/icons'

const Footer = () => {
  return (
    <div className="px-25 mx-auto bg-[#191919] h-60 ">
      <div className='px-2.25 flex justify-between items-center h-full w-full'>
        <div >
          <Image width={106.28} height={56} src={logo} alt='Logo' />
        </div>
        <div className='text-white flex items-center justify-between gap-11'>
          <ICONS.facebook fill='white' size={20} />
          <ICONS.instagram fill='white' size={20} />
          <ICONS.twitter fill='white' size={20} />
        </div>
      </div>
    </div>
  )
}

export default Footer