import React, {useEffect, useState} from 'react';
import {notification} from "antd";
import {getOkrById, updateOkr} from "../util/OkrApi";
import {OkrEntity, UserEntity} from "../constants/payload";
import {RouteComponentProps, useParams, withRouter} from "react-router";
import {APP_NAME} from "../constants";
import {OkrEditor} from "./OkrEditor";

interface OkrModifierProps {
    currentUser: UserEntity
}

const OkrModifierComponent: React.FC<OkrModifierProps & RouteComponentProps> =
    (props: OkrModifierProps & RouteComponentProps) => {
        const user = props.currentUser;
        const {okr_id} = useParams<{okr_id: string}>();
        const okrId = parseInt(okr_id, 10);
        const [okr, setOkr] = useState<OkrEntity | null>(null);
        useEffect(() => {
            (async () => {
                const getOkr = await getOkrById(okrId);
                setOkr(getOkr)
            })()
        }, [okrId]);
        const submit = async (kr: OkrEntity) => {
            const {obj, title, krs, id} = kr;
            const targetOkr: OkrEntity = {
                owner: user.name,
                ownerId: user.id,
                id,
                obj,
                title,
                krs
            };
            try {
                await updateOkr(targetOkr);
                props.history.push(`/user/${props.currentUser.id}/okr`)
            } catch (e) {
                notification.error({
                    message: APP_NAME,
                    description: 'some thing went wrong! Please try again!'
                });
            }
        };
        return (
            okr && <OkrEditor initOkr={okr} onSubmit={submit}/>
        )
    };
export const OkrModifier = withRouter(OkrModifierComponent);
