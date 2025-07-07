import { useNavigate } from 'react-router-dom';
import styles from './StickyBar.module.css';

const StickyBar = () => {

  const navigate = useNavigate()
  function handleLogout(){
    localStorage.removeItem("accessToken")
    navigate("/login")
  }

  return (
    <div className={styles.stickyBarWrapper}>
      <img src="/konovoLogo.png" alt="Konovo Logo" className={styles.logo} />
      <button className={styles.logOutButton} onClick={handleLogout}>Odjavi se </button>
    </div>
  )
}

export default StickyBar;