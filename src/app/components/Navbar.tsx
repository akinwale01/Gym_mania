'use client';
import React, { useEffect, useState } from 'react';
import LoginBtn from './LoginBtn';
import SignUpBtn from './SignUpBtn';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDesktopNav, setShowDesktopNav] = useState(true);

  const handleMenuClick = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // 🔒 Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // 🖱️ Show nav on scroll to top or when mouse is at top 25%
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setShowDesktopNav(true);
      } else {
        setShowDesktopNav(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const y = e.clientY;
      const screenHeight = window.innerHeight;
      const percentFromTop = (y / screenHeight) * 100;

      if (percentFromTop <= 25 || window.scrollY === 0) {
        setShowDesktopNav(true);
      } else {
        setShowDesktopNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* DESKTOP NAV BAR (hidden on scroll) */}
      <nav
        className={`
          fixed top-0 left-0 w-full z-[9998] transition-transform duration-300
          ${showDesktopNav ? 'translate-y-0' : '-translate-y-full'}
          bg-white shadow-md px-5 py-5 md:px-10 flex items-center justify-between text-black
        `}
      >
        {/* LOGO */}
        <div className="space-y-3">
          <div className="bg-[url(/logo/logo-4.jpg)] h-15 w-15 bg-cover bg-center rounded-full ml-5" />
          <p className="font-black font-bitcount-grid-double text-[20px] logo-text">GYM_MANIA</p>
        </div>

        {/* MOBILE MENU ICON (only visible on screens < md) */}
        <div
          className="bg-[url(/icons/menu-03.svg)] h-10 w-10 bg-cover bg-center md:hidden cursor-pointer"
          onClick={handleMenuClick}
        />

        {/* DESKTOP NAV LINKS (visible from md and up) */}
        <ul className="hidden md:flex items-center space-x-5 font-inter">
          <li><a href="#blog" className="text-lg uppercase font-medium transition-all duration-300 hover:text-[30px]">Blog</a></li>
          <li><a href="#services" className="text-lg uppercase font-medium transition-all duration-300 hover:text-[30px]">Services</a></li>
          <li><a href="#pricing" className="text-lg uppercase font-medium transition-all duration-300 hover:text-[30px]">Pricing</a></li>
          <li><a href="#contact" className="text-lg uppercase font-medium transition-all duration-300 hover:text-[30px]">Contact</a></li>
        </ul>

        {/* DESKTOP AUTH BUTTONS (visible from md and up) */}
        <div className="hidden md:flex md:space-x-4">
          <LoginBtn />
          <SignUpBtn />
        </div>
      </nav>

      {/* MOBILE MENU SIDEDRAWER */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[65%] bg-[#000000] text-white p-6 transition-transform transform md:hidden z-[9999]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto
        `}
      >
        <div className="flex justify-end pr-5">
          <div
            className="bg-[url(/icons/icon-close.svg)] w-10 h-10 bg-center bg-no-repeat bg-cover cursor-pointer"
            onClick={handleClose}
          />
        </div>

        <ul className="mt-20 space-y-10">
          <li><a href="#blog" className="text-xl" onClick={handleClose}>Blog</a></li>
          <li><a href="#services" className="text-xl" onClick={handleClose}>Services</a></li>
          <li><a href="#pricing" className="text-xl" onClick={handleClose}>Pricing</a></li>
          <li><a href="#contact" className="text-xl" onClick={handleClose}>Contact</a></li>

          <div className="flex flex-col space-y-6 pt-44">
            <LoginBtn />
            <SignUpBtn />
          </div>
        </ul>
      </div>

      {/* MOBILE BACKDROP */}
      {isOpen && (
        <div
          className="fixed top-0 right-0 h-full w-[65%] bg-black bg-opacity-50 md:hidden z-[9990]"
          onClick={handleClose}
        />
      )}
    </>
  );
}