export interface LoginResponse {
    data: {
    tokenType: string,
    accessToken: {
        id:string,
        name:string,
        email:string,
        role:string,
        token:string
    }
}
}

export interface LoginPayload {
    email: string,
    password: string
}
