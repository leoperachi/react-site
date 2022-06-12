import * as React from 'react';
import { useContext, useState } from "react";
import AuthConext from "../../contexts/auth";
import { Form, Button } from 'react-bootstrap';
import PageLoader from '../../components/PageLoader/PageLoader';
import MsgAlert from '../../components/MsgAlert/MsgAlert';

function SignUp() {
  const { signUp } = useContext(AuthConext);
  const [validated, setValidated] = useState(false);
  const [hidden, sethidden] = useState(true);
  const [hiddenAlert, sethiddenAlert] = useState(true);
  const [msg, setMsg] = useState('');
  const [data, setData] = React.useState({
    username: '',
    password: '',
    retypedPassword: '',
    isValidUser: false,
    isValidPassword: false,
    isValidRetype: false
  });

  const handleSubmit = (event) => {
    sethidden(false);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      sethidden(true);
    }
    else{
      if(data.isValidUser && data.isValidPassword && data.isValidRetype){
          signUp(data.username, data.password).then((response)=> {
            //response nao vem da outra classe
            console.log(response);
            sethiddenAlert(false);
            setMsg(response.message);
            setTimeout(() => {
              sethiddenAlert(true);
            }, 3000);
          }).catch((err) => {
            sethiddenAlert(false);
            sethidden(true);
            setMsg(err.message);
            setTimeout(() => {
              sethiddenAlert(true);
            }, 3000);
          }).then(() => {
            setTimeout(() => {
              sethidden(true);
            }, 1000);
          });
        
      }
      else if(!data.isValidRetype){
        sethiddenAlert(false);
        setMsg('Password doesn´t match');
        sethidden(true);
        setTimeout(() => {
          sethiddenAlert(true);
        }, 3000);
      }
      else{
        sethidden(true);
      }
    }

    event.preventDefault();
    event.stopPropagation();
  };

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

  function textPasswordChange(val) {
    if( val.trim().length >= 5 ) {
      setData({
          ...data,
          password: val,
          isValidPassword: true
      });
    } else {
      setData({
          ...data,
          password: val,
          isValidPassword: false
      });
    }
  }

  function textRetypePasswordChange(val) {
    if(val === data.password){
      setData({
        ...data,
        retypedPassword: val,
        isValidRetype: true
      });
    }
    else{
      setData({
        ...data,
        retypedPassword: val,
        isValidRetype: false
      });
    }
  }

  return (
    <>
        <PageLoader hidden={hidden}></PageLoader>
        <div className="container1">
        <div className="wrap" style={{width: "450px"}}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h3>Register Now!</h3>
            <br></br>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" required  value={data.username} 
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
                  Please complete password with more than 5 caracteres.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRetypePassword">
              <Form.Label>Retype Password</Form.Label>
              <Form.Control type="Password" value={data.retypedPassword} 
                onChange={e => textRetypePasswordChange(e.target.value)} isValid={data.isValidRetype}/>
              <Form.Control.Feedback type='invalid'>
                  Password doesn't match
                </Form.Control.Feedback>
            </Form.Group>
            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" type="submit">
                  Sign Up
                </Button>
                <Button href='/' variant="secondary" size="lg">
                  Login
                </Button>
              </div>
          </Form>
        </div>
        <MsgAlert msg={msg} show={hiddenAlert}></MsgAlert>
      </div>
     </>
  );
}

export default SignUp;