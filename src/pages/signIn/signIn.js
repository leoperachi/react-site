import * as React from 'react';
import { useContext, useState } from "react";
import AuthConext from "../../contexts/auth";
import MsgAlert from '../../components/MsgAlert/MsgAlert';
import PageLoader from '../../components/PageLoader/PageLoader';
import { Form, Button } from 'react-bootstrap';

function SignIn() {
  const [validated, setValidated] = useState(false);
  const { signIn } = useContext(AuthConext);
  const [hidden, sethidden] = useState(true);
  const [hiddenAlert, sethiddenAlert] = useState(true);
  const [msg, setMsg] = useState('');
  const [data, setData] = React.useState({
       username: '',
       password: '',
       check_textInputChange: false,
       secureTextEntry: true,
       isValidUser: true,
       isValidPassword: true,
  });

  function handleSigIn() {
      sethidden(false);
      signIn(data.username, data.password).then((user)=> {
        //console.log(user);
      }).catch((err) => {
          sethiddenAlert(false);
          setMsg(err.message);
          setTimeout(() => {
            sethiddenAlert(true);
          }, 3000);
      }).then(() => {
        setTimeout(() => {
          sethidden(true);
        }, 100);
      });
  }

  function textEmailChange(val) {
    if( val.trim().length >= 4 ) {
      setData({
          ...data,
          username: val,
          check_textInputChange: true,
          isValidUser: true
      });
    } else {
        setData({
            ...data,
            username: val,
            check_textInputChange: false,
            isValidUser: false
        });
    }
  }

  function textPasswordChange(val) {
    if( val.trim().length >= 5 ) {
      setData({
          ...data,
          password: val,
          check_textInputChange: true,
          isValidPassword: true
      });
    } else {
        setData({
            ...data,
            password: val,
            check_textInputChange: false,
            isValidPassword: false
        });
    }
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      sethidden(true);
    }
    else{
      handleSigIn();
    }

    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <>
       <PageLoader hidden={hidden}></PageLoader>
       <div className="container1">
        <div className="wrap" style={{width: "450px"}}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}> 
              <h2>Welcome!</h2>
              <br></br>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" required value={data.username} 
                  onChange={e => textEmailChange(e.target.value)} isValid={data.isValidUser} />
                <Form.Control.Feedback type='invalid'>
                  Please complete email.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required value={data.password} 
                  onChange={e => textPasswordChange(e.target.value)} isValid={data.isValidPassword}/>
                <Form.Control.Feedback type='invalid'>
                  Please complete password.
                </Form.Control.Feedback>
              </Form.Group>
              <br/>
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" type="submit">
                  Sign In
                </Button>
                <Button href='/signup' variant="secondary" size="lg">
                  Sign Up
                </Button>
              </div>
            </Form>
        </div>
        <MsgAlert msg={msg} show={hiddenAlert}></MsgAlert>
      </div>
     </>
  );
}

export default SignIn;