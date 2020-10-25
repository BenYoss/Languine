import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fade, Collapse } from 'react-bootstrap';

let indHead = false;
let indCont = false;
function Homepage({ user }) {
  const [, onReload] = useState();
  setTimeout(() => { indCont = true; onReload([]); }, 500);
  setTimeout(() => { indHead = true; onReload([]); }, 1500);
  return (
    <div>
      {user ? (
        <Collapse in={indCont}>
          <div className="pt-3 bg-secondary">
            <header className="bg-dark py-5 mb-5">
              <div className="container h-100">
                <div className="row h-100 align-items-center">
                  <div className="bg-secondary col-lg-12" style={{ opacity: '50%' }}>
                    <Fade in={indHead}>
                      <h1 className="display-4 text-white mt-5 mb-2">{`Welcome ${user.username}!`}</h1>
                    </Fade>
                    <p className="lead mb-5 text-white-50">Languine is a messaging site that breaks the language barrier by translating messages at real time!</p>
                  </div>
                  <img className="col-lg-8" src="https://i.pinimg.com/originals/e3/1b/75/e31b752875679b64fce009922f9f0dda.gif" alt="" height="300" width="200" />
                </div>
              </div>
            </header>
          </div>
        </Collapse>
      ) : ''}
      <div style={{ opacity: '70%', backgroundImage: 'url(https://i.ytimg.com/vi/6aVOjLuw-Qg/maxresdefault.jpg)', minHeight: '500px' }}>
        <h1 className="bg-dark text-white display-1 absolute-bottom" style={{ opacity: '90%' }}>Welcome to Languine!</h1>
      </div>
    </div>
  );
}

Homepage.propTypes = {
  user: PropTypes.string.isRequired,
};

export default Homepage;
