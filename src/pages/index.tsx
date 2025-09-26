// src/pages/Home.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

export const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>Bem-vindo ao Dashboard do Restaurante</h1>
        <div className={styles.buttons}>
          <Link to="/auth/login" className={styles.button}>Entrar</Link>
          <Link to="/auth/register" className={styles.button}>Cadastrar-se</Link>
        </div>
      </div>
    </div>
  );
};
