import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navBar.css';

function NavBar({ user }) {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
  }, []);

  return (
    <div>

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
                            className="redirect-text"
                            animate
                            whileHover={{ color: 'black', scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                          >
                            Translate Files
                          </motion.h4>
                        </div>
                      </Nav.Link>
                      <Nav.Link href="/join" placement="left" variant="dark">
                        <div className="transition">
                          <motion.h4
                            className="redirect-text"
                            animate
                            whileHover={{ color: 'black', scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                          >
                            Create a Room
                          </motion.h4>
                        </div>
                      </Nav.Link>
                      <Nav.Link href="/roomlist" placement="left" variant="dark">
                        <div className="transition">
                          <motion.h4
                            className="redirect-text"
                            animate
                            whileHover={{ color: 'black', scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                          >
                            Find Rooms
                          </motion.h4>
                        </div>
                      </Nav.Link>
                      <motion.h4 whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} className="profile-thumb" onClick={() => setOpen(!isOpen)}>
                        <img className="thumbnail rounded-circle" width="60" height="60" src={user.thumbnail} alt="" />
                      </motion.h4>
                    </Nav>
                  )
                  : (
                    <Nav.Link className="justify-content-end" href="/login" style={{ marginLeft: '100px' }}>
                      <div className="transition">
                        <motion.h4
                          className="redirect-text"
                          animate
                          style={{ color: 'white' }}
                          whileHover={{ color: 'black', scale: 1.1 }}
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
      {
        isOpen && (
          <motion.div className="card profile-card">
            <div className="profile-card-elements">
              <Nav.Link href={`/profile?id=${user.id_google}`} placement="left" variant="dark">
                <div className="transition">
                  <motion.h4
                    animate
                    whileHover={{ color: 'black', scale: 1.1 }}
                  >
                    Profile
                  </motion.h4>
                </div>
              </Nav.Link>

              <Nav.Link className="" href="/logout" style={{ marginLeft: '100px' }}>
                <div className="transition">
                  <motion.h4
                    animate
                    whileHover={{ color: 'black', scale: 1.1 }}
                  >
                    Logout
                  </motion.h4>
                </div>
              </Nav.Link>
            </div>
          </motion.div>
        )
      }
    </div>
  );
}

NavBar.propTypes = {
  user: PropTypes.string || PropTypes.object,
};

NavBar.defaultProps = {
  user: undefined,
};

export default NavBar;
