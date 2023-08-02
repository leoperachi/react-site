import React, {useState} from 'react';
import { 
  Nav,
  Navbar, 
  Offcanvas, 
  Button,
  Accordion, 
  Spinner
} from 'react-bootstrap';
import './NavBar.css';
import { Link } from "react-router-dom";
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';

class NavBar extends React.Component  {
  componentDidMount(){
    this.props.loadUsersChat();
  }
  render() {
    return <>
      <Navbar expand={false} collapseOnSelect>
        <Navbar.Brand href="/" 
          style={{marginLeft:'15px'}}>React-Site
        </Navbar.Brand>
        <Navbar.Toggle style={{marginRight:'15px'}} id="btnToogle" />
        <Navbar.Offcanvas style={{ background:'#f2f2f2' }}
          id={`offcanvasNavbar-expand-${true}`}
          placement="end">
            <Offcanvas.Header closeButton ></Offcanvas.Header>
            <Offcanvas.Body style={{textAlign:'center'}}>
              <div>
                <ProfilePhoto width={200} height={200} user={this.props.user} changeImage={this.props.changeFile}/>
              </div>
              <Nav className="mr-auto d-block">
                <Nav.Item>
                  <Nav.Link eventKey="1" as={Link} to="/profile" className='navUserName'>
                    {this.props.user.email}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="2" as={Link} to="/" className='navLink'>
                    Home
                  </Nav.Link>
                </Nav.Item>
                <Accordion style={{marginTop:'4px'}}>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Chat Users</Accordion.Header>
                    <Accordion.Body style={{padding: '0px'}}>
                        {this.props.usersChat.map((usr, i) => 
                          <div style={{
                              textAlign: '-webkit-center',
                              boxShadow: 'inset 0 -1px 0 rgb(0 0 0 / 13%)'
                            }} key={usr._id}>
                              <Nav.Item style={{ display:'flex', flexDirection: 'row', height:60, alignItems:'center'}}>
                                <div style={{paddingLeft:20, paddingRight: 20}}>
                                  <ProfilePhoto user={usr} width={40} height={40}></ProfilePhoto>
                                </div>
                                <div>
                                  <Nav.Link eventKey="3" as={Button} onClick={this.props.onStartChat}
                                    style={{background:'transparent', borderColor: 'white'}} id={'chat_' + usr.email}>
                                      {usr.email}
                                  </Nav.Link>
                                </div>
                              </Nav.Item>
                          </div>
                        )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Nav.Item  className='navLink' style={{background: '#dfdfdf'}}>
                  <Button variant="light" 
                    style={{
                      color:'#0d6efd', 
                      background:'#dfdfdf', 
                      borderColor: '#dfdfdf'
                    }} type='button' onClick={this.props.handleLogout}>
                      LogOut
                  </Button>
                </Nav.Item>
              </Nav>
            </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </>;
  }
}
  
export default NavBar;
  