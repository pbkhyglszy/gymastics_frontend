import axios from "axios";

export async function addTeam(data: Team): Promise<R<unknown>> {
    const resp = await axios.post('/admin/team', data)
    return resp.data
}

export async function deleteTeam(id: number): Promise<R<unknown>> {
    const resp = await axios.delete(`/admin/teams/${id}`)
    return resp.data
}

export async function editTeam(id: number, data: Competition): Promise<R<unknown>> {
    const resp = await axios.post(`/admin/teams/${id}`, data)
    return resp.data
}

export async function getAllTeam(): Promise<R<Array<Team>>> {
    const resp = await axios.get('/all-teams')
    return resp.data
}

export async function getTeamDetail(): Promise<R<TeamDetail>> {
    const resp = await axios.get(`/team-detail`)
    return resp.data
}

export async function updateTeamDetail(data: TeamDetail): Promise<R<unknown>> {
    const resp = await axios.post(`/leader/teams`, data)
    return resp.data
}
