"use client"
import React, { useState } from 'react'
import { motion } from "motion/react";

const headers = [
  { key: "Accept-Encoding", value: "gzip, br" },
  { key: "Connection", value: "close" },
  { key: "Content-Length", value: "4791" },
  { key: "Content-Type", value: "application/json" },
  { key: "User-Agent", value: "Helius-Webhook-Service/1.0" },
  { key: "X-Forwarded-For", value: "18.116.15.246" },
  { key: "X-Forwarded-Proto", value: "https" },
]
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism"
import useData from '@/context/Context';

const json = '[{"accountData":[{"account":"CKs1E69a2e9TmH4mKKLrXFF8kD3ZnwKjoEuXa6sz9WqX","nativeBalanceChange":-72938049280,"tokenBalanceChanges":[]},{"account":"NTYeYJ1wr4bpM5xo6zx5En44SvJFAd35zTxxNoERYqd","nativeBalanceChange":0,"tokenBalanceChanges":[]},{"account":"AAaTGaA3uVqikfVEwoSG7EwkCb4bBDsMEyueiVUS5CaU","nativeBalanceChange":0,"tokenBalanceChanges":[]},{"account":"autMW8SgBkVYeBgqYiTuJZnkvDZMVU2MHJh9Jh7CSQ2","nativeBalanceChange":0,"tokenBalanceChanges":[]},{"account":"D8TxfGwdu9MiNMoJmUoC9wQfNfNT7Lnm6DzifQHRTy6B","nativeBalanceChange":0,"tokenBalanceChanges":[]},{"account":"5DxD5ViWjvRZEkxQEaJHZw2sBsso6xoXx3wGFNKgXUzE","nativeBalanceChange":71860273440,"tokenBalanceChanges":[]},{"account":"25DTUAd1roBFoUQaxJQByL6Qy2cKQCBp4bK9sgfy9UiM","nativeBalanceChange":-2039280,"tokenBalanceChanges":[{"mint":"FdsNQE5EeCe57tbEYCRV1JwW5dzNCof7MUTaGWhmzYqu","rawTokenAmount":{"decimals":0,"tokenAmount":"-1"},"tokenAccount":"25DTUAd1roBFoUQaxJQByL6Qy2cKQCBp4bK9sgfy9UiM","userAccount":"1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix"}]},{"account":"DTYuh7gAGGZg2okM7hdFfU1yMY9LUemCiPyD5Z5GCs6Z","nativeBalanceChange":2039280,"tokenBalanceChanges":[{"mint":"FdsNQE5EeCe57tbEYCRV1JwW5dzNCof7MUTaGWhmzYqu","rawTokenAmount":{"decimals":0,"tokenAmount":"1"},"tokenAccount":"DTYuh7gAGGZg2okM7hdFfU1yMY9LUemCiPyD5Z5GCs6Z","userAccount":"CKs1E69a2e9TmH4mKKLrXFF8kD3ZnwKjoEuXa6sz9WqX"}]},{"account":"rFqFJ9g7TGBD8Ed7TPDnvGKZ5pWLPDyxLcvcH2eRCtt","nativeBalanceChange":1080000000,"tokenBalanceChanges":[]},{"account":"CgXS5xC3qAGSg9txD9bS7BUgugZwshivGXpCJcGmdwrd","nativeBalanceChange":-2234160,"tokenBalanceChanges":[]},{"account":"M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K","nativeBalanceChange":0,"tokenBalanceChanges":[]},{"account":"E8cU1WiRWjanGxmn96ewBgk9vPTcL6AEZ1t6F6fkgUWe","nativeBalanceChange":0,"tokenBalanceChanges":[]},{"account":"11111111111111111111111111111111","nativeBalanceChange":0,"tokenBalanceChanges":[]},{"account":"FdsNQE5EeCe57tbEYCRV1JwW5dzNCof7MUTaGWhmzYqu","nativeBalanceChange":0,"tokenBalanceChanges":[]},{"account":"AYZsWahcrSnkwqbA1ji7wEzgAnGjLNJhVUMDPfACECZf","nativeBalanceChange":0,"tokenBalanceChanges":[]},{"account":"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA","nativeBalanceChange":0,"tokenBalanceChanges":[]},{"account":"SysvarRent111111111111111111111111111111111","nativeBalanceChange":0,"tokenBalanceChanges":[]},{"account":"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL","nativeBalanceChange":0,"tokenBalanceChanges":[]},{"account":"1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix","nativeBalanceChange":0,"tokenBalanceChanges":[]}],"description":"5DxD5ViWjvRZEkxQEaJHZw2sBsso6xoXx3wGFNKgXUzE sold Fox #7637 to CKs1E69a2e9TmH4mKKLrXFF8kD3ZnwKjoEuXa6sz9WqX for 72 SOL on MAGIC_EDEN.","events":{"nft":{"amount":72000000000,"buyer":"CKs1E69a2e9TmH4mKKLrXFF8kD3ZnwKjoEuXa6sz9WqX","description":"5DxD5ViWjvRZEkxQEaJHZw2sBsso6xoXx3wGFNKgXUzE sold Fox #7637 to CKs1E69a2e9TmH4mKKLrXFF8kD3ZnwKjoEuXa6sz9WqX for 72 SOL on MAGIC_EDEN.","fee":10000,"feePayer":"CKs1E69a2e9TmH4mKKLrXFF8kD3ZnwKjoEuXa6sz9WqX","nfts":[{"mint":"FdsNQE5EeCe57tbEYCRV1JwW5dzNCof7MUTaGWhmzYqu","tokenStandard":"NonFungible"}],"saleType":"INSTANT_SALE","seller":"5DxD5ViWjvRZEkxQEaJHZw2sBsso6xoXx3wGFNKgXUzE","signature":"5nNtjezQMYBHvgSQmoRmJPiXGsPAWmJPoGSa64xanqrauogiVzFyGQhKeFataHGXq51jR2hjbzNTkPUpP787HAmL","slot":171942732,"source":"MAGIC_EDEN","staker":"","timestamp":1673445241,"type":"NFT_SALE"}},"fee":10000,"feePayer":"CKs1E69a2e9TmH4mKKLrXFF8kD3ZnwKjoEuXa6sz9WqX","nativeTransfers":[{"amount":72936000000,"fromUserAccount":"CKs1E69a2e9TmH4mKKLrXFF8kD3ZnwKjoEuXa6sz9WqX","toUserAccount":"AAaTGaA3uVqikfVEwoSG7EwkCb4bBDsMEyueiVUS5CaU"},{"amount":2011440,"fromUserAccount":"CKs1E69a2e9TmH4mKKLrXFF8kD3ZnwKjoEuXa6sz9WqX","toUserAccount":"D8TxfGwdu9MiNMoJmUoC9wQfNfNT7Lnm6DzifQHRTy6B"},{"amount":71856000000,"fromUserAccount":"AAaTGaA3uVqikfVEwoSG7EwkCb4bBDsMEyueiVUS5CaU","toUserAccount":"5DxD5ViWjvRZEkxQEaJHZw2sBsso6xoXx3wGFNKgXUzE"},{"amount":1080000000,"fromUserAccount":"AAaTGaA3uVqikfVEwoSG7EwkCb4bBDsMEyueiVUS5CaU","toUserAccount":"rFqFJ9g7TGBD8Ed7TPDnvGKZ5pWLPDyxLcvcH2eRCtt"},{"amount":2039280,"fromUserAccount":"CKs1E69a2e9TmH4mKKLrXFF8kD3ZnwKjoEuXa6sz9WqX","toUserAccount":"DTYuh7gAGGZg2okM7hdFfU1yMY9LUemCiPyD5Z5GCs6Z"}],"signature":"5nNtjezQMYBHvgSQmoRmJPiXGsPAWmJPoGSa64xanqrauogiVzFyGQhKeFataHGXq51jR2hjbzNTkPUpP787HAmL","slot":171942732,"source":"MAGIC_EDEN","timestamp":1673445241,"tokenTransfers":[{"fromTokenAccount":"25DTUAd1roBFoUQaxJQByL6Qy2cKQCBp4bK9sgfy9UiM","fromUserAccount":"1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix","mint":"FdsNQE5EeCe57tbEYCRV1JwW5dzNCof7MUTaGWhmzYqu","toTokenAccount":"DTYuh7gAGGZg2okM7hdFfU1yMY9LUemCiPyD5Z5GCs6Z","toUserAccount":"CKs1E69a2e9TmH4mKKLrXFF8kD3ZnwKjoEuXa6sz9WqX","tokenAmount":1,"tokenStandard":"NonFungible"}],"type":"NFT_SALE"}]'


const RequestPreview = () => {
  const { selectedResquest } = useData()
  console.log(selectedResquest);

  return (
    <div className="flex-1 h-full bg-[#181818] overflow-y-auto ovefi relative">
      {selectedResquest ?
        <div className='p-10 '>
          <h1 className='text-xl'>{selectedResquest?.type} <span className='text-gray-400'>/</span></h1>
          {/* -------------headers---------- */}
          <div className='my-10'>
            <h1 className='font-medium text-lg'>Headers</h1>

            <div className='border border-white/10 rounded-xl mt-5'>
              {Object?.keys(selectedResquest?.headers).map((key, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 px-8  text-sm py-3 border-b border-white/10 last:border-b-0"
                >
                  <span className="text-gray-400 font-medium">
                    {key}
                  </span>

                  <span className="text-gray-200">
                    {selectedResquest?.headers[key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/*  body */}
          <div className='my-10'>
            <h1 className='font-medium text-lg'>Body</h1>

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