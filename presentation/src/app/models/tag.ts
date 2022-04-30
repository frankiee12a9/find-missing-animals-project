import {Post} from "./post"


export interface Tag1 {
    Id: number
    tagName: string
}

export interface Tag2 {
    Id: number 
    tagName: string
}

export interface Tag3 {
    Id: number,
    tagName: string 
}

export interface Tag4 {
    Id: number
    tagName: string
}

export interface Tag5 {
    Id: number
    tagName: string
}

export interface Tag {
    id: number
    tagName: string
}

export interface TagDto {
    id: number 
    tagName: string 
    posts: Post[]
}