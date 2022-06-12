import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';

class ChatWindow extends React.Component  {
    onSentMsg = null;
    val = false;
    constructor(props){
        super(props);
        this.state = {
            inputValue: ''
        };
        this.onSentMsg = props.onSentMsg;
    }

    updateInputValue(evt) {
        const val = evt.target.value;
        this.setState({
          inputValue: val
        });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.onSentMsg(this.state.inputValue, this.props.usrDst).then((r) =>{
            console.log(r);
            this.setState({
                inputValue: ""
              });
        });
    }

    render() {
        return  <>
                    <div className='chatWindow' hidden={this.props.show}>
                        <div className='chatWindow-title'>
                            <h6>{this.props.usrDst}</h6> 
                            <i className="fa-solid fa-xmark chatWindow-close" 
                                onClick={this.props.onCloseCW}></i>
                        </div>
                        <div className='chatWindow-msgs'>

                        </div>
                        <div>
                            <Form noValidate style={{display: 'flex'}} onSubmit={this.onFormSubmit}>
                                <Form.Control type='text' className='chatWindow-input' value={this.state.inputValue} 
                                    onChange={evt => this.updateInputValue(evt)} />
                                 <Button variant="primary" size="sm" type="submit">
                                    Send
                                </Button>
                            </Form>
                        </div>
                    </div>
                </>
    }
}

  
export default ChatWindow;