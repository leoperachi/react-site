import React, {Text, useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import './chatMsg.css';

class ChatMsg extends React.Component  {
    render() {
        return  <>
                    <p className={this.props.origDest == 'me' ? 'from-me' : 'from-them'}>{this.props.msg}</p>
                </>
    }
}

export default ChatMsg;