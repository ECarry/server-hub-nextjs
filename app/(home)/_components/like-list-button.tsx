import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

const LikeListButon = () => {
  return (
    <div className='flex items-center'>
      <Button size='icon' variant='ghost' className='relative' >
        <Heart size={32} className='text-primary' />
        <div className='rounded-full w-5 h-5 flex items-center justify-center bg-green-500 absolute top-0 right-0'>
        <span className='text-xs text-white'>5</span>
      </div>
      </Button>
    </div>
    
  )
}

export default LikeListButon
