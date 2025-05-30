import Link from 'next/link'
import { auth } from '@/lib/auth'
import { LogOutButton } from './log-out-button'
export const Header = async () => {
  const user = await auth.getUser()
  return (
    <header className='flex h-16 w-full items-center justify-between gap-4 px-4 py-2 md:px-20'>
      <Link href='/' className='text-2xl font-bold'>
        Reddit
      </Link>
      {user ? (
        <div className=' flex gap-2'>
        <Link href='/create' className='button-primary'>Create post</Link>
        <LogOutButton/>
        </div>
      ) : (
        <Link href='/auth/log-in' className='button-primary'>
          Log in
        </Link>
      )}
    </header>
  )
}
