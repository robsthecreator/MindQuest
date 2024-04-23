import React, { useEffect } from 'react';
import Container from '../layout/Container';
import SideBarItem from '../Itemsidebar/Itemsidebar';
import { FaTimes, FaHome, FaRegSun, FaTasks } from 'react-icons/fa';
import { RiMindMap } from 'react-icons/ri';
import styles from './Sidebar.module.css';

const Sidebar = ({ active, setActive }) => {
    const closeSidebar = () => {
      setActive(false);
    };
  
    useEffect(() => {
      const handleOutsideClick = (event) => {
        // .Sidebar_sideBar_menu__sr6Vm é a tag da sidebar inteira
        if (active && !event.target.closest('.Sidebar_sideBar_menu__sr6Vm')) {
          setActive(false);
        }
        // evita que ao clicar nos links, a sidebar feche sem serem usados
        const isButtonElement = event.target.closest('a');
        if (active && isButtonElement) {
          setActive(true)
        }
      };
    
      document.addEventListener('mousedown', handleOutsideClick);
    
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [active, setActive]);
  
    return (
      <Container sidebar={active}>
        <div className={styles.sideBar_menu}>
          <FaTimes onClick={closeSidebar} />
  
          <div className={styles.sideBar_menu_content}>
            <a href="/"><SideBarItem Icon={FaHome} Text='Home'/></a>
            <a href="/mindmap"><SideBarItem Icon={RiMindMap} Text='Mapa Mental'/></a>
            <a href="/tasks"><SideBarItem Icon={FaTasks} Text='Tasks'/></a>
            <a href="/"><SideBarItem Icon={FaRegSun} Text='Configurações'/></a>
          </div>
        </div>
      </Container>
    );
  };
  
  export default Sidebar;