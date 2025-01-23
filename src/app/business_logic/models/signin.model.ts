export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignInResponse {
    userDetails: UserDetails;
    token: string;
}

export interface UserDetails {
    email: string;
    firstName: string;
    lastName: string;
}
