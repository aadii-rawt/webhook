"use client"
import api from "@/config/axios";
import axios from "axios";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface WebhookURLInter {
    url : string
}

interface ContextInter {
    selectedWebhook : WebhookURLInter,
    setSelectedWebhook : Dispatch<SetStateAction<WebhookURLInter>>,
    webhookURLs : WebhookURLInter[],
    setWebhookURLs: Dispatch<SetStateAction<WebhookURLInter[]>>,
}

const dataContext = createContext<ContextInter>(null);

export const DataProvider = ({children} : {children : any}) => {
    const [selectedWebhook,setSelectedWebhook] = useState( {
            url : "http.google.com"
        },)

    const [webhookURLs, setWebhookURLs] = useState<WebhookURLInter[]>([
        {
            url : "http.google.com"
        },
        {
            url : "http.facebook.com"
        },
        {
            url : "http.amazon.com"
        },
    ])

    const checkWebhook = () => {
        const exist = localStorage.getItem("webhooks");
        if(exist) {
            return JSON.parse(exist)
        }

        return false
    }

    const createWebhook = async () => {
        try {
            const res = await axios.post("http://localhost:4000/api/v1/webhook/create")
            localStorage.setItem("webhooks", JSON.stringify(res.data.data))
            console.log(res.data);        
        } catch (error) {
            
        }
    }

    useEffect(() => {
        const exist = checkWebhook()
        if(!exist) {
            createWebhook()
        }
    },[])
    
    return <dataContext.Provider value={{
        selectedWebhook, setSelectedWebhook,
        webhookURLs
    }} >
        {children}
    </dataContext.Provider>
}


const useData = () => {
    return useContext(dataContext)
}

export default useData;