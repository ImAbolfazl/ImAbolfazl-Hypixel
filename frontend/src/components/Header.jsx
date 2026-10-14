import React from 'react'
import { createPortal } from 'react-dom'
import head from '../assets/head.png'
import { IoCloseSharp, IoMenu } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react"
import { Link } from "react-router";

const Header = () => {
    const [sidebar, setSidebar] = React.useState(false)

    return (
        <>
            <div className='w-full fixed top-0 left-0 flex items-center justify-around bg-[#0a0a0a]/70 backdrop-blur-md h-22 z-50'>
                <Link to="/" className='flex items-center'>
                    <img src={head} alt="head" className='h-14'/>
                    <p className='text-3xl flex'>
                        <span className='text-[#F4DE00]'>ImAbo</span>
                        <span className='text-[#05D700]'>lfazl</span>
                    </p>
                </Link>

                <div className='flex gap-10 text-xl w-[30%] max-lg:hidden'>
                    <Link to="/General" className='cursor-pointer'>General</Link>
                    <Link to="/VampireZ" className='text-red-600 cursor-pointer'>VampireZ</Link>
                    <Link to="/Quests" className='text-green-500 cursor-pointer'>Quests</Link>
                    <Link to="/BedWars" className='flex cursor-pointer'>
                        <span className='text-white'>Bed</span>
                        <span className='text-red-600'>Wars</span>
                    </Link>
                </div>

                <div>
                    <IoMenu
                        size={40}
                        onClick={() => setSidebar(true)}
                        className='cursor-pointer hidden max-lg:block'
                    />
                </div>
            </div>

            {createPortal(
                <>
                    <AnimatePresence>
                        {sidebar && (
                            <motion.div
                                key="backdrop"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className='fixed inset-0 bg-[#0a0a0a]/60 z-[100]'
                                onClick={() => setSidebar(false)}
                            />
                        )}
                    </AnimatePresence>

                    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[110]">
                        <AnimatePresence>
                            {sidebar && (
                                <motion.div
                                    key="sidebar"
                                    initial={{ x: "100%" }}
                                    animate={{ x: 0 }}
                                    exit={{ x: "100%" }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className='pointer-events-auto absolute right-0 top-0 bg-[#0a0a0a]/90 h-screen w-[55%] p-10 flex flex-col items-center gap-4'
                                >
                                    <IoCloseSharp
                                        size={40}
                                        onClick={() => setSidebar(false)}
                                        className='cursor-pointer hidden max-lg:block mb-10'
                                    />
                                    <Link to="/General" className='cursor-pointer'>General</Link>
                                    <Link to="/VampireZ" className='text-red-600 cursor-pointer'>VampireZ</Link>
                                    <Link to="/Quests" className='text-green-500 cursor-pointer'>Quests</Link>
                                    <Link to="/BedWars" className='flex cursor-pointer'>
                                        <span className='text-white'>Bed</span>
                                        <span className='text-red-600'>Wars</span>
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </>,
                document.body
            )}
        </>
    )
}

export default Header