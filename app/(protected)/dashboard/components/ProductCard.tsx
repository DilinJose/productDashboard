'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Product, productsService } from '@/app/service/products'
import { IMAGES } from '@/app/constants/icons'
import { useOrderStore } from '@/app/store/orderedProductStore'
import { useGSAP } from '@gsap/react'

interface ProductCardProps {
    product: Product
}

const colorNameToHex: Record<string, string> = {
    'White': '#ffffff',
    'Red': '#8B0000',
    'Black': '#000000',
    'Green': '#32CD32',
    'Blue': '#3b82f6',
    'Yellow': '#eab308',
    'Orange': '#f97316',
    'Purple': '#800080',
    'Pink': '#ec4899',
    'Grey': '#6b7280',
    'Gray': '#6b7280',
}

const getColorHex = (colorName: string): string => {
    return colorNameToHex[colorName] || colorNameToHex['Blue']
}

const getInitialData = (product: Product) => {
    if (!product.variation_colors || product.variation_colors.length === 0) {
        const defaultImage = product.product_images && product.product_images.length > 0
            ? product.product_images[0].product_image
            : IMAGES.greenShoe.src
        return {
            selectedColor: null,
            selectedSize: null,
            productImage: defaultImage,
            circleColor: '#3b82f6',
        }
    }

    const firstColor = product.variation_colors[0]
    const firstImage = firstColor.color_images && firstColor.color_images.length > 0
        ? firstColor.color_images[0]
        : (product.product_images && product.product_images.length > 0
            ? product.product_images[0].product_image
            : IMAGES.greenShoe.src)
    const firstSize = firstColor.sizes && firstColor.sizes.length > 0 ? firstColor.sizes[0] : null

    return {
        selectedColor: firstColor,
        selectedSize: firstSize,
        productImage: firstImage,
        circleColor: getColorHex(firstColor.color_name),
    }
}

export default function ProductCard({ product }: ProductCardProps) {
    const router = useRouter()
    const [imageError, setImageError] = useState(false)
    const [isPurchasing, setIsPurchasing] = useState(false)
    const { setOrderSuccessData } = useOrderStore()

    const initialData = getInitialData(product)
    const [selectedColor, setSelectedColor] = useState(initialData.selectedColor)
    const [selectedSize, setSelectedSize] = useState(initialData.selectedSize)
    const [productImage, setProductImage] = useState(initialData.productImage)

    const containerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const hoverContentRef = useRef<HTMLDivElement>(null)
    const tl = useRef<gsap.core.Timeline | null>(null)

    const calculateShifts = () => {
        if (!containerRef.current) return { imageShift: -55, panelShift: -180 };

        const containerHeight = containerRef.current.offsetHeight;
        
        const IMAGE_SHIFT_PERCENT = 0.0275;
        const imageShift = Math.max(-95, Math.min(-90, -(containerHeight * IMAGE_SHIFT_PERCENT)));
        
        const PANEL_SHIFT_PERCENT = 0.09;
        const panelShift = Math.max(-175, Math.min(-175, -(containerHeight * PANEL_SHIFT_PERCENT)));

        return { imageShift, panelShift };
    }

    useGSAP(
        () => {
            if (!imageRef.current || !hoverContentRef.current || !containerRef.current) return;

            const { imageShift, panelShift } = calculateShifts();

            tl.current = gsap.timeline({ paused: true });

            tl.current
                .to(imageRef.current, {
                    y: imageShift,
                    duration: 0.6,
                    ease: 'power3.out',
                }, 0)
                .to(
                    hoverContentRef.current,
                    {
                        y: panelShift,
                        duration: 0.6,
                        ease: 'power3.out',
                    },
                    0
                )

                .fromTo(
                    '.size-section, .color-section, .button-section',
                    { opacity: 0, y: 25 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: 'power2.out',
                        stagger: 0.1,
                    },
                    0.2
                );
        },
        { scope: containerRef }
    );

    useEffect(() => {
        const handleResize = () => {
            if (!tl.current || !imageRef.current || !hoverContentRef.current || !containerRef.current) return;
            
            const { imageShift, panelShift } = calculateShifts();
            
            tl.current.kill();
            gsap.set(imageRef.current, { y: 0 });
            gsap.set(hoverContentRef.current, { y: 0 });
                        tl.current = gsap.timeline({ paused: true });
            tl.current
                .to(imageRef.current, {
                    y: imageShift,
                    duration: 0.6,
                    ease: 'power3.out',
                }, 0)
                .to(
                    hoverContentRef.current,
                    {
                        y: panelShift,
                        duration: 0.6,
                        ease: 'power3.out',
                    },
                    0
                )
                .fromTo(
                    containerRef.current.querySelectorAll('.size-section, .color-section, .button-section'),
                    { opacity: 0, y: 25 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: 'power2.out',
                        stagger: 0.1,
                    },
                    0.2
                );
        };

        let resizeTimer: NodeJS.Timeout;
        const debouncedResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResize, 150);
        };

        window.addEventListener('resize', debouncedResize);
        return () => {
            window.removeEventListener('resize', debouncedResize);
            clearTimeout(resizeTimer);
        };
    }, []);


    const handleColorSelect = (color: NonNullable<typeof selectedColor>) => {
        setSelectedColor(color)
        if (color.color_images && color.color_images.length > 0) {
            setProductImage(color.color_images[0])
            setImageError(false)
        }
        if (color.sizes && color.sizes.length > 0) {
            setSelectedSize(color.sizes[0])
        }
    }

    const handleSizeSelect = (size: NonNullable<typeof selectedSize>) => {
        setSelectedSize(size)
    }

    const availableSizes = selectedColor?.sizes?.filter(size => size.status) || []
    const handleMouseEnter = () => {
        tl.current?.play()
    }

    const handleMouseLeave = () => {
        tl.current?.reverse()
    }


    return (
        <div
            ref={containerRef}
            className="relative aspect-[4/5] w-full bg-[#232323] overflow-hidden cursor-pointer mb-[49px]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >

            <div
                ref={imageRef}
                className="relative w-full h-full pointer-events-none will-change-transform"
            >
                <Image
                    src={productImage}
                    alt={product.name || 'Product'}
                    fill
                    className="object-cover"
                    unoptimized={productImage.startsWith('http://')}
                />
            </div>


            <div className="relative w-full h-1/3 ">
                <div
                    ref={hoverContentRef}
                    className="absolute bottom-0 left-0 w-full flex flex-col items-center gap-3 px-4 py-5 bg-[#232323]"
                >
                    {availableSizes.length > 0 && (
                        <div className='w-full flex items-center justify-center gap-4 size-section '>
                            <label className='text-white text-base font-medium'>SIZE:</label>
                            <div className='flex gap-2 justify-center'>
                                {availableSizes.map((size) => (
                                    <button
                                        key={size.size_id}
                                        onClick={() => handleSizeSelect(size)}
                                        className={`w-10 h-8 rounded text-base font-semibold transition-colors ${selectedSize?.size_id === size.size_id
                                            ? 'bg-[#372224] text-white'
                                            : 'bg-white text-black border-2 border-white hover:bg-white/80 '
                                            }`}
                                    >
                                        {size.size_name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {product.variation_colors && product.variation_colors.length > 0 && (
                        <div className='w-full flex items-center justify-center gap-4 color-section'>
                            <label className='text-white text-base font-medium'>COLOR:</label>
                            <div className='flex gap-2 justify-center'>
                                {product.variation_colors.map((color) => {
                                    const hexColor = getColorHex(color.color_name)
                                    const isSelected = selectedColor?.color_id === color.color_id
                                    return (
                                        <button
                                            key={color.color_id}
                                            onClick={() => handleColorSelect(color)}
                                            className={`w-6 h-6 rounded-full transition-all ${isSelected
                                                ? 'ring-2 ring-white ring-offset-2 ring-offset-[#232323]'
                                                : 'hover:ring-2 hover:ring-white/50'
                                                }`}
                                            style={{ backgroundColor: hexColor }}
                                            title={color.color_name}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    <button
                        className='button-section w-29 h-10.5 bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition-colors mt-2 disabled:bg-gray-400 disabled:cursor-not-allowed'
                        onClick={async (e) => {
                            e.stopPropagation()

                            if (product.variations_exist && !selectedSize) {
                                alert('Please select a size')
                                return
                            }

                            setIsPurchasing(true)

                            try {
                                const purchaseData: any = {
                                    product_id: product.id
                                }

                                const response = await productsService.purchaseProduct(purchaseData)

                                const now = new Date()
                                const orderDate = now.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                                const orderTime = now.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                })
                                const order = {
                                    id: response?.order.id,
                                    payment_status: response.order.payment_status,
                                    total_amount: product.mrp,
                                    discount_amount: product.sale_price
                                }

                                const orderSuccessData = {
                                    id: product.id,
                                    productName: product.name,
                                    productImage: productImage,
                                    productSize: selectedSize?.size_name || null,
                                    productPrice: selectedSize?.price || product.sale_price || 0,
                                    order: order,
                                    orderDate: orderDate,
                                    orderTime: orderTime,

                                }

                                setOrderSuccessData(orderSuccessData)
                                router.push(`/order-success`)

                            } catch (error: any) {
                                console.error('Purchase error:', error)
                                alert(
                                    error?.response?.data?.error ||
                                    'Failed to purchase product. Please try again.'
                                )
                            } finally {
                                setIsPurchasing(false)
                            }
                        }}
                        disabled={isPurchasing}
                    >
                        {isPurchasing ? 'Processing...' : 'Buy Now'}
                    </button>
                </div>
            </div>
        </div>
    )
}
