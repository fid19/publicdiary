export interface UserSignUpParams {
  username: string;
  password: string;
  email: string;
}

export interface UserLoginParams {
  username: string;
  password: string;
}

export interface CreateReplyParams {
  content: string;
  noteId: string;
  path: string;
}
