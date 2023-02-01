import { useContext } from "react";
import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import { imageSource } from "../../functions";

const People = ({ people, handleFollow }) => {
    const [state] = useContext(UserContext);

    const router = useRouter();

    const showName = (user) => {
        if (user && user.userName) {
            return user.userName;
        } else {
            return user.name;
        }
    };
 
    return (
        <>
            <List 
                itemLayout="horizontal" 
                dataSource={people} 
                renderItem={(user) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={imageSource(user)} />}
                            title={
                                <div className="d-flex justify-content-between">  
                                {showName(user)} <span onClick={() => handleFollow(user)} className="text-primary pointer">Seguir</span>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </>
    );
    };

export default People;