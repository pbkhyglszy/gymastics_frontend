interface Team {
    id?: number,
    name?: string,
    userName?: string,
    password?: string,
}

interface TeamDetail {
    id?: number,
    name: string,
    members: Array<TeamMember | Athlete | Referee>
}

interface TeamMember {
    id?: number,
    name: string,
    type: string,
    idNumber: string,
    phone: string,
    gender?: 'male' | 'female',
}

interface Athlete extends TeamMember {
    age?: number,
    type: 'athlete',
    athleteId?: string,
    eventIds: Array<number>
}

interface Referee extends TeamMember {
    type: 'referee',
    userName?: string,
    password?: string,
}

interface Competition {
    id?: number,
    eventId?: number,
    ageClassId?: number,
}


interface GroupedCompetition {
    id: number,
    groups: Array<{
        ageClassId: number,
        competitionId: number,
        signedNumber?: number,
        type: 'qualification' | 'final'
    }>
}

interface AgeGroup {
    id?: number,
    name?: string
    minAge?: number,
    maxAge?: number,
}

interface EventType {
    id?: number,
    eventName?: string,
    gender?: 'male' | 'female',
}


interface Arrangement {
    competitionId?: number,
    groups: Array<ArrangementGroup>
}

interface ArrangementGroup {
    groupId?: number,
    groupName?: string,
    athletes: Array<{
        id?: number,
        name?: string,
        athleteId?: string,
        order: number,
    }>,
    referees: Array<{
        id?: number,
        name?: string,
        isChief?: boolean,
    }>
}

