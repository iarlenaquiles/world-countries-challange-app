import React from 'react';

import Info from './components/Info';
import InfoWeather from './components/InfoWeather';
import Button from './components/Button';

import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import mondaySdk from 'monday-sdk-js';
import { getWeather } from './config';

interface Country {
    name: string;
    column_values: Array<{ title: string; value: string }>;
}

interface Weather {
    name: string;
    value: string | number;
}

export default function CountryDetails() {
    const monday = mondaySdk();

    const { countryId } = useParams();

    const [country, setCountry] = useState<Country>();
    const [weather, setWeather] = useState<Weather[]>();

    useEffect(() => {
        async function fetchWeather(country) {
            try {
                const url = getWeather(country);
                const res = await fetch(url);
                const countryWeather = await res.json();
                setWeather(countryWeather);
            } catch (e) {
                console.log(e);
            }
        }

        async function fetchCountry() {
            try {
                monday
                    .api(
                        `query {
            boards (ids: 4505502032) {
                items(ids:[${countryId}]) {
                    id
                    name
                    column_values {
                      id
                      title
                      value
                    }
                  }
            }}`,
                    )
                    .then((res: any) => {
                        const {
                            data: {
                                boards: [items],
                            },
                        } = res;

                        setCountry(items.items[0]);
                        fetchWeather(items.items[0].name);
                    });
            } catch (e) {
                console.log(e);
            }
        }

        fetchCountry();
    }, []);

    return (
        <main className="container mx-auto px-[5%] pb-[10%]">
            <Button className="my-10" to="/">
                &larr; Go back
            </Button>
            <div className="gap-30 mx-auto flex flex-col gap-10 lg:flex-row">
                {(country && (
                    <>
                        <div className="flex flex-col gap-10">
                            <h2 className="text-3xl font-bold">{country.name}</h2>
                            <div className="flex flex-col gap-8 md:flex-row">
                                {country.column_values.map((el, idx) => (
                                    <Info key={idx} name={el.title} value={el.value} />
                                ))}
                            </div>

                            <div className="flex flex-col gap-8 md:flex-row">
                                {weather &&
                                    weather.map((el, idx) => <InfoWeather key={idx} name={el.name} value={el.value} />)}
                            </div>
                        </div>
                    </>
                )) || <p>Loading</p>}
            </div>
        </main>
    );
}
