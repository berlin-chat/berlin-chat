import * as React from "react";
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
        </div>
    );
};
