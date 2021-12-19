interface R<T> {
    code: number,
    data?: T,
    msg?: string,
}



interface LoginResult {
    token: string,
    userName: string,
    name: string,
    userType: 'admin' | 'referee' | 'team_leader'
}
