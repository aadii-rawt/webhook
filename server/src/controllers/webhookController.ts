import { Request, Response } from "express";
import prisma from "../config/prisma";
import { nanoid } from "nanoid";

export const createWebhook = (req :Request, res : Response) => {
    try {
        const webhookId = nanoid(8)
        console.log(webhookId);
        
        // prisma.webhook.create( {
        //     data : {
        //         url : "https:google.com"
        //     }
        // })
        res.status(200).json({success : true, msg : "webhook createad successfully", id : webhookId})
        
    } catch (error) {
        
    }
}


export const deleteWebhook = (req : Request,res : Response) => {
    try {
        
    } catch (error) {
        
    }
}