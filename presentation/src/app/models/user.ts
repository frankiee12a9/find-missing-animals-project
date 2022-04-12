
export interface User {
	username: string
	displayName: string
	token: string
	bio?: string
	image: string
}

export interface Login {
	email: string
	password: string
}

export interface Register {
	email: string
	password: string
	username: string
	display: string
}
