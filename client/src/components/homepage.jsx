import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fade, Collapse } from 'react-bootstrap';
import '../styles/homepage.css';

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
                  <div className="bg-secondary col-lg-12" style={{ opacity: '70%' }}>
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
        <div className="d-flex card bg-dark text-white absolute-bottom" style={{ opacity: '90%' }}>
          <h3 className="d-inline card-header text-white">What is Languine?</h3>
          <p className="mw-10 p-3 card-body">
            Languine is a social networking site that allows for users to communicate
            across the world though real-time translatable message boards. The primary
            focus of Languine is to allow the users of the site to communicate with
            eachother without having the need to know eachother&apos;s languages.
            The users of Languine are granted the ability to create rooms of their own by
            filling out the creation form, or they can join an existing room from the
            room list available. If the user does not want other users to join their room
            , there is also a privitization option that would prompt users with a password
            before joining the room. Additionally, if the user wanted to understand the
            contents within a PDF file that is written in a language they may not know,
            Languine comes with a built-in PDF translator to allow for a better
            understanding of the contents inside.
          </p>
        </div>
      </div>
    </div>
  );
}

Homepage.propTypes = {
  user: PropTypes.string.isRequired,
};

export default Homepage;
