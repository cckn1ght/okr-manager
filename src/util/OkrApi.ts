import api from "./APIUtils";
import {OkrEntity} from "../constants/payload";

export const getOwnerOkrs = (ownerId: number): Promise<OkrEntity[]> => {
    return api.get<OkrEntity[]>("/okr/findByOwnerId",
        {params: {ownerId}})
        .then(r => r.data)
};

export const createOkr = (okr: OkrEntity): Promise<OkrEntity> => {
    return api.post<OkrEntity>("/okr", okr)
        .then(r => r.data);
};
export const updateOkr = (okr: OkrEntity): Promise<OkrEntity> => {
    return api.put<OkrEntity>("/okr", okr)
        .then(r => r.data);
};
export const deleteOkrCall = (id: number): Promise<void> => {
    return api.delete(`/okr/${id.toString()}`);
};

export const getOkrById = (id: number): Promise<OkrEntity> => {
    return api.get<OkrEntity>(`/okr/${id}`)
        .then(r => r.data)
};
