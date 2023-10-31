import React from 'react';
import Alert from 'react-bootstrap/Alert';

class MsgAlert extends React.Component {
    render() {
        return <>
                <div style={{position: 'absolute', bottom: '5px', right: '25px', width: '50%'}}>
                    <Alert show={!this.props.show} variant={this.props.variant}>
                        <Alert.Heading>{this.props.msg}</Alert.Heading>
                    </Alert>
                </div>
            </>;
    }
}

export default MsgAlert;