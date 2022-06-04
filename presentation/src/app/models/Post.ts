import { PostLocation } from './postLocation';
import { Tag1, Tag2, Tag3, Tag4, Tag5 } from './tag';
import { Photo } from './photo';
import { User } from './user';

export interface Post {
  id: string;
  title: string;
  content: string;
  posterName: string;
  isFound: boolean;
  postParticipants: User[];
  createdAt: string;
  photos: Photo[];
  tag1: Tag1;
  tag2: Tag2;
  tag3: Tag3;
  tag4: Tag4;
  tag5: Tag5;
  postLocation: PostLocation;
}

export interface UpdatePostDto {
  title: string;
  content: string;
  PostLocation: PostLocation;
}

export interface PostDto {
  title: string;
  content: string;
  postLocation: PostLocation;
}

export interface CreatePostDto {
  title: string;
  content: string;
  location: string;
  detailedLocation: string;
  File: Photo | any;
  File1?: Photo | any;
  File2?: Photo | any;
  Tag1: string | any;
  Tag2: string | any;
  Tag3: string | any;
  Tag4?: string | any;
  Tag5?: string | any;
}

export class CreatePostDto implements CreatePostDto {
  constructor(postToCreate: CreatePostDto) {
    if (postToCreate) {
      Object.assign(this, postToCreate);
    }
  }
}

export interface PostQueryParams {
  searchText: string;
  orderBy: string;
  pageNumber: number;
  pageSize: number;
  fromDate: string;
  follower: string;
  toDate: string;
  isPoster: boolean;
  roadLocation: string;
  detailedLocation: string;
  location: string;
  tags: string[];
  tag1: string;
  tag2: string;
  tag3: string;
  tag4: string;
  tag5: string;
}

export interface LastViewedPost {
  id: string;
  photos?: Photo[];
  title: string;
  content: string;
}
