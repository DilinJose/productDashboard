'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { IMAGES } from '@/app/constants/icons'// adjust your import

export default function ShoeCard() {
    const containerRef = useRef<HTMLDivElement>(null)
    const circleRef = useRef<HTMLDivElement>(null)
    const shoeRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (containerRef.current && circleRef.current) {
            // Position the circle dynamically using GSAP
            gsap.set(circleRef.current, {
                width: 370,      // width in px
                height: 370,     // height in px
                borderRadius: '50%',
                backgroundColor: '#3b82f6', // Tailwind blue-500
                position: 'absolute',
                top: -150,
                left: -7,
            })
            gsap.set(shoeRef.current, {
                width: 370,      // width in px
                height: 370,     // height in px
                position: 'absolute',
                top: 90,
                left: 40,
            })
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className='relative h-[405px] w-[312px] border border-white  bg-[#161616]  overflow-hidden'
        >
            <div className='w-full h-2/3 flex items-end relative'>
                <Image src={IMAGES.nikeText} width={400}
                    height={450} alt='Nike Text' />

                {/* Circle created and positioned using GSAP */}
                <div ref={circleRef}></div>

                {/* Centered and larger shoe image */}
                <div ref={shoeRef}
                    // className='absolute top-2/3 left-1/2 w-full  -translate-x-1/2 -translate-y-1/2'
                    className=' w-full '
                >
                    <Image
                        src={IMAGES.greenShoe}
                        alt='Green Shoe'
                        width={250}
                        height={120}
                    />
                </div>
            </div>

            <div className='w-full h-1/3 bg-[#232323] flex flex-col items-center justify-center'>
                <h1 className='capitalize text-[20px] font-extrabold text-white'>
                    Nike Shoes
                </h1>
            </div>
        </div>
    )
}
