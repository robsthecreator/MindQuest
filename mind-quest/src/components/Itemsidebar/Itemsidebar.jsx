import React from "react";
import Container from "../layout/Container";
import styles from "./Itemsidebar.module.css";

const SideBarItem = ({ Icon, Text }) => {
  return (
    <Container>
      <div className={styles.item_sidebar}>
        <Icon />
        {Text}
      </div>
    </Container>
  );
};

export default SideBarItem;
