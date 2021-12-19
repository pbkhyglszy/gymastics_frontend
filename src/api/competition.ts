import axios from "axios";

export async function getAllEvents(): Promise<Array<EventType>> {

    const resp = await axios.get('/all-events')
    return resp.data.data;

}

export async function getAllAgeGroups(): Promise<Array<AgeGroup>> {
    const resp = await axios.get('/all-age-groups')
    return resp.data.data;
}


export async function deleteAgeGroup(id: number): Promise<R<unknown>> {
    const resp = await axios.delete(`/admin/age-groups/${id}`)
    return resp.data
}


export async function deleteEvent(id: number): Promise<R<unknown>> {
    const resp = await axios.delete(`/admin/events/${id}`)
    return resp.data
}

export async function editAgeGroup(id: number, data: AgeGroup): Promise<R<unknown>> {
    const resp = await axios.post(`/admin/age-groups/${id}`, data)
    return resp.data
}


export async function editEvent(id: number, data: EventType): Promise<R<unknown>> {
    const resp = await axios.post(`/admin/events/${id}`, data)
    return resp.data
}

export async function addAgeGroup(data: AgeGroup): Promise<R<unknown>> {
    const resp = await axios.post('/admin/age-group', data)
    return resp.data
}


export async function addEvent(data: EventType): Promise<R<unknown>> {
    const resp = await axios.post('/admin/event', data)
    return resp.data
}

export async function getAllGroupedCompetitions(): Promise<R<Array<GroupedCompetition>>> {
    const resp = await axios.get('/all-grouped-competitions')
    return resp.data
}

export async function addCompetition(data: Competition): Promise<R<unknown>> {
    const resp = await axios.post('/admin/competition', data)
    return resp.data
}

export async function deleteCompetition(id: number): Promise<R<unknown>> {
    const resp = await axios.delete(`/admin/competition/${id}`)
    return resp.data
}

export async function editCompetition(id: number, data: Competition): Promise<R<unknown>> {
    const resp = await axios.post(`/admin/competition/${id}`, data)
    return resp.data
}





