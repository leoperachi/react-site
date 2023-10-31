import * as React from 'react';
import { Form, Button, NavLink } from 'react-bootstrap';
import { useContext, useState } from "react";
import AuthConext from "../../contexts/auth";

function ForgotPassword(){
    const [validated, setValidated] = useState(false);
    const { forgotPassword } = useContext(AuthConext);
    const [data, setData] = React.useState({
        username: '',
        isValidUser: false
    });

    const handleSubmit = (event) => {

    }

    function textEmailChange(val) {
        if( val.trim().length >= 4 ) {
          setData({
              ...data,
              username: val,
              isValidUser: true
          });
        } else {
            setData({
                ...data,
                username: val,
                isValidUser: false
            });
        }
    }

    return (
        <>
            <div className="container2">
                <div className="wrap" style={{width: "450px"}}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}> 
                        <h2>Fill form belllow</h2>
                        <br></br>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" required value={data.username}
                                onChange={e => textEmailChange(e.target.value)} isValid={data.isValidUser} />
                            <Form.Control.Feedback type='invalid'>
                                Please complete email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <br/>
                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" type="submit">
                                Reset Password
                            </Button>
                            <Button href='/' variant="secondary" size="lg">
                                Sign In
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;