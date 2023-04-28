import React from "react";
import {motion} from 'framer-motion'

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text text-dark">
                <motion.h1
                  animate={{ x: [0, 100, 0], opacity: 1, scale: 1}}
                  transition={{
                      duration: 5,
                      delay: 0.1,
                      ease: [0.5, 0.71, 1, 1.5],
                  }}>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </motion.h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                <a
                  href="/login"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Login to Learn More
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
