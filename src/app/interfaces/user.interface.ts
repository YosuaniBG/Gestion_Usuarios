export interface User {
    id?: number,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string,
    phone?: number,
    image?: string,
    address?: string,
    description?: string,
    cover?:string
}
