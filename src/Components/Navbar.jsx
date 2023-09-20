/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdKeyboardVoice, MdKeyboard } from "react-icons/md";

export default function Navbar({ changeModeToVoice, setchangeModeToVoice }) {
    const navbarRef = useRef(null);
    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const [prevScrollY, setPrevScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
          const currentScrollY = window.scrollY;
    
          // Check if the user is scrolling up
          setIsScrollingUp(currentScrollY < prevScrollY);
    
          // Update the previous scroll position
          setPrevScrollY(currentScrollY);
        };
    
        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);
    
        // Cleanup by removing the event listener when the component unmounts
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [prevScrollY]);

      useEffect(() => {
        // Apply CSS styles to the navbar based on scrolling direction
        if (navbarRef.current) {
            if (isScrollingUp) {
              // Scrolling up - Move the navbar back to the top
              navbarRef.current.style.position = 'absolute';
              navbarRef.current.style.top = '0';
            } else {
              // Scrolling down - Make the navbar sticky
              navbarRef.current.style.position = 'fixed';
              navbarRef.current.style.top = '0';
            }
          }
      }, [isScrollingUp]);

  return (
    <nav className={`floating-navbar ${isScrollingUp ? 'show' : ''}`}>
      <span> </span>
      <div className="navBtns">
        <button
          className="navBtn"
          title="Click to Change into Text Mode"
          onClick={() => setchangeModeToVoice(false)}
          style={{
            backgroundColor: `${changeModeToVoice === true ? "#202123" : ""}`,
          }}
        >
          Text Mode <MdKeyboard className="navBtnIcon" />
        </button>
        <button
          className="navBtn"
          title="Click to Change into Voice Mode"
          onClick={() => setchangeModeToVoice(true)}
          style={{
            backgroundColor: `${changeModeToVoice === false ? "#202123" : ""}`,
          }}
        >
          Voice Mode <MdKeyboardVoice className="navBtnIcon" />
        </button>
      </div>
      <GiHamburgerMenu className="navHamBurger" />
    </nav>
  );
}
