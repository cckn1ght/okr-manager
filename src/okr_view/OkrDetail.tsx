import {Card, Button, List} from 'antd';
import React from 'react';
import {OkrEntity} from "../constants/payload";

export interface OkrDetailProps {
    okr: OkrEntity
    onDelete: () => void
    showDelete: boolean
}

const renderKr = (kr: string, index: number) => <List.Item>关键结果{index + 1}: {kr}</List.Item>;
export const OkrDetail: React.FC<OkrDetailProps> = (props: OkrDetailProps) => {
    const {title, obj, krs} = props.okr;
    return (
        <div>
            <div style={{padding: '30px', display: "block", width: "50%", margin: "auto"}}>
                <h2>
                    {title}
                    &nbsp;
                    &nbsp;
                    {props.showDelete && <Button type="danger" onClick={props.onDelete}>删除 OKR</Button>}
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

