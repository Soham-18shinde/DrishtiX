import { header } from 'motion/react-client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth,signIn,signOut } from '@/auth'


const NavBar = async() => {
    const session = await auth()
    return (
        <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <nav className="flex justify-between items-center">
                <Link href='/'>
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={100}
                        height={50}
                        className="h-20 w-auto object-contain"
                    />


                </Link>
                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                        <Link
                        href='/project/create'>
                        <span className='text-2 font-sans max-sm:hidden'>
                            Create
                        </span>
                    </Link>

                    <form
                            action={async ()=>{
                                "use server"
                                await signOut({redirectTo:"/"});
                                }}
                        >
                            <button type='submit' className='text-6 font-sans'>
                                LogOut
                            </button>
                        </form>
                     

                    <Link href={`/user/${session?.id}`}>
                       {session.user?.name}
                    </Link>

                        </>
                    ):(
                        <>
                        <form
                            action={async ()=>{
                                "use server"
                                await signIn('github');
                                }}
                        >
                            <button type='submit' className='text-6 font-sans'>
                                LogIn
                            </button>
                        </form>
                        </>
                    )}
                    


                </div>

            </nav>

        </header>
    )
}

export default NavBar