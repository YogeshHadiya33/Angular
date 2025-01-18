export class SignInRequest {
    email: string='';
    password: string='';
}


export class SignInResponse {
    userDetails: UserDetails = new UserDetails();
    token: string = '';
}

export class UserDetails {
    email: string = '';
    firstName: string = '';
    lastName: string = '';
}
