"use client"
import React, { useRef, useState } from 'react'
import { motion } from "motion/react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism"
import useData from '@/context/Context';
import { VscCopy } from 'react-icons/vsc';
import { IoMdCheckmark } from 'react-icons/io';
import { IoCopyOutline } from 'react-icons/io5';
import { createRoot } from 'react-dom/client';

const RequestPreview = () => {
  const { selectedResquest } = useData()
  const copyRef = useRef(null)


  const handleCopy = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(JSON.stringify(selectedResquest?.body, null, 2));
    if (copyRef.current) {
      const root = createRoot(copyRef.current);
      root.render(<>Done <IoMdCheckmark /></>)

      setTimeout(() => {
        const root = createRoot(copyRef.current!);
        root.render(<>Copy <IoCopyOutline /></>)
      }, 1000);
    }
  }


  const headers =
    typeof selectedResquest?.headers === "string"
      ? JSON.parse(selectedResquest.headers)
      : selectedResquest?.headers;

  return (
    <div className="flex-1 h-full bg-[#181818] overflow-y-auto hide-scrollbar relative">
      {selectedResquest ?
        <div className='p-10 '>
          <h1 className='text-xl'>{selectedResquest?.type} <span className='text-gray-400'>/</span></h1>
          {/* -------------headers---------- */}
          <div className='my-10'>
            <h1 className='font-medium text-lg'>Headers</h1>

            <div className='border border-white/10 rounded-xl mt-5'>
              {headers &&
                Object.keys(headers).map((key, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 px-8  text-sm py-3 border-b border-white/10 last:border-b-0"
                  >
                    <span className="text-gray-400 font-medium">
                      {key}
                    </span>

                    <span className="text-gray-200">
                      {headers[key]}
                    </span>
                  </div>
                ))}
            </div>
          </div>
          {/*  body */}
          <div className='my-10'>
            <div className='flex items-center justify-between'>
              <h1 className='font-medium text-lg'>Body</h1>
              <button ref={copyRef} onClick={handleCopy} className='flex bg-[#252525] text-[13px] cursor-pointer  px-2 py-0.5 rounded items-center justify-center gap-2'> Copy <VscCopy /></button>
            </div>

            <div className="max-w-4xlbg-[#111111] mt-5 w-full border border-white/10 rounded-2xl overflow-hidden">
              <SyntaxHighlighter
                language="json"
                style={dracula}
                showLineNumbers
                wrapLongLines
                customStyle={{
                  margin: 0,
                  padding: "24px",
                  background: "#111111",
                  fontSize: "14px",
                  maxWidth: "100%",
                }}
                codeTagProps={{
                  style: {
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                  },
                }}
              >
                {JSON.stringify(selectedResquest?.body, null, 2)}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
        : <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
          <motion.img
            animate={{ x: [0, -20, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
            src="./arrow.svg"
            alt="arrow icon"
            className="absolute top-16 left-5 z-50"
          />
          <div className='max-w-2xl'>
            <h1 className='text-4xl font-medium font-google-sans'>Webhook allows you to receive and inspect webhook requests. <span className='text-gray-200/50'>Use your unique webhook URL to send requests to send any webhook to it. </span></h1>
            <hr className='my-6 border-[0.9px] border-white/20 ' />

            <p className='text-gray-200/50 font-google-sans text-lg'>Popluar services that send webhooks: Shopify, Slack, Mailchimp, Trello, Github, PayPal, Discord, Jira.</p>
            <p className='text-gray-200/50 font-google-sans text-lg mt-4'>Webhooks are deleted after 7 days of inactivity.</p>
          </div>
        </div>}
    </div>
  )
}

export default RequestPreview