import React, {useEffect, useState} from 'react';
import {OkrEntity, UserEntity} from "../constants/payload";
import {getOwnerOkrs} from "../util/OkrApi";
import {OkrDetail} from "./OkrDetail";

export interface OkrViewProps {
    currentUser: UserEntity | null
}

export const OkrView: React.FC<OkrViewProps> = (props: OkrViewProps) => {
    const [okrs, setOkrs] = useState<OkrEntity[]>([]);
    const user = props.currentUser;
    useEffect(() => {
        if (user) {
            (async () => {
                const res = await getOwnerOkrs(user.id);
                setOkrs(res);
            })()
        }
    }, [user]);
    console.log(okrs);
    return (
        <div>
            {okrs.map(okr => (
                <div>
                    <OkrDetail okr={okr} />
                </div>
            ))}
        </div>
    );
};

