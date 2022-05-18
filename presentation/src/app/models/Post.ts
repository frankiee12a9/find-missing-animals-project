import { PostLocation } from './postLocation';
import { Tag1, Tag2, Tag3, Tag4, Tag5 } from './tag';
import { Photo } from './photo';

export interface Post {
  id: string;
  title: string;
  content: string;
  posterName: string;
  isFound: boolean;
  createdAt: Date;
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

export interface CreatePostDto {
  post: Post;
  tag1: Tag1;
  tag2: Tag2;
  tag3: Tag3;
  tag4: Tag4;
  tag5: Tag5;
}

export interface PostQueryParams {
  searchText: string;
  orderBy: string;
  pageNumber: number;
  pageSize: number;
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
