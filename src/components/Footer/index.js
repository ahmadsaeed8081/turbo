import React, { useEffect, useState } from "react";
import { InstagramIcon, DiscordIcon, TwitterIcon } from "../../icons";

const Footer = () => {
  return (
    <div className="footer-comp flex">
      <div className="wrapWidth wrap flex items-center">
        <div className="left flex items-center">
          <div className="desc">© 2022 All Rights Reserved.</div>
        </div>
        <div className="center flex items-center justify-center">
          <div className="social flex items-center">
            <a href="#" className="icon">
              <InstagramIcon />
            </a>
            <a href="#" className="icon mx-5">
              <DiscordIcon />
            </a>
            <a href="#" className="icon">
              <TwitterIcon />
            </a>
          </div>
        </div>
        <div className="right flex items-center">
          <div className="desc">Terms of use of the site.</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
