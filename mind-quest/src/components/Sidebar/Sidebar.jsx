import Container from '../layout/Container'
import SideBarItem from '../Itemsidebar/Itemsidebar'
import { 
    FaTimes,
    FaHome,
    FaRegSun,
    FaTasks
 } from 'react-icons/fa'
 import { RiMindMap } from "react-icons/ri";
import styles from './Sidebar.module.css';

const Sidebar = ({ active }) => {
    const closeSidebar = () => {
        active(false)
    }

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
    )
}

export default Sidebar;