import Logo from './Logo';
import AppNav from './AppNav';
import styles from './Sidebar.module.css';
import { Outlet } from 'react-router-dom';
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}> &copy; Copyright 2024 by Riad Khan</p>
      </footer>
    </div>
  );
}

export default Sidebar;
