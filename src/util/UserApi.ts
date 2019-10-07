import request from "./APIUtils";
import {ApiResponse, JwtAuthenticationResponse, LoginRequest, SignUpRequest, UserEntity} from "../constants/payload";

export const login = (loginRequest: LoginRequest): Promise<JwtAuthenticationResponse> => {
    return request.post<JwtAuthenticationResponse>("/auth/signin", loginRequest)
        .then(r => r.data)
};
export const signup = (signUpRequest: SignUpRequest): Promise<ApiResponse> => {
    return request.post<ApiResponse>("/auth/signup", signUpRequest)
        .then(r => r.data)
};
export const getCurrentUser = (): Promise<UserEntity> => {
    return request.get<UserEntity>("/user/me")
        .then(r => r.data)
};
