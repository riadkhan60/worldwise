import Map from '../components/Map';
import Sidebar from '../components/Sidebar';
import User from '../components/User';
import Protetedroutes from '../context/Protetedroutes';
import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <Protetedroutes>
      <div className={styles.app}>
        <Sidebar />
        <Map />
        <User />
      </div>
    </Protetedroutes>
  );
}

export default AppLayout;
