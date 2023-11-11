import React from "react";
import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.light}></div>
      <div className={styles.dark}></div>
    </div>
  );
};

export default Footer;
