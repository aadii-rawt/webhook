"use client"
import React, { useState, useRef, useEffect } from 'react'
import { HiOutlineDotsHorizontal, HiOutlineTrash } from 'react-icons/hi'
import { IoCopyOutline } from 'react-icons/io5'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { motion, AnimatePresence } from "motion/react";
import { VscClearAll } from 'react-icons/vsc'

const Sidebar = () => {
    const [drawer, setDrawer] = useState(false)
    const [menu, setMenu] = useState(false)

    const menuRef = useRef<HTMLDivElement>(null)
    const drawerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node
            
            if (menuRef.current && !menuRef.current.contains(target)) {
                setMenu(false)
            }

            if (drawerRef.current && !drawerRef.current.contains(target)) {
                setDrawer(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className='w-100 h-full bg-[#161616] p-4'>

            {/* Header */}
            <div className='my-5 flex items-center justify-between relative' ref={menuRef}>
                <h1 className='text-xl font-medium'>Webhook</h1>

                <button
                    onClick={() => setMenu(prev => !prev)}
                    className='p-2 rounded-lg hover:bg-[#232222] transition cursor-pointer'
                >
                    <HiOutlineDotsHorizontal />
                </button>

                <AnimatePresence>
                    {menu && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className='absolute min-w-50 right-0 bg-[#272727] px-1 py-2 rounded-xl text-[15px] z-50 top-10 space-y-1'
                        >
                            <div className='hover:bg-[#1e1e1e] flex items-center justify-between cursor-pointer rounded-md p-2'>
                                <h1>Clear requests</h1>
                                <VscClearAll />
                            </div>
                            <div className='hover:bg-[#1e1e1e] flex items-center justify-between text-red-400 cursor-pointer rounded-md p-2'>
                                <h1>Delete webhook</h1>
                                <HiOutlineTrash />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Drawer */}
            <div className='relative' ref={drawerRef}>
                <div className='border rounded-xl border-white/20 p-3 py-2.5 flex items-center justify-between'>
                    <h1 className='text-sm font-medium'>https:284093834kl3lk</h1>

                    <div className='flex items-center gap-1'>
                        <button className='text-white/50 text-xs hover:text-white transition'>
                            <IoCopyOutline />
                        </button>

                        <button
                            onClick={() => setDrawer(prev => !prev)}
                            className='text-white transition cursor-pointer'
                        >
                            <motion.div
                                animate={{ rotate: drawer ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <MdKeyboardArrowDown />
                            </motion.div>
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {drawer && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className='bg-[#232222] absolute w-full mt-0.5 py-1 border border-white/20 rounded-xl px-2 overflow-hidden'
                        >
                            <div className='py-2 px-3 rounded-lg hover:bg-[#272727] cursor-pointer'>
                                <h1 className='text-sm font-medium'>https:284093834kl3lk</h1>
                            </div>
                            <div className='py-2 px-3 rounded-lg hover:bg-[#272727] cursor-pointer'>
                                <h1 className='text-sm font-medium'>https:284093834kl3lk</h1>
                            </div>
                            <div className='py-2 px-3 rounded-lg hover:bg-[#272727] cursor-pointer'>
                                <h1 className='text-sm font-medium'>https:284093834kl3lk</h1>
                            </div>
                            <hr className='border-white/20 border-[0.9px] my-2' />
                            <div className='py-2 px-3 rounded-lg hover:bg-[#272727] cursor-pointer'>
                                <h1 className='text-sm font-medium'>New Webhook</h1>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className='my-3'>
                <div className='flex rounded-lg duration-300 cursor-pointer items-center justify-between py-3 px-3 hover:bg-[#272727]'>
                    <h1 className='text-[15px]'>POST</h1>
                    <div className='flex gap-2'>
                        <p className='text-[13px] text-gray-400'>24 Feb 11:49:34</p>
                        <button className='text-gray-400 cursor-pointer hover:text-white'><HiOutlineTrash /></button>
                    </div>
                </div>
                <div className='flex rounded-lg duration-300 cursor-pointer items-center justify-between py-3 px-3 hover:bg-[#272727]'>
                    <h1 className='text-[15px]'>POST</h1>
                    <div className='flex gap-2'>
                        <p className='text-[13px] text-gray-400'>24 Feb 11:49:34</p>
                        <button className='text-gray-400 cursor-pointer hover:text-white'><HiOutlineTrash /></button>
                    </div>
                </div>
                <div className='flex rounded-lg duration-300 cursor-pointer items-center justify-between py-3 px-3 hover:bg-[#272727]'>
                    <h1 className='text-[15px]'>POST</h1>
                    <div className='flex gap-2'>
                        <p className='text-[13px] text-gray-400'>24 Feb 11:49:34</p>
                        <button className='text-gray-400 cursor-pointer hover:text-white'><HiOutlineTrash /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar