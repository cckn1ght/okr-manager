import React, {useState} from 'react';
import {Button, Card, Input, List, notification} from "antd";
import {createOkr} from "../util/OkrApi";
import {OkrEntity, UserEntity} from "../constants/payload";
import {RouteComponentProps, withRouter} from "react-router";
import {APP_NAME} from "../constants";

interface OkrAdderProps {
    currentUser: UserEntity
}

const OkrAdderComponent: React.FC<OkrAdderProps & RouteComponentProps> =
    (props: OkrAdderProps & RouteComponentProps) => {
    const [title, setTitle] = useState("");
    const [obj, setObj] = useState("");
    const [krs, setKrs] = useState<string[]>([""]);
    const user = props.currentUser;
    const submit = async () => {
        const targetOkr: OkrEntity = {
            owner: user.name,
            ownerId: user.id,
            obj,
            title,
            krs
        };
        try {
            await createOkr(targetOkr);
            props.history.push("/")
        } catch (e) {
            notification.error({
                message: APP_NAME,
                description: 'some thing went wrong! Please try again!'
            });
        }
    };
    const renderKr = (kr: string, index: number) =>
        (<List.Item>
            <div style={{width: "100%"}}>
                <span style={{width: "30%"}}>
            关键结果{index + 1}. &nbsp;
                </span>
            <Input placeholder="Key Result"
                   style={{width: "80%"}}
                   value={krs[index]}
                   onChange={e => {
                       const newKrs = [...krs];
                       newKrs[index] = e.target.value;
                       setKrs(newKrs);
                   }}
            />
            </div>
        </List.Item>);
    return (
        <div style={{marginTop: 70}}>
            <div style={{padding: '30px', display: "block", width: "50%", margin: "auto"}}>
                <Input placeholder="Title e.g. 第x季度 OKR"
                       value={title}
                       onChange={e => setTitle(e.target.value)}
                       style={{marginBottom: 20}}
                />
                <Card
                    title={(
                        <div>
                            目标：
                        <Input
                            placeholder="Object"
                            value={obj}
                            onChange={e => setObj(e.target.value)}
                            style={{width: "80%"}}
                        />
                        </div>
                    )}
                    bordered={true}
                >
                    <div style={{textAlign: "left", margin: "auto", width: "100%"}}>
                        <List
                            size="large"
                            dataSource={krs}
                            renderItem={renderKr}
                        />
                    </div>
                    <div>
                    <Button type="primary" onClick={() => {
                        setKrs([...krs, ""])
                    }}>添加关键结果</Button>
                    </div>
                </Card>
            </div>
            <Button
                type="primary"
                style={{margin: "auto", display: "block", marginBottom: 30}}
                onClick={() => submit()}
            >
                <span style={{width: 150}}>
                确认 OKR
                </span>
            </Button>
        </div>
    );
};
export const OkrAdder = withRouter(OkrAdderComponent);
