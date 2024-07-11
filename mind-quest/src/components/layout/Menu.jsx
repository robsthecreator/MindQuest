import React, { useState, useEffect } from "react";
import styles from "./Menu.module.css";
import { FaHome, FaRegSun, FaTasks } from "react-icons/fa";
import { RiMindMap } from "react-icons/ri";
import { FaBars } from "react-icons/fa";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      if (!isScrolled && isOpen) {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: "/", icon: <FaHome />, pageName: "Home" },
    { href: "/mindmap", icon: <RiMindMap />, pageName: "Mindmap" },
    { href: "/tasks", icon: <FaTasks />, pageName: "Tarefas" },
    { href: "/", icon: <FaRegSun />, pageName: "Configurações" },
  ];

  const renderMenuItems = () => {
    return menuItems.map((item, index) => (
      <a
        key={index}
        href={item.href}
        className={`${styles.navigation_button} ${
          isOpen ? styles.navigation_button_open : ""
        }`}
      >
        {item.icon}
      </a>
    ));
  };

  return (
    <div className={styles.navigation_container}>
      {isScrolled ? (
        <button className={styles.menu_toggle} onClick={toggleMenu}>
          <FaBars />
        </button>
      ) : (
        <div className={styles.navigation_buttons}>{renderMenuItems()}</div>
      )}
      {isOpen && (
        <div
          className={`${styles.navigation_buttons} ${styles.navigation_buttons_open}`}
        >
          {renderMenuItems()}
        </div>
      )}
    </div>
  );
};

export default Menu;
