import * as React from "react";
import TextBubble from "./TextBubble";

type Message = {
    ID: number,
    Message: string,
    Username: string,
    Timestamp: string
}

type ChatLayoutProps = {
    data: Array<Message>,
    localUser: string
}

export default function ChatLayout({data, localUser}: ChatLayoutProps){
    return (
        <div style={{ width: '100%' }}>
            {data.map((message: Message) => (
                <TextBubble key={message.ID} msg={message.Message} timeStamp={message.Timestamp} user={message.Username} position={(
                    message.Username === localUser ? "row-reverse" : "row"
                )} />
            ))}
        </div>
    );
};
