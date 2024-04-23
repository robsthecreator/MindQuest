import { useState } from 'react';
import Container from '../layout/Container';
import styles from "./Navbar.module.css";
import { FaBars } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar'; // Import Sidebar component

function NavBar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <nav className={styles.navbar}>
      <Container>
        <ul>
          <FaBars onClick={showSidebar} />
          {sidebar && <Sidebar active={sidebar} setActive={setSidebar} />} {/* Pass setSidebar as active and setActive */}
          <li>
            <a href="/user">Olá, {props.username}</a>
            <img className={styles.user_icon_img} src={props.usericon} alt="icon user" />
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default NavBar;
