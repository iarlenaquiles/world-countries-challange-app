import React, { ReactNode } from 'react'

import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';

interface ButtonProps {
    className: string
    to: any
    children: ReactNode 
}

export default function Button({ className, to, children }: ButtonProps) {
    return (
        <Link
            className={twMerge('inline-block rounded border border-black px-8 py-1 dark:border-white', className)}
            to={to}
        >
            {children}
        </Link>
    );
}
