import React from 'react'
import Input from './Input'
import axios from 'axios';
import { useEffect, useState } from 'react';
// import { icons } from 'react-icons/lib';

function Weather() {
    const [degree, setDegrees] = useState(null)
    const [location, setLocation] = useState("")
    const [userlocation, setUserlocation] = useState("")
    const[description, setDescription] = useState("")
    const[icon, setIcon] = useState("")
    const[humidity, setHumidity] = useState(null)
    const[wind, setWind] = useState(null)
    const[country, setCountry] = useState("")
    const[dataFetched, setDataFetched] = useState(false)

    const API_KEY = "0e6fabe44b343c5a937dacc7a4b7e8e2"

    const fetchData = async (e) =>{
        e.preventDefault()
        
        try{
            
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userlocation}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)

            const data =  await res.data

            setDegrees(data.main.temp)
            setLocation(data.name)
            setDescription(data.weather[0].description)
            setIcon(data.weather[0].icon)
            setHumidity(data.main.humidity)
            setWind(data.wind.speed)
            setCountry(data.sys.country)

            setDataFetched(true)
        }catch(err){
            console.log(err)
            alert("please enter valid location")
        }
    }

    const defaultDataFetched = async () =>{
        if(!dataFetched){
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Nigeria&appid=${process.env.REACT_APP_API_KEY}&units=metric`)

            const data =  await res.data
    
            setDegrees(data.main.temp)
            setLocation(data.name)
            setDescription(data.weather[0].description)
            setIcon(data.weather[0].icon)
            setHumidity(data.main.humidity)
            setWind(data.wind.speed)
            setCountry(data.sys.country)
            
        }
    }

    useEffect(() =>{
        defaultDataFetched()
    }, [])
  return (
    <div className='weather-container'>
        <Input 
            test={(e) => setUserlocation(e.target.value )}
            submit={fetchData}
            func = {fetchData}
        />

        <div className="weather_location_degree">
            <div className="weather_location">
                <h1>Weather in {location}</h1>
            </div>

            <div className="weather_degree">
                <h2>{degree} °C</h2>
            </div>

            <div className='weather_discription'>

                <div>

                    <div className='cloud_details'>
                        <span className='cloud_icon'>
                            <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="" />
                        </span>
                        <p>{description}</p>
                    </div>

                    <div className='cloud_discription'>
                        <p><span>Humidity:</span> {humidity}%</p>
                        <p>Wind speed: {wind} m/s</p>
                    </div>
                </div>

                <div className='right_side'>
                    <div>
                        <h3>{country}</h3>
                        <h3>4/30/2022, 2:05:24 PM</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather