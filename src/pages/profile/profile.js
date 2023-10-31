import * as React from 'react';
import { useState, useContext, useEffect } from "react";
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
  const [hasChange, setHasChange] = useState(false);
  const [data, setData] = React.useState({
    id: user.id,
    username: user.userName ? user.userName : '',
    firstName: user.firstName ? user.firstName : '',
    lastName: user.lastName ? user.lastName : '',
    city: user.city ? user.city : '',
    state: user.state ? user.state : '',
    zipCode: user.zipCode ? user.zipCode : '',
  });
  
  const handleSubmit = (event) => {
    sethidden(false);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      sethidden(true);
    }
    else{
      if(hasChange){
        updateProfileInfo(data).then((response) => {

        }).catch((err) => {
          sethiddenAlert(false);
          setMsg(err.message);
          setTimeout(() => {
            sethiddenAlert(true);
          }, 3000);
        }).then(()=>{
          setTimeout(()=>{
            sethidden(true);
          }, 1000);
        })
      }
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
        }, 3000);
      }).then(() => {
        setTimeout(()=>{
          sethidden(true);
        }, 1000);
      });
    };
  };

  const dataChange = (id, val) => {
    switch(id){
      default:
        setData({
            ...data,
            username: val,
        });
        setHasChange(true);
        break;
      case 'txtFirstName':
        setData({
            ...data,
            firstName: val,
        });
        setHasChange(true);
        break;
      case 'txtLastName':
        setData({
            ...data,
            lastName: val,
        });
        setHasChange(true);
        break;
      case 'txtCity':
        setData({
            ...data,
            city: val,
        });
        setHasChange(true);
        break;
      case 'txtState':
        setData({
            ...data,
            state: val,
        });
        setHasChange(true);
        break;
      case 'txtZipcode':
        setData({
            ...data,
            zipCode: val,
        });
        setHasChange(true);
        break;
    }
  }

  return (
    <>
      <PageLoader hidden={hidden}></PageLoader>
      <div className="container1">
        <div className="wrapProfile" style={{paddingTop:30, paddingLeft: 30}}>
          <div id='cabecalho'>
              <h2 style={{paddingLeft:10, paddingBottom:5}}>Profile Info</h2>
          </div>
          <br></br>
          <Form noValidate validated={validated} onSubmit={handleSubmit}> 
            <Row className="mb-1">
              <Form.Group className='userProfile' as={Col} md="3">
                <ProfilePhoto marginTop={30} user={user} changeImage={changeFile} disabled={false}/>
              </Form.Group>
              <Col md='9'>
                <Row className="mb-2">
                  <Col md='8'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control disabled={true} type="text" placeholder="Email" value={user.email} />
                  </Col>
                  <Col md='4'>
                    <Form.Label>Username</Form.Label>
                    <InputGroup>
                      <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control type="text" value={data.username} placeholder="Username" 
                          aria-describedby="inputGroupPrepend" id='txtUserName'
                          onChange={e => dataChange(e.target.id, e.target.value)} />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md='6'>
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" value={data.firstName} placeholder="First name"
                      onChange={e => dataChange(e.target.id, e.target.value)} id='txtFirstName' />
                  </Col>
                  <Col md='6'>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" value={data.lastName} placeholder="Last name"
                      onChange={e => dataChange(e.target.id, e.target.value)} id='txtLastName' />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md='6'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" value={data.city} placeholder="City" id='txtCity'
                      onChange={e => dataChange(e.target.id, e.target.value)} />  
                  </Col>
                  <Col md="3">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" value={data.state} placeholder="State" id='txtState'
                      onChange={e => dataChange(e.target.id, e.target.value)} />
                  </Col>
                  <Col md="3">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="text" value={data.zipCode} placeholder="Zip" id='txtZipcode'
                      onChange={e => dataChange(e.target.id, e.target.value)} />
                  </Col>
                </Row>
                <Row style={{paddingTop:10}}></Row>
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