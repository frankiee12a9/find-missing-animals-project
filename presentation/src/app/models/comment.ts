export interface PostComment {
    id: number;
    timestamp: Date;
    body: string;
    username: string;
    displayName: string;
    imageUrl: string;
}

export interface Comment {
    postId: string;
    body: string;
    userToken: string | undefined;
}
