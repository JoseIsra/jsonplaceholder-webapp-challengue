export type CreatePostRequestModel = {
  userId: number;
  title: string;
  body: string;
};

export type UpdatePostRequestModel = {
  id: number;
  userId: number;
  title: string;
  body: string;
};
