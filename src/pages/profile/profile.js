import * as React from 'react';
import { useState, useContext } from "react";
import PageLoader from '../../components/PageLoader/PageLoader';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import AuthConext from '../../contexts/auth';
import ProfilePhoto from '../../components/ProfilePhoto/ProfilePhoto';
import MsgAlert from '../../components/MsgAlert/MsgAlert';

function Profile() {
  const [hidden, sethidden] = useState(true);
  const [validated, setValidated] = useState(false);
  const { user, uploadProfilePhoto, updateProfileInfo } = useContext(AuthConext);
  const [hiddenAlert, sethiddenAlert] = useState(true);
  const [msg, setMsg] = useState('');

  const handleSubmit = (event) => {
    sethidden(false);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      sethidden(true);
    }
    else{
      setTimeout(()=>{
        sethidden(true);
        updateProfileInfo(user).then((response) => {

        }).catch((err) => {
          sethiddenAlert(false);
          setMsg(err.message);
          setTimeout(() => {
            sethiddenAlert(true);
            sethidden(true);
          }, 3000);
        }).then(()=>{
          setTimeout(()=>{
            sethidden(true);
          }, 1000);
        })
      }, 2000)
    }

    event.preventDefault();
    event.stopPropagation();
  };

  const changeFile = (e) => {
    sethidden(false);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      user.profilePhoto = reader.result.toString();
      for(var i=0;i<document.getElementsByClassName("img1").length; i++){
        document.getElementsByClassName("img1")[i].src = reader.result.toString();
      }

      uploadProfilePhoto(user.id, reader.result).then( (response) => {

      }).catch((err) => {
        sethiddenAlert(false);
        setMsg(err.message);
        setTimeout(() => {
          sethiddenAlert(true);
          sethidden(true);
        }, 3000);
      }).then(() => {
        setTimeout(()=>{
          sethidden(true);
        }, 1000);
      });
    };
  };

  return (
    <>
      <PageLoader hidden={hidden}></PageLoader>
      <div className="container1">
        <div className="wrapProfile">
          <Form noValidate validated={validated} onSubmit={handleSubmit}> 
            <Row className="mb-1">
              <Form.Group className='userProfile' as={Col} md="3">
                <ProfilePhoto marginTop={30} user={user} changeImage={changeFile}/>
              </Form.Group>
              <Col md='9'>
                <Row className="mb-2">
                  <Col md='8'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      disabled={true}
                      type="text"
                      placeholder="Email" value={user.email}
                    />
                  </Col>
                  <Col md='4'>
                    <Form.Label>Username</Form.Label>
                    <InputGroup>
                      <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                          type="text" value={user.username}
                          placeholder="Username"
                          aria-describedby="inputGroupPrepend"
                        />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md='6'>
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text" value={user.firstName}
                      placeholder="First name"
                    />
                  </Col>
                  <Col md='6'>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text" value={user.lastName}
                      placeholder="Last name"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md='6'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" />  
                  </Col>
                  <Col md="3">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" 
                      value={user.state} placeholder="State" />
                  </Col>
                  <Col md="3">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="text" 
                      value={user.zipCode} placeholder="Zip" />
                  </Col>
                </Row>
                <Row className="mb-1">
                  <div style={{textAlign:'end', paddingTop: '10px'}}>
                    <Button type="submit">Update Profile</Button>
                  </div>
                </Row>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <MsgAlert msg={msg} show={hiddenAlert}></MsgAlert>
    </>
  );
}                                                                       

export default Profile;