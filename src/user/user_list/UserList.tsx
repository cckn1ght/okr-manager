import React, {useEffect, useState} from "react";
import {Input, List, Skeleton} from "antd";
import {UserEntity} from "../../constants/payload";
import {getAllUsers} from "../../util/UserApi";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import * as _ from 'lodash';

const { Search } = Input;


const UserListWithRouter: React.FC = () => {
    const PAGE_SIZE = 10;
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<UserEntity[]>([]);
    const [visibleUsers, setVisibleUsers] = useState<UserEntity[]>([]);
    useEffect(() => {
        setLoading(true);
        (async () => {
            const allUsers = await getAllUsers();
            setUsers(allUsers);
            setVisibleUsers(allUsers);
            setLoading(false);
        })();
    }, []);
    const onSearch = (value: string) => {
        _.debounce(() => {
            const filterUsers = _.filter<UserEntity>(users,
                (u) => u.name.indexOf(value) !== -1 || u.username.indexOf(value) !== -1);
            setVisibleUsers(filterUsers);
        }, 200)()
    };
    return (
        <div>
            <h2 style={{margin: "auto", textAlign: "center", marginTop: 60}}>用户列表</h2>
            <br />
            <br />
            <div
                style={{maxWidth: 1000, margin: "auto", marginTop: 30, marginBottom: 50}}
            >
                <Search
                    placeholder="搜索用户名或邮箱"
                    // onSearch={value => onSearch(value)}
                    onChange={e => onSearch(e.target.value)}
                    style={{ width: 400, marginBottom: 30 }}
                />
                <List
                    bordered
                    className="user-list"
                    itemLayout="horizontal"
                    dataSource={visibleUsers}
                    pagination={{position: "bottom",
                        defaultCurrent: 1,
                        pageSize: PAGE_SIZE,
                        total: users.length + 1
                    }}
                    style={{backgroundColor: "white"}}
                    renderItem={item => (
                        <List.Item key={item.id} >
                            <Skeleton avatar title={false} loading={loading} active>
                                <List.Item.Meta
                                    title={<Link to={`/okr/${item.id}`}>{item.name}</Link>}
                                    description={item.username}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
};
export const UserList = withRouter(UserListWithRouter);
