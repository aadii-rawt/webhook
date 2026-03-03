"use client"
import api from "@/axios/axios";
import axios from "axios";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface WebhookURLInter {
    url: string
}

interface ContextInter {
    selectedWebhook: WebhookURLInter,
    setSelectedWebhook: Dispatch<SetStateAction<WebhookURLInter>>,
    webhookURLs: WebhookURLInter[],
    setWebhookURLs: Dispatch<SetStateAction<WebhookURLInter[]>>,
    createWebhook: () => void,
    deleteWebhook: () => void,
    response: any,
    setResponse : any ,
    selectedResquest: any,
    setSelectedRequest: any,
    getResponse: () => any,
    clearAllReponse : () => void,
    deleteResponse : () => void | any
}

const dataContext = createContext<ContextInter>(null);

export const DataProvider = ({ children }: { children: any }) => {
    const [webhookURLs, setWebhookURLs] = useState<WebhookURLInter[] | []>([])
    const [selectedWebhook, setSelectedWebhook] = useState(null);
    const [response, setResponse] = useState<any>([])
    const [selectedResquest, setSelectedRequest] = useState(null)

    const createWebhook = async () => {
        try {
            const { data } = await api.post("/webhook/create")
            const localWebhook = localStorage.getItem("webhooks")
            setSelectedWebhook(data.data)
            setWebhookURLs((prev) => ([...prev, data.data]))
            const udpatedData = localWebhook ? [...JSON.parse(localWebhook), data.data] : [data.data]
            localStorage.setItem("webhooks", JSON.stringify(udpatedData))
        } catch (error) {
            console.log(error)
        }
    }

    const getResponse = async () => {
        try {
            if (!selectedWebhook.id) return
            const { data } = await axios.get("http://localhost:4000/inspect", {
                params: {
                    webhookId: selectedWebhook.id
                }
            });
            setResponse(data.data)
            if(data?.data?.length > 0) {
                setSelectedRequest(data.data?.[0])
            }
        } catch (error) {

        }
    }

    const deleteWebhook = async () => {
        try {
            if (!selectedWebhook.id) return
            await api.delete("/webhook", {
                params: {
                    webhookId: selectedWebhook?.id
                }
            })

            const updatedWebhooks = webhookURLs?.filter((item) => item.id != selectedWebhook.id)
            setWebhookURLs(updatedWebhooks);
            setSelectedWebhook(updatedWebhooks[0])
            localStorage.setItem("webhooks", JSON.stringify(updatedWebhooks));
        } catch (error) {

        }
    }

    const clearAllReponse = async () => {
        try {
            await axios.delete("http://localhost:4000/inspect/deleteAll", {params : {webhookId : selectedWebhook.id}})
            setResponse([])
            setSelectedRequest(null)
        } catch (error) {
            console.log(error);  
        }
    }

    const deleteResponse = async (responseId) => {
        try {
            await axios.delete("http://localhost:4000/inspect", {params : {responseId}})
            setResponse([])
            const udpateResponse = response?.filter((res) => res.id != responseId)
            setResponse(udpateResponse)
            setSelectedRequest(null)
        } catch (error) {
            console.log(error);  
        }
    }

    useEffect(() => {
        const isWebhookExist = localStorage.getItem("webhooks");
        if (isWebhookExist) {
            setWebhookURLs(JSON.parse(isWebhookExist))
            setSelectedWebhook(JSON.parse(isWebhookExist)[0])
            return;
        }
        createWebhook()
    }, [])

    return <dataContext.Provider value={{
        selectedWebhook, setSelectedWebhook,
        webhookURLs,
        createWebhook, deleteWebhook,
        response, getResponse, setResponse,
        selectedResquest, setSelectedRequest, clearAllReponse, deleteResponse
    }} >
        {children}
    </dataContext.Provider>
}


const useData = () => {
    return useContext(dataContext)
}

export default useData;