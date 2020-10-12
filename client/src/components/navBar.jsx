import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navBar.css';

function NavBar({ user }) {
  return (
    <Navbar bg="dark" variant="dark">
      <Nav.Link href="/"><img width="60" height="60" src="https://image.flaticon.com/icons/png/128/472/472527.png" alt="" /></Nav.Link>
      <Nav className="m-auto">
        {
              user
                ? (
                  <Nav className="m-auto justify-content-end">
                    <Nav.Link className="btn" href="/fileupload" placement="left">
                      <h2>Translate Files</h2>
                    </Nav.Link>
                    <Nav.Link className="btn" href="/join" placement="left">
                      <h2>Create a Room</h2>
                    </Nav.Link>
                    <Nav.Link className="btn" href="/roomlist" placement="left">
                      <h2>Find Rooms</h2>
                    </Nav.Link>
                    <Nav.Link className="btn" href={`/profile?id=${user.id_google}`} placement="left">
                      <h2>Profile</h2>
                    </Nav.Link>
                    <h2 className="justify-content-end">
                      <img className="thumbnail" width="60" height="60" src={user.thumbnail} alt="" />
                    </h2>
                    <Nav.Link className="justify-content-end" href="/logout" style={{ marginLeft: '100px' }}>
                      <h2>Logout</h2>
                    </Nav.Link>
                  </Nav>
                )
                : (
                  <Nav.Link className="justify-content-end" href="/login" style={{ marginLeft: '100px' }}>
                    <h2>Login</h2>
                  </Nav.Link>
                )
        }
      </Nav>
    </Navbar>
  );
}

NavBar.propTypes = {
  user: PropTypes.element.isRequired,
};

export default NavBar;
