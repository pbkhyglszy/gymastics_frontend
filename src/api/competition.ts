import axios from "axios";

export async function getAllEvents(): Promise<Array<EventType>> {
    return [{
        id: 1,
        eventName: '单杠',
        gender: 'male',
    },
        {
            id: 2,
            eventName: '双杠',
            gender: 'male',
        },
        {
            id: 3,
            eventName: '自由体操',
            gender: 'male',
        }, {
            id: 4,
            eventName: '自由体操',
            gender: 'female',
        },];
}

export async function getAllAgeGroups(): Promise<Array<AgeGroup>> {
    return [{
        id: 1,
        minAge: 7,
        maxAge: 9,
    },
        {
            id: 2,
            minAge: 9,
            maxAge: 11,
        },
        {
            id: 3,
            minAge: 11,
            maxAge: 13,
        },];
}


export async function deleteAgeGroup(id: number): Promise<R<unknown>> {
    const resp = await axios.post('')
    return resp.data
}


export async function deleteEvent(id: number): Promise<R<unknown>> {
    const resp = await axios.post('')
    return resp.data
}

export async function editAgeGroup(id: number, data: AgeGroup): Promise<R<unknown>> {
    const resp = await axios.post('')
    return resp.data
}


export async function editEvent(id: number, data: EventType): Promise<R<unknown>> {
    const resp = await axios.post('')
    return resp.data
}

export async function addAgeGroup(data: AgeGroup): Promise<R<unknown>> {
    const resp = await axios.post('')
    return resp.data
}


export async function addEvent(data: EventType): Promise<R<unknown>> {
    const resp = await axios.post('')
    return resp.data
}

export async function getAllGroupedCompetitions(): Promise<R<Array<GroupedCompetition>>> {
    const resp = await axios.post('')
    return resp.data
}

export async function addCompetition(data: Competition): Promise<R<unknown>> {
    const resp = await axios.post('')
    return resp.data
}

export async function deleteCompetition(id: number): Promise<R<unknown>> {
    const resp = await axios.post('')
    return resp.data
}

export async function editCompetition(id: number, data: Competition): Promise<R<unknown>> {
    const resp = await axios.post('')
    return resp.data
}





