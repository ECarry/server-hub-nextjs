import { quicksand } from '@/app/fonts'
import { cn } from '@/lib/utils'
import Image from 'next/image'

import DELL from '@/public/DELL.png'
import IBM from '@/public/IBM.png'
import HP from '@/public/HP.png'
import HUAWEI from '@/public/Huawei.png'

const CategorySlider = () => {
  return (
    <div className={cn(quicksand.className, 'space-y-8')}>
      <div className='flex gap-8'>
        <h1 className='text-3xl font-semibold'>Product Categories</h1>

        <ul className='flex gap-4 items-end text-lg'>
          <li className='text-rose-500'>Servers</li>
          <li>Storage</li>
          <li>Networking</li>
        </ul>
      </div>

      <div className='flex gap-8'>
        <div className='flex gap-8'>
          <div className='h-[180px] w-[130px] bg-blue-300 rounded-md flex flex-col gap-4 items-center justify-between py-4'>
            <Image 
              src={DELL}
              alt='dell logo'
              height={80}
              width={80}
              className='object-contain'
            />

            <div className='text-center'>
              <h1>DELL</h1>
              <p className='text-xs'>24 items</p>
            </div>
          </div>
        </div>

        <div className='flex gap-8'>
          <div className='h-[180px] w-[130px] bg-sky-300 rounded-md flex flex-col gap-4 items-center justify-between py-4'>
            <Image 
              src={IBM}
              alt='ibm logo'
              height={80}
              width={80}
              className='object-contain'
            />

            <div className='text-center'>
              <h1>IBM</h1>
              <p className='text-xs'>24 items</p>
            </div>
          </div>
        </div>

        <div className='flex gap-8'>
          <div className='h-[180px] w-[130px] bg-cyan-300 rounded-md flex flex-col gap-4 items-center justify-between py-4'>
            <Image 
              src={HP}
              alt='HP logo'
              height={80}
              width={80}
              className='object-contain'
            />

            <div className='text-center'>
              <h1>HP</h1>
              <p className='text-xs'>24 items</p>
            </div>
          </div>
        </div>

        <div className='flex gap-8'>
          <div className='h-[180px] w-[130px] bg-red-300 rounded-md flex flex-col gap-4 items-center justify-between py-4'>
            <Image 
              src={HUAWEI}
              alt='huawei logo'
              height={80}
              width={80}
              className='object-contain'
            />

            <div className='text-center'>
              <h1>Huawei</h1>
              <p className='text-xs'>24 items</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategorySlider
