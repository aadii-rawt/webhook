export type webhookType = {
    id: string,
    url: string,
    createdAt: Date,
}

export type responseType = {
    id: string,
    webhookId: string,
    type: String,
    body: any,
    headers: AudioNode,
    createdAt: Date | any
}