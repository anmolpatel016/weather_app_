# Weather App
A beautiful, responsive weather application that provides current weather conditions and 5-day forecasts for cities worldwide.
Features

Current Weather Display: Shows temperature, weather conditions, humidity, and wind information
5-Day Forecast: Displays upcoming weather predictions with icons
Search Functionality: Search for any city worldwide
Responsive Design: Works seamlessly on desktop and mobile devices
Beautiful UI: Glass-morphism design with backdrop blur effects
Real-time Data: Fetches live weather data from OpenWeatherMap API

# Prerequisites
Before running this application, you need:

A web browser (Chrome, Firefox, Safari, etc.)
An internet connection
An OpenWeatherMap API key (see setup instructions below)

Setup Instructions
# 1. Get OpenWeatherMap API Key

Visit OpenWeatherMap
Sign up for a free account
Navigate to the API keys section
Generate a new API key
Copy your API key

# 2. Configure the Application

Open the script.js file
Find the line: const apiKey = '6051e208b004321e4b6b5dcb716d39b8';
Replace the existing API key with your own API key:
javascriptconst apiKey = 'YOUR_API_KEY_HERE';

# 3.Set Up Weather Icons
The application expects weather icons in a weather/ directory. Create the following structure:
weather/
├── thunderstorm.svg
├── drizzle.svg
├── rain.svg
├── snow.svg
├── tornado.svg
├── clear-sky.svg
├── clouds.svg
├── sun.svg
└── cloudy-sun.svg
# 4.Set Up Message Images
message/
├── search-city.png
└── not-found.png
# 5.Set Up Background Image
assets/
└── Nature.png
# File Structure
weather-app/
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── script.js           # JavaScript functionality
├── weather/            # Weather icons directory
│   └── *.svg files
├── message/            # Message images directory
│   └── *.png files
├── assets/             # Background images directory
│   └── Nature.png
└── README.md           # This file
