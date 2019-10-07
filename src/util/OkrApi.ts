import request from "./APIUtils";
import {OkrEntity} from "../constants/payload";

export const getOwnerOkrs = (ownerId: number): Promise<OkrEntity[]> => {
    return request.get<OkrEntity[]>("/okr/findByOwnerId",
        {params: {ownerId}})
        .then(r => r.data)
};
