
export interface User {
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
