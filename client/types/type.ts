export type webhookType = {
    id: String,
    url: String,
    createdAt: Date,
}

export type responseType = {
    id: String,
    webhookId: String,
    type: String,
    body: any,
    headers: AudioNode,
    createdAt: Date | any
}