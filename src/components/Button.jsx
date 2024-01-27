import styles from './Button.module.css';
import PropTypes from 'prop-types';


function Button({ btnType, action, children }) {
  return (
    <button onClick={action} className={`${styles.btn} ${styles[btnType]}`}>
      {children}
    </button>
  );
}

Button.propTypes = {
  btnType: PropTypes.string,
  action: PropTypes.func,
  children: PropTypes.string
};


export default Button;
