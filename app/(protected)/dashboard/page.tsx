'use client'

import { useEffect, useState } from 'react'
import { productsService, Product } from '@/app/service/products'
import ProductCard from './components/ProductCard'


export default function Dashboard() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await productsService.getNewProducts()
                setProducts(data.slice(0, 8))
            } catch (err) {
                console.error('Error fetching products:', err)
                setError('Failed to load products. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Loading products...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen p-15">
            <div className="w-full">
                <h1 className="text-[40px] font-semibold text-white mb-8">Men’s Jordan Shoes</h1>
                
                {products.length === 0 ? (
                    <div className="text-white text-center py-12">
                        No products available at the moment.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
