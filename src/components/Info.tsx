import React from 'react';

interface InfoProps {
    name: string;
    value: string;
}

export default function Info({ name, value }: InfoProps) {
    const valueParsed = JSON.parse(value) || value;

    return (
        (typeof valueParsed === 'string' && (
            <>
                <p>
                    <span className="font-bold">{name}: </span>
                    {valueParsed}
                </p>
            </>
        )) || (
            <>
                <p className="font-bold">{name}: </p>
                {Object.entries(valueParsed).map((key, value) => {
                    return `${key} `;
                })}
            </>
        )
    );
}
