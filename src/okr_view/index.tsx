import React, {useCallback, useEffect, useState} from 'react';
import {OkrEntity, UserEntity} from "../constants/payload";
import {deleteOkrCall, getOwnerOkrs} from "../util/OkrApi";
import {OkrDetail} from "./OkrDetail";
import {Button, Divider, notification, Skeleton} from "antd";
import {Link, useParams} from "react-router-dom";
import {APP_NAME} from "../constants";
import {getUserById} from "../util/UserApi";

export interface CurrentUserProps {
    currentUser: UserEntity
}

export const OkrView: React.FC<CurrentUserProps> = (props: CurrentUserProps) => {
    const [okrs, setOkrs] = useState<OkrEntity[]>([]);
    const { user_id } = useParams<{user_id: string}>();
    const [loading, setLoading] = useState(true);
    const [targetUser, setTargetUser] = useState<UserEntity | null>(null);
    const userId = parseInt(user_id, 10);
    const user = props.currentUser;
    const isOwner = userId === user.id;
    useEffect(() => {
        reload()
    }, []);
    const reload = useCallback(() => {
        (async () => {
            setLoading(true);
            const res = await getOwnerOkrs(userId);
            setOkrs(res);
            if (!isOwner) {
                const targetU = await getUserById(userId);
                setTargetUser(targetU);
            }
            setLoading(false);
        })()
    }, [userId]);
    const deleteOkr = async (id: number) => {
        try {
            await deleteOkrCall(id);
            reload();
        } catch (e) {
            notification.error({
                message: APP_NAME,
                description: 'some thing went wrong! Please try again!'
            });
        }
    };
    return (
        <div style={{marginTop: 70}}>
            { (!isOwner && targetUser) && <h2 style={{textAlign: "center"}}>{targetUser.name}</h2> }
            {loading ?
                <Skeleton active={true} paragraph={{rows: 4}}/>  :
                okrs.map(okr => (
                <div key={okr.id!}>
                    <OkrDetail okr={okr} onDelete={() => deleteOkr(okr.id!)} showDelete={isOwner} />
                    <Divider dashed/>
                </div>
            ))}
            {
                isOwner &&
                <Link to="/okr_adder">
                    <Button type="primary" style={{margin: "auto", display: "block", marginBottom: 30}}>
                <span style={{width: 150}}>
                新增 OKR
                </span>
                    </Button>
                </Link>
            }
        </div>
    );
};
