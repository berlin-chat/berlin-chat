import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {TextBubble} from "./TextBubble";

type Message = {
    ID: number,
    Message: string,
    Username: string,
    Timestamp: string
}

type ChatLayoutProps = {
    data: Array<Message>
}

export default function ChatLayout({data}: ChatLayoutProps){
    return (
        <div style={{ width: '100%' }}>
            {data.map((message: Message) => (
                <TextBubble key={message.ID} msg={message.Message} timeStamp={message.Timestamp} user={message.Username} position="row" />
            ))}
            <TextBubble msg="test" timeStamp="00:00" user="some user" position="row"/>
            <TextBubble msg="another test" timeStamp="00:00" user="some user" position="row-reverse"/>
        </div>
    );
};
