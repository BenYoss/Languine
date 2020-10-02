import React, { useEffect, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { getUser } from '../helpers/helpers';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/navBar.css';

function NavBar() {
  const [user, setUser] = useState('');

  useEffect(() => {
    getUser()
      .then((userInfo) => {
        setUser(userInfo);
        window.language = userInfo.language;
      });
  }, []);

  return (
  // <div className="NavbarContainer">
    <Navbar bg="dark" variant="dark">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav className="m-auto">
        {/* <h1>Navbar</h1> */}
        {
              user
                ? (
                  <Nav className="m-auto justify-content-end">
                    <Nav.Link className="btn" href="/join" placement="left">
                      <h2>Join Room</h2>
                    </Nav.Link>
                    <Nav.Link className="btn" href="/roomlist" placement="left">
                      <h2>Find Rooms</h2>
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
  // </div>
  );
}

export default NavBar;
