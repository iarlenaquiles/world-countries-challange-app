import React from 'react';

interface CountryName {
    name: string;
    id: number;
}

export default function CountryCard({ name }: CountryName) {
    return (
        <div className="grid h-full grid-rows-2 overflow-hidden rounded-md bg-white drop-shadow hover:cursor-pointer focus:border focus:border-blue-400 dark:bg-dark-bg-front">
            <div className="p-5">
                <h2 className="mb-5 text-xl font-bold">{name}</h2>
            </div>
        </div>
    );
}
