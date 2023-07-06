import React from 'react';

import { twMerge } from 'tailwind-merge';

interface ImageProps {
    src: string;
    className: string;
}

export default function Image({ src, className }: ImageProps) {
    return <img src={src} alt="" className={twMerge('w-full', className)} />;
}
