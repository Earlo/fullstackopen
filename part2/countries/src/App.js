import { useEffect, useState } from "react";

import axios from "axios";

const Country = ({ country }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        axios
            .get(
                `http://api.openweathermap.org/data/2.5/forecast?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
            )
            .then((response) => {
                setWeather(response.data);
            });
    }, [country.latlng]);

    console.log(country);

    console.log(weather);
    return (
        <>
            <h1>{country.name.common}</h1>
            <div>capital: {country.capital}</div>
            <div>area: {country.area}</div>
            <h3>Languages</h3>
            {Object.values(country.languages).map((language) => (
                <li>{language}</li>
            ))}
            <img src={country.flags.png} alt={"flag"} />
            {weather && (
                <>
                    <h2>Weather in {country.capital}</h2>
                    <div>temperature {weather.list[0].main.temp}</div>
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}
                        alt={"weather"}
                    />
                    <div>wind {weather.list[0].wind.speed} m/s</div>
                </>
            )}
        </>
    );
};
const App = () => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState(null);

    const [query, setQuery] = useState("");

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all").then((response) => {
            setCountries(response.data);
        });
    }, []);

    const filtered = countries.filter(
        (country) =>
            country.name.common.toUpperCase().indexOf(query.toUpperCase()) !==
            -1
    );
    return (
        <>
            <div>
                <span>
                    find countries{" "}
                    <input
                        value={query}
                        onChange={(event) => {
                            setCountry(null);
                            setQuery(event.target.value);
                        }}
                    />
                </span>
            </div>
            {country ? (
                <Country country={country} />
            ) : filtered.length < 10 ? (
                filtered.length === 1 ? (
                    <Country country={filtered[0]} />
                ) : (
                    filtered.map((country) => (
                        <div key={country.name.common}>
                            <span>
                                {country.name.common}
                                <button onClick={(e) => setCountry(country)}>
                                    show
                                </button>
                            </span>
                        </div>
                    ))
                )
            ) : (
                <div>Too many matches, specify another filter</div>
            )}
        </>
    );
};

export default App;
