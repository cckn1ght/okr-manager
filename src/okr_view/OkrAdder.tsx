import React from 'react';
import {notification} from "antd";
import {createOkr} from "../util/OkrApi";
import {OkrEntity, UserEntity} from "../constants/payload";
import {RouteComponentProps, withRouter} from "react-router";
import {APP_NAME} from "../constants";
import {OkrEditor} from "./OkrEditor";

interface OkrAdderProps {
    currentUser: UserEntity
}

const OkrAdderComponent: React.FC<OkrAdderProps & RouteComponentProps> =
    (props: OkrAdderProps & RouteComponentProps) => {
        const user = props.currentUser;
        const emptyOkr: OkrEntity = {title: "", obj: "", krs: [""], owner: user.username, ownerId: user.id};
        const submit = async (okr: OkrEntity) => {
            const {obj, title, krs} = okr;
            const targetOkr: OkrEntity = {
                owner: user.name,
                ownerId: user.id,
                obj,
                title,
                krs
            };
            try {
                await createOkr(targetOkr);
                props.history.push(`/user/${props.currentUser.id}/okr`)
            } catch (e) {
                notification.error({
                    message: APP_NAME,
                    description: 'some thing went wrong! Please try again!'
                });
            }
        };
        return (
            <OkrEditor initOkr={emptyOkr} onSubmit={submit}/>
        )
    };
export const OkrAdder = withRouter(OkrAdderComponent);
