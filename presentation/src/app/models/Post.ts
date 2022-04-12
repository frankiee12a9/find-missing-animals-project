import { PostLocation } from "./PostLocation"
import { Tag1, Tag2, Tag3, Tag4, Tag5 } from  "./Tags"
import { Photo } from "./Photo"

export interface Post {
    id: string
    title: string,
    content: string 
    posterName: string
    isFound: boolean
    createdAt: Date
    photoList: Photo[]
    tag1: Tag1
    tag2: Tag2 
    tag3: Tag3
    tag4: Tag4
    tag5: Tag5  
    postLocation: PostLocation
}

export interface UpdatePostDto {
    title: string
    content: string
    PostLocation: PostLocation
}