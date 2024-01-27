import styles from './Login.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageNav from '../components/PageNav';
import useAuthoValue from '../context/AuthoValue';
import Button from '../components/Button';

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');
  const { isAutho, login } = useAuthoValue();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (isAutho) navigateTo('/app', { replace: true });
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button btnType={'primary'}>Login</Button>
        </div>
      </form>
    </main>
  );
}
