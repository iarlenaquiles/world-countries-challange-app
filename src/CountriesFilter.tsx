import React from 'react';

import { useId, useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md';

import CountryCard from './components/CountryCard';

import { Link } from 'react-router-dom';
import mondaySdk from 'monday-sdk-js';

interface Country {
    id: number;
    name: string;
    column_values: Array<{ title: string; value: string }>;
    items: any;
}

export default function CountriesFilter() {
    const monday = mondaySdk();

    const [filterText, setFilterText] = useState<any>();

    const [countries, setCountries] = useState<Country>();

    const fetchCountries = async () => {
        monday
            .api(
                `query {
        boards (ids: 4505502032) {
            items {
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

                setCountries(items);
            });
    };

    useEffect(() => {
        if (filterText) {
            monday
                .api(
                    `query {            
              items_by_column_values(board_id: 4505502032, column_id: "name", column_value: "${filterText}") {
                    id
                    name                         
              }
          }`,
                )
                .then((res: any) => {
                    const {
                        data: { items_by_column_values },
                    } = res;
                    setCountries(items_by_column_values);
                });
        } else {
            fetchCountries();
        }
    }, [filterText]);

    useEffect(() => {
        fetchCountries();
    }, []);

    const searchId = useId();

    return (
        <main className="container mx-auto flex h-auto grow flex-col px-4 pt-7 lg:px-0">
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:justify-between">
                <div className="relative">
                    <input
                        id={searchId}
                        onInput={(e: any) => {
                            setFilterText(e.target.value);
                        }}
                        className="w-full rounded p-4 pl-[2rem] text-sm drop-shadow focus-visible:border-violet-800 dark:bg-dark-bg-front dark:text-white lg:w-[500px]"
                        type="text"
                        name="text"
                        placeholder="Search for a country..."
                    />
                    <label htmlFor={searchId} className="absolute left-[.5rem] translate-y-[100%] scale-125">
                        <MdSearch title="Search" />
                    </label>
                </div>
            </div>
            {(countries && (
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
                    {(countries.items || countries).map((country) => {
                        let countryInfo = {
                            name: country.name,
                            info: new Array(country.column_values),
                        };

                        return (
                            <Link key={country.id} to={`/${country.id}`}>
                                <CountryCard id={country.id} {...countryInfo} />
                            </Link>
                        );
                    })}
                </div>
            )) || <p>Loading</p>}
        </main>
    );
}
