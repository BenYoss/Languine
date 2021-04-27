import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navBar.css';

function NavBar({ user }) {
  return (
    <Navbar sticky="top" className="navbar-container">
      <Nav.Link href="/"><img width="60" height="60" src="https://image.flaticon.com/icons/png/128/472/472527.png" alt="" /></Nav.Link>
      <Button id="google_translate_element" className="d-flex bg-light p-1" />
      <Nav className="m-auto align-items-start">
        {
              user
                ? (
                  <Nav className="m-auto justify-content-start">
                    <Nav.Link href="/fileupload" placement="left" variant="dark">
                      <div className="transition">
                        <motion.h4
                          animate
                          style={{ color: 'white' }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.8 }}
                        >
                          <h4>Translate Files</h4>
                        </motion.h4>
                      </div>
                    </Nav.Link>
                    <Nav.Link href="/join" placement="left" variant="dark">
                      <div className="transition">
                        <motion.h4
                          animate
                          style={{ color: 'white' }}
                          whileHover={{ color: 'black', scale: 1.1 }}
                          whileTap={{ scale: 0.8 }}
                        >
                          <h4>Create a Room</h4>
                        </motion.h4>
                      </div>
                    </Nav.Link>
                    <Nav.Link href="/roomlist" placement="left" variant="dark">
                      <div className="transition">
                        <motion.h4
                          animate
                          style={{ color: 'white' }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.8 }}
                        >
                          <h4>Find Rooms</h4>
                        </motion.h4>
                      </div>
                    </Nav.Link>
                    {/* <Nav.Link href={`/profile?id=${user.id_google}`} placement="left" variant="dark">
                      <div className="transition">
                        <motion.h4
                          animate
                          style={{ color: 'white' }}
                          whileHover={{ color: 'black', scale: 1.1 }}
                        >
                          Profile
                        </motion.h4>
                      </div>
                    </Nav.Link> */}

                    {/* <Nav.Link className="justify-content-end" href="/logout" style={{ marginLeft: '100px' }}>
                      <div className="transition">
                        <motion.h4
                          animate
                          style={{ color: 'white' }}
                          whileHover={{ color: 'black', scale: 1.1 }}
                        >
                          Logout
                        </motion.h4>
                      </div>
                    </Nav.Link> */}
                    <h4 className="profile-thumb">
                      <img className="thumbnail rounded-circle" width="60" height="60" src={user.thumbnail} alt="" />
                    </h4>
                  </Nav>
                )
                : (
                  <Nav.Link className="justify-content-end" href="/login" style={{ marginLeft: '100px' }}>
                    <div className="transition">
                      <motion.h4
                        animate
                        style={{ color: 'white' }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}
                      >
                        Login
                      </motion.h4>
                    </div>
                  </Nav.Link>
                )
        }
      </Nav>
    </Navbar>
  );
}

NavBar.propTypes = {
  user: PropTypes.string || PropTypes.object,
};

NavBar.defaultProps = {
  user: undefined,
};

export default NavBar;
