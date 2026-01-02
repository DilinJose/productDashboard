'use client'

import Image from 'next/image'
import { useOrderStore } from '@/app/store/orderedProductStore'
import logo from '../../../public/images/footerLogo.png'

export default function OrderSuccessPage() {
    const { orderSuccessData: orderData } = useOrderStore();

    if (!orderData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        )
    }

    return (
        // <div className="min-h-screen  py-12 px-4 bg-[#161616]">
        //     <div className="h-full flex flex-col items-center justify-center gap-[36px]">
        <div className="min-h-screen bg-[#161616] flex items-center justify-center px-4">
            <div className="flex flex-col items-center gap-[36px]">

                <div >
                    <Image width={106.28} height={56} src={logo} alt='Logo' />
                </div>
                <h1 className='font-bold text-[36px] text-white'>Successfully Ordered!</h1>
                <h6 className='font-medium text-[16px] text-[#FFFFFF99]'>{orderData.orderDate}  {orderData.orderTime}  </h6>

                <div className='w-125 p-4 flex items-center justify-between rounded-xl bg-[#FFFFFF14]'>
                    <div className=' flex items-center gap-7'>
                        <Image className='rounded-xl' width={110} height={95} src={orderData.productImage} alt='product image' />
                        <div className='flex flex-col gap-4'>
                            <span className='text-white font-medium text-[20px]'>{orderData.productName}</span>
                            <span className='font-semibold text-[15px] text-[#FFFFFF99]'>UK {orderData.productSize}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        {orderData?.order?.discount_amount > 0 ? (
                            <>
                                <span className="font-semibold text-[16px] text-[#ffffff]">
                                    {orderData.order.discount_amount}
                                </span>

                                <span className="font-normal text-[13px] text-[#FFFFFF80] line-through">
                                    {orderData.productPrice}
                                </span>
                            </>
                        ) : (
                            <span className="font-semibold text-[16px] text-[#ffffff]">
                                {orderData.productPrice}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

