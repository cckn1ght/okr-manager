import React, {useReducer} from 'react';
import {Button, Card, Input, List} from "antd";
import {OkrEntity} from "../constants/payload";

interface OkrEditorProps {
    initOkr: OkrEntity
    onSubmit: (okr: OkrEntity) => void
}

interface OkrReducerAction {
    type: "title" | "obj" | "krs" | "add_kr" | "delete_kr"
    content?: string
    index?: number
}

const okrReducer = (state: OkrEntity, action: OkrReducerAction): OkrEntity => {
    switch (action.type) {
        case "title":
            return {...state, "title": action.content!};
        case "obj":
            return {...state, "obj": action.content!};
        case "krs":
            const newKrs = [...state.krs];
            newKrs[action.index!] = action.content!;
            return {...state, "krs": newKrs};
        case "add_kr":
            const addOne = [...state.krs, ""];
            return {...state, "krs": addOne};
        case "delete_kr":
            const nKrs = [...state.krs];
            nKrs.splice(action.index!, 1);
            return {...state, "krs": nKrs};
        default:
            throw new Error();
    }
};

export const OkrEditor = (props: OkrEditorProps) => {
    const [okr, dispatch] = useReducer(okrReducer, props.initOkr);
    const renderKr = (kr: string, index: number) =>
        (<List.Item>
            <div style={{width: "100%"}}>
                <span style={{width: "30%"}}>
            关键结果{index + 1}. &nbsp;
                </span>
                <Input placeholder="Key Result"
                       style={{width: "80%"}}
                       value={okr.krs[index]}
                       onChange={e => {
                           dispatch({type: "krs", index, content: e.target.value});
                       }}
                />
                <Button type="danger" style={{marginLeft: 20}}
                        onClick={() => dispatch({type: "delete_kr", index})}>删除</Button>
            </div>
        </List.Item>);
    return (
        <div style={{marginTop: 70}}>
            <div style={{padding: '30px', display: "block", width: "50%", margin: "auto"}}>
                <Input placeholder="Title e.g. 第x季度 OKR"
                       value={okr.title}
                       onChange={e => dispatch({type: "title", content: e.target.value})}
                       style={{marginBottom: 20}}
                />
                <Card
                    title={(
                        <div>
                            目标：
                            <Input
                                placeholder="Object"
                                value={okr.obj}
                                onChange={e => dispatch({type: "obj", content: e.target.value})}
                                style={{width: "80%"}}
                            />
                        </div>
                    )}
                    bordered={true}
                >
                    <div style={{textAlign: "left", margin: "auto", width: "100%"}}>
                        <List
                            size="large"
                            dataSource={okr.krs}
                            renderItem={renderKr}
                        />
                    </div>
                    <div>
                        <Button type="primary" onClick={() => {
                            dispatch({type: "add_kr", content: ""})
                        }}>添加关键结果</Button>
                    </div>
                </Card>
            </div>
            <Button
                type="primary"
                style={{margin: "auto", display: "block", marginBottom: 30}}
                onClick={() => props.onSubmit(okr)}
            >
                <span style={{width: 150}}>
                确认 OKR
                </span>
            </Button>
        </div>
    );
};
