import { quicksand } from '@/app/fonts'
import { cn } from '@/lib/utils'
import React from 'react'

const ProductGallery = () => {
  return (
    <div className={cn(quicksand.className, 'space-y-4 md:space-y-8')}>
      <div className='flex flex-col gap-4 justify-between md:gap-10 sm:flex-row'>
        <h1 className='text-3xl font-semibold'>Popular Products</h1>

        <ul className='flex gap-4 items-end font-semibold'>
          <li className='text-rose-500'>All</li>
          <li>DELL</li>
          <li>IBM</li>
          <li>HP</li>
          <li>HUAWEI</li>
        </ul>
      </div>

      <div 
        className='
          grid
          lg:grid-cols-5
          md:grid-cols-3
          sm:grid-cols-1
          gap-4
        '
      >
        {
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className='h-96 w-full bg-rose-500 rounded-2xl'>

            </div>
          ))
        }
        
      </div>
    </div>
  )
}

export default ProductGallery
