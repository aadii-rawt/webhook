import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-between py-4'>
        <div>
            <h1 className='text-xl font-bold'>WebHook</h1>
        </div>
        <div>
            <Link href="">Star this Repo</Link>
        </div>
    </div>
  )
}

export default Header