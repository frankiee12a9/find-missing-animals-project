
export interface User {
    id: string
    username: string
    displayName: string
    token: string
    bio?: string
    image: string
}

export interface LoginDto {
    email: string
    password: string
}

export interface RegisterDto {
    email: string
    password: string
    username: string
    display: string
}

export interface UserQueryParams {
    userName: string
    displayName: string
    pageNumber: number
    pageSize: number
    orderBy: string
    searchText: string
}

export interface UserProfileDto {
    userId: string
    username: string
    displayName: string
    bio: string
    image: string
    token: string
}