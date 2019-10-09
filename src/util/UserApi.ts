import api from "./APIUtils";
import {ApiResponse, JwtAuthenticationResponse, LoginRequest, SignUpRequest, UserEntity} from "../constants/payload";

export const login = (loginRequest: LoginRequest): Promise<JwtAuthenticationResponse> => {
    return api.post<JwtAuthenticationResponse>("/auth/signin", loginRequest)
        .then(r => r.data)
};
export const signup = (signUpRequest: SignUpRequest): Promise<ApiResponse> => {
    return api.post<ApiResponse>("/auth/signup", signUpRequest)
        .then(r => r.data)
};
export const getCurrentUser = (): Promise<UserEntity> => {
    return api.get<UserEntity>("/user/me")
        .then(r => r.data)
};
export const getUserById = (id: number): Promise<UserEntity> => {
    return api.get<UserEntity>(`/user/user/${id}`)
        .then(r => r.data)
};

export const getUserCount = (): Promise<number> => {
    return api
        .get<number>("/user/count")
        .then(r => r.data)
};
export const getUserByPage = (page: number, size: number): Promise<UserEntity[]> => {
    return api.get<UserEntity[]>("/user", {params: {page, size}}).then(r => r.data)
};

export const getAllUsers = (): Promise<UserEntity[]> => {
    return api.get<UserEntity[]>("/user/all").then(r => r.data)
};
