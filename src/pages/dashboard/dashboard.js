import React, {useContext, useState} from "react";
import { Button } from 'react-bootstrap';
import AuthConext from '../../contexts/auth';

function DashBoard() {
  return (
    <>
      <h1>Dashboard</h1>
      <Button variant="primary">Primary</Button>{' '}
      <Button variant="secondary">Secondary</Button>{' '}
      <Button variant="success">Success</Button>{' '}
      <Button variant="warning">Warning</Button>{' '}
      <Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}
      <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}
      <Button variant="link">Link</Button>
     </>
  );
}

export default DashBoard;