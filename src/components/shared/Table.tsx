// restaurant-service-dashboard/src/components/shared/Table.tsx

import { ReactNode } from 'react';
import styles from './Table.module.css';

interface Props<T> {
    data: T[];
    columns: { key: keyof T; label: string }[];
}

export const Table = <T extends object>({ data, columns }: Props<T>) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {columns.map(col => (
                        <th key={String(col.key)}>{col.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i}>
                        {columns.map(col => {
                            const cell: ReactNode =
                                row[col.key] !== null && row[col.key] !== undefined
                                    ? String(row[col.key])
                                    : '';
                            return <td key={String(col.key)}>{cell}</td>;
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
