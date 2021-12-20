import axios from "axios";

//比赛id
export async function addCompetitionGroup(id: number): Promise<R<unknown>> {
    const resp = await axios.post('/admin/add-competition-group', {}, {
        params: {
            competitionId: id
        }
    })
    return resp.data
}

//组id
export async function removeCompetitionGroup(id: number): Promise<R<unknown>> {
    const resp = await axios.delete(`/admin/teams/${id}`)
    return resp.data
}


export async function updateCompetitionGroupInfo(id: number, data: Array<ArrangementGroup>): Promise<R<unknown>> {
    const resp = await axios.post(`/admin/teams/${id}`, data)
    return resp.data
}

export async function getCompetitionGroupInfo(id: number): Promise<R<Array<ArrangementGroup>>> {
    const resp = await axios.get('/all-teams')
    return resp.data
}

export async function getAthleteByCompetition(id: number): Promise<R<Array<Athlete>>> {
    const resp = await axios.get('/all-teams')
    return resp.data
}

export async function getRefereeByCompetition(id: number): Promise<R<Array<Referee>>> {
    const resp = await axios.get('/all-teams')
    return resp.data
}
