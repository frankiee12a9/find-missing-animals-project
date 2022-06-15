export interface PostComment {
  id: number;
  timestamp: Date;
  body: string;
  username: string;
  displayName: string;
  imageUrl: string;
}

export interface CommentDto {
  postId: string;
  body: string;
}
