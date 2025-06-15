import { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

export const WeatherApp = () => {
    const [city, setCity] = useState("");
    const [icon, setIcon] = useState("");
    const [name, setName] = useState("");
    const [temp, setTemp] = useState("");
    const [Hum, setHum] = useState("");
    const [pressure, setPressure] = useState("");
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(false); // Track whether the user has pressed "Enter"

    const apiKey = "703580452beb494ca90dc3bf25db8695"; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const defaultIcon = "https://cdn-icons-png.flaticon.com/512/9614/9614841.png";

    const fetchWeather = async () => {
        setError(""); // Reset error at the start of the fetch
        try {
            const res = await axios.get(apiUrl);
            const data = res.data;
    
            setName(data.name);
            setTemp(data.main.temp);
            setHum(data.main.humidity);
            setPressure(data.main.pressure);
            setIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    
            setError(""); // Clear error if successful
            console.log(data);
        } catch (error) {
            console.error(error.message);
            setError("City not found");
            setName("");
            setTemp("");
            setHum("");
            setPressure("");
            setIcon("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && city.trim() !== "") {
            setHasSearched(true); // Mark that the user has pressed "Enter"
        }
    };

    useEffect(() => {
        if (hasSearched && city.trim() !== "") { // Only fetch weather if search has been triggered and city is not empty
            fetchWeather();
        }
    }, [hasSearched, city]); // Trigger useEffect only when "hasSearched" or "city" changes

    return (
      <>
      <h2>Weather App</h2>
        <center className="Weather">
            <input 
                type="text" 
                value={city} 
                placeholder="Enter a city" 
                onChange={(e) => setCity(e.target.value)} 
                onKeyDown={handleKeyPress} 
            />
            {error && hasSearched && <div className="error">{error}</div>} {/* Show error only after search */}

            {name && <p>{name}</p>}
            {temp && <h1>{temp}°C</h1>}
            <img src={icon || defaultIcon} alt="Weather Icon" width="100px" />

            {Hum && <p>Humidity: {Hum}%</p>}
            {pressure && <p>Pressure: {pressure} hPa</p>}
        </center>
      </>
    );
};

export default WeatherApp;
