export class SignUpRequest {
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    firstName: string = '';
    lastName: string = '';
    roleName: string = '';
}

export class SignUpResponse{
    firstName: string = '';
    lastName: string = '';
    id: string = '';
    userName: string = '';
    email: string = '';
    phoneNumber: string | null = null;
}