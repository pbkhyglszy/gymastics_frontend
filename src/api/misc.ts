import axios from "axios";

export async function updateProgress(progressDlt: number): Promise<R<unknown>> {
    const resp = await axios.post(`/admin/progress`, {}, {
        params: {
            progressDlt
        }
    })
    return resp.data
}

export async function getProgress(): Promise<R<number>> {
    const resp = await axios.get('/progress')
    return resp.data
}
