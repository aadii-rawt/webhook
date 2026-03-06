import RequestPreview from '@/components/RequestPreview'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const Webhook = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="border border-white/20 rounded-xl w-full max-w-6xl overflow-hidden h-[75vh] flex">
                <Sidebar />
                <RequestPreview />
            </div>

        </div>
    )
}

export default Webhook