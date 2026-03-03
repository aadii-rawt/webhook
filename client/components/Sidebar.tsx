"use client"
import React, { useState, useRef, useEffect } from 'react'
import { HiOutlineDotsHorizontal, HiOutlineTrash } from 'react-icons/hi'
import { IoCheckmarkSharp, IoCopyOutline } from 'react-icons/io5'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { motion, AnimatePresence } from "motion/react";
import { VscClearAll } from 'react-icons/vsc'
import useData from '@/context/Context'
import Spinner from './Spinner'
import { div, h1 } from 'motion/react-client'

const Sidebar = () => {
    const [drawer, setDrawer] = useState(false)
    const [menu, setMenu] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const drawerRef = useRef<HTMLDivElement>(null)
    const [loading, setLoading] = useState(false)
    const [responseLoading,setResponseLoading] = useState(true)

    const { selectedWebhook, setSelectedWebhook, webhookURLs, createWebhook, deleteWebhook, response,selectedResquest, setSelectedRequest, getResponse, clearAllReponse , deleteResponse} = useData()
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

    const createNewWebhook = async () => {
        setLoading(true)
        try {
            await createWebhook()
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
            setDrawer(false);
        }

    }

    const handleDeleteWebhook = () => {
        deleteWebhook()
        setMenu(false)
    }

    useEffect(() => {
        try {
            setResponseLoading(true)
            getResponse()
        } catch (error) {
            
        }finally{
            setResponseLoading(false)
        }
    }, [selectedWebhook])

    return (
        <div className='w-100 h-full bg-[#161616] p-4'>
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
                            <div onClick={clearAllReponse} className='hover:bg-[#1e1e1e] flex items-center justify-between cursor-pointer rounded-md p-2'>
                                <h1>Clear requests</h1>
                                <VscClearAll />
                            </div>
                            <button onClick={handleDeleteWebhook} className='w-full hover:bg-[#1e1e1e] flex items-center justify-between text-red-400 cursor-pointer rounded-md p-2'>
                                <h1>Delete webhook</h1>
                                <HiOutlineTrash />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Drawer */}
            <div className='relative' ref={drawerRef}>
                <div className='border rounded-xl border-white/20 p-3 py-2.5 flex gap-3 items-center justify-between'>
                    {selectedWebhook ? <h1 className='text-sm font-medium'>{selectedWebhook?.url}</h1> :
                        <div className='bg-[#333333] w-full h-5 animate-pulse rounded'>

                        </div>
                    }

                    <div className='flex items-center gap-1'>
                        <button onClick={() => navigator.clipboard.writeText(selectedWebhook?.url)} className='text-white/50 cursor-pointer text-xs hover:text-white transition'>
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
                            className='bg-[#232222] z-50 absolute w-full mt-0.5 py-1 border border-white/20 rounded-xl px-2 overflow-hidden'
                        >
                            {webhookURLs.length > 0 && webhookURLs?.map((web) => (
                                <button onClick={() => setSelectedWebhook(web)} className='py-2 px-3 w-full rounded-lg flex items-center justify-between  hover:bg-[#272727] cursor-pointer'>
                                    <h1 className='text-sm font-medium'>{web?.url}</h1>
                                    {web.url == selectedWebhook.url && <IoCheckmarkSharp />}

                                </button>
                            ))}

                            <hr className='border-white/20 border-[0.9px] my-2' />
                            <button disabled={loading} onClick={createNewWebhook} className='py-2 px-3 w-full rounded-lg  hover:bg-[#272727] cursor-pointer'>
                                {loading ?
                                    <div className='flex w-full items-center text-center justify-center'>
                                        <Spinner />
                                    </div> :
                                    <h1 className='text-sm text-left font-medium'>New Webhook</h1>
                                }
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className='my-3'>
                {responseLoading ? 
                ["", "", ""].map((_, i) => (
                        <div key={i} className='flex rounded-lg duration-300 my-3 w-full bg-[#333333] h-8 animate-pulse cursor-pointer items-center justify-between py-3 px-3 hover:bg-[#272727]'>

                        </div>
                    )) : 
                 response.length > 0 ? response.map((res, i) => (
                    <div onClick={() => setSelectedRequest(res)} key={i} className='flex rounded-lg duration-300 cursor-pointer items-center justify-between py-3 px-3 hover:bg-[#272727]'>
                        <h1 className='text-[15px]'>{res?.type}</h1>
                        <div className='flex gap-2'>
                            <p className='text-[13px] text-gray-400'>{res.createdAt}</p>
                            {selectedResquest?.id == res?.id && <button onClick={() => deleteResponse(res.id)} className='text-gray-400 cursor-pointer hover:text-white'><HiOutlineTrash /></button> }
                        </div>
                    </div>
                )) :
                    <h1 className='w-full text-center text-sm mt-5 text-gray-500'>No request yet</h1>
                }

            </div>
        </div>
    )
}

export default Sidebar