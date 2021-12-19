import axios from "axios";

export async function addTeam(data: Team): Promise<R<unknown>> {
    const resp = await axios.post('/admin/team', data)
    return resp.data
}

export async function deleteTeam(id: number): Promise<R<unknown>> {
    const resp = await axios.delete(`/admin/team/${id}`)
    return resp.data
}

export async function editTeam(id: number, data: Competition): Promise<R<unknown>> {
    const resp = await axios.post(`/admin/team/${id}`, data)
    return resp.data
}

export async function getAllTeam(): Promise<R<Array<Team>>> {
    const resp = await axios.get('/all-teams')
    return resp.data
}
