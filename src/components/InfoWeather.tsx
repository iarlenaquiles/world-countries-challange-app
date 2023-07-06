import React from 'react';

interface InfoProps {
    name: string;
    value: string | number;
}

export default function InfoWeather({ name, value }: InfoProps) {
    return (
        <>
            <p className="font-bold">{name}: {value}</p>            
        </>
    );
}
