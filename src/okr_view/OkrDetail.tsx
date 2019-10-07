import {Card, List} from 'antd';
import React from 'react';
import {OkrEntity} from "../constants/payload";

export interface OkrViewProps {
    okr: OkrEntity
}

const renderKr = (kr: string, index: number) => <List.Item>{index + 1}. {kr}</List.Item>;
export const OkrDetail: React.FC<OkrViewProps> = (props: OkrViewProps) => {
    const {title, obj, krs} = props.okr;
    return (
        <div>
            <div style={{padding: '30px', display: "inline-block"}}>
                <h2>{title}</h2>
                <Card title={obj} bordered={true}>
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

