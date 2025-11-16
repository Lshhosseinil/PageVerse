import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <h2 className={styles.title}>PageVerse</h2>
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/books"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Books
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Users
        </NavLink>
        <NavLink
          to="/admin/favorites"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Favorites
        </NavLink>
        <NavLink
          to="/admin/cart"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Cart
        </NavLink>
      </div>
    </>
  );
}
