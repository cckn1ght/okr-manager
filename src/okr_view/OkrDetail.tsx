import {Button, Card, List} from 'antd';
import React from 'react';
import {OkrEntity} from "../constants/payload";
import {Link} from "react-router-dom";

export interface OkrDetailProps {
    okr: OkrEntity
    onDelete: () => void
    isOwner: boolean
}

const renderKr = (kr: string, index: number) => <List.Item>关键结果{index + 1}: {kr}</List.Item>;
export const OkrDetail: React.FC<OkrDetailProps> = (props: OkrDetailProps) => {
    const {title, obj, krs, id} = props.okr;
    return (
        <div>
            <div style={{padding: '30px', display: "block", maxWidth: 1000, margin: "auto"}}>
                <h2 style={{display: "flex", justifyContent: "center", marginBottom: 20, position: "relative"}}>
                    {title}
                    &nbsp;
                    &nbsp;
                    <div style={{position: "absolute", right: "0px"}}>
                        {props.isOwner &&
                        <Link to={`/user/okr_modifier/${id!}`}>
                            <Button type="default">编辑 OKR</Button>
                        </Link>}
                        &nbsp;
                        &nbsp;
                        {props.isOwner && <Button type="danger"
                                                  onClick={props.onDelete}>删除 OKR</Button>}
                    </div>
                </h2>
                <Card title={`目标：${obj}`} bordered={true}>
                    <div style={{textAlign: "left", margin: "auto", display: "inline-block"}}>
                        <List
                            size="large"
                            dataSource={krs}
                            renderItem={renderKr}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
};

