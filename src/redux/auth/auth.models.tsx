export interface IAuthState {
  currentUser?: ICurrentUser;
}

export interface ICurrentUser {
  uid: string;
  email: string;
}
