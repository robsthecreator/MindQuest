import Container from './Container'
import styles from "./Navbar.module.css";

function NavBar(props) {
  return (
    <nav className={styles.navbar}>
      <Container>
        <ul>
          <li><a href="/">Home</a></li>
          <li>
            <div className={styles.dropdown}>
              <button className={styles.dropbtn}>Personalize</button>
              <div className={styles.dropdown_content}>
                <a href="/mindmap">Mapa mental</a>
                <a href="/tasks">Tarefas</a>
              </div>
            </div>
          </li>
          <li>
            <a href="/user">Olá, {props.username}</a>
            <img className={styles.user_icon_img} src={props.usericon} alt="icon user" />
          </li>
        </ul>
      </Container>
    </nav>
  )
};

export default NavBar;