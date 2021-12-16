interface Team {
    id: number,
    name: string,
    userName: string,
    password?: string,
}

interface CompetitionProto {
    id?: number,
    eventId?: number,
    ageGroupId?: number,
}

interface Competition extends CompetitionProto {
    id: number,
    eventId: number,
    eventName: string,
    ageGroupId: number,
    ageGroupName?: string,
    gender: 'male' | 'female',
    minAge: number,
    maxAge: number,
}

interface CompetitionEvent extends EventType {
    id: number,
    eventName: string,
    gender: 'male' | 'female',
    groups: Array<{
        ageGroupId: number,
        competitionId: number,
        signNumber?: number,
        name?: string
        minAge: number,
        maxAge: number,
    }>
}

interface AgeGroup {
    id: number,
    name?: string
    minAge: number,
    maxAge: number,
}

interface EventType {
    id: number,
    eventName: string,
    gender: 'male' | 'female',
}

