export interface LoginRequest {
    email: string,
    password: string
}
export interface SignUpRequest extends LoginRequest{
    name: string,
}
export interface JwtAuthenticationResponse {
    accessToken: string;
    tokenType: string;
}
export interface ApiResponse {
    success: boolean;
    message: string;
}
export interface UserEntity {
    id: number;
    name: string;
    username: string;
}

export interface OkrEntity {
    id?: number;
    ownerId: number;
    owner: string;
    title: string;
    obj: string;
    krs: string[];
}