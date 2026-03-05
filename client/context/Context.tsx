"use client"
import api from "@/axios/axios";
import { responseType, webhookType } from "@/types/type";
import axios from "axios";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface WebhookURLInter {
    url: string
}

interface ContextInter {
    webhookURLs: webhookType[],
    setWebhookURLs: Dispatch<SetStateAction<webhookType[]>>,
    selectedWebhook: webhookType,
    setSelectedWebhook: Dispatch<SetStateAction<webhookType>>,
    createWebhook: () => void,
    deleteWebhook: () => void,
    response: responseType[],
    setResponse: Dispatch<SetStateAction<responseType[]>>,
    selectedResquest: responseType,
    setSelectedRequest: Dispatch<SetStateAction<responseType>>,
    getResponse: () => any,
    clearAllReponse: () => void,
    deleteResponse: (responseId: String) => void,
}

const dataContext = createContext<ContextInter>(null);

export const DataProvider = ({ children }: { children: any }) => {
    const [webhookURLs, setWebhookURLs] = useState<webhookType[] | []>([])
    const [selectedWebhook, setSelectedWebhook] = useState<webhookType>(null);
    const [response, setResponse] = useState<responseType[] | any>([])
    const [selectedResquest, setSelectedRequest] = useState<responseType | any>(null)

    const createWebhook = async () => {
        try {
            const { data } = await axios.post("/api/v1/webhook")
            const localWebhook = localStorage.getItem("webhooks")
            setSelectedWebhook(data.data)
            setWebhookURLs((prev) => ([...prev, data.data]))
            const udpatedData = localWebhook ? [...JSON.parse(localWebhook), data.data] : [data.data]
            localStorage.setItem("webhooks", JSON.stringify(udpatedData));
            setSelectedRequest(null)
        } catch (error) {
            console.log(error)
        }
    }

    const getResponse = async () => {
        try {
            if (!selectedWebhook.id) return
            const { data } = await axios.get(`/api/v1/response`, {
                params: {
                    webhookId: selectedWebhook.id
                }
            });
            setResponse(data.data)
            if (data?.data?.length > 0) {
                setSelectedRequest(data.data?.[0])
            }
        } catch (error) {

        }
    }

    const deleteWebhook = async () => {
        try {
            if (!selectedWebhook.id) return
            await api.delete("/webhook", {
                webhookId: selectedWebhook?.id
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
            await axios.delete(`/api/v1/response/delete-all`, { params: { webhookId: selectedWebhook.id } })
            setResponse([])
            setSelectedRequest(null)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteResponse = async (responseId) => {
        try {
            await axios.delete(`${process.env.URL}/inspect`, { params: { responseId } })
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

    // @ts-ignore
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