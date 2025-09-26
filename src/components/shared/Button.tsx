// restaurant-service-dashboard/src/components/shared/Button.tsx

import React from 'react';
import styles from './Button.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

export const Button: React.FC<Props> = ({ label, ...rest }) => {
    return (
        <button className={styles.button} {...rest}>
            {label}
        </button>
    );
};
