import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {TextBubble} from "./TextBubble";

export default function ChatLayout(){
    return (
        <div style={{ width: '100%' }}>
            <TextBubble msg="test" timeStamp="00:00" user="some user" position="row"/>
            <TextBubble msg="another test" timeStamp="00:00" user="some user" position="row-reverse"/>
        </div>
    );
};
