import { IMAGES } from "@/app/constants/icons"
import { ordersService } from "@/app/service/orders"
import { cookies, headers } from "next/headers"
import Image from "next/image"

export default async function Page() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  const headersList = await headers()
  const host = headersList.get("host") || "localhost:3000"
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
  const baseURL = `${protocol}://${host}`

  const orders = await ordersService.listOrders(token, baseURL)

  return (
    <div className="p-[60px]">
      <h1 className="font-semibold text-[40px] text-white mb-[48px]">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <ul className="flex flex-col gap-[24px]">
          {orders.map((order, i) => (
            <div key={i} className='w-[800px] p-4 flex items-center justify-between rounded-xl bg-[#FFFFFF14]'>
              <div className=' flex items-center gap-7'>
                <Image width={110} height={95} src={IMAGES.shoeSmallImage} alt='product image' />
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-col gap-2'>
                    <span className='text-white font-medium text-[20px]'>{order.product_name}</span>
                    <span className='font-semibold text-[15px] text-[#FFFFFF99]'>UK {order.quantity},{order.order_id}</span>
                  </div>
                   <span className='font-semibold text-[15px] text-[#FFFFFF99]'>{order.created_date}</span>
                </div>


              </div>
              <div className="flex items-center justify-center gap-2">
                {order?.product_amount > 0 ? (
                  <>
                    <span className="font-semibold text-[16px] text-[#ffffff]">
                      {order.product_amount}
                    </span>

                    <span className="font-normal text-[13px] text-[#FFFFFF80] line-through">
                      {order.product_mrp}
                    </span>
                  </>
                ) : (
                  <span className="font-semibold text-[16px] text-[#ffffff]">
                    {order.product_mrp}
                  </span>
                )}
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  )
}
