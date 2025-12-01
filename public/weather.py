import requests
from datetime import datetime, timedelta
import json
import os 
script_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(script_dir, 'weather.json'); api_key = ""
def get_weather(city_name):
 url = f'https://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={api_key}'
 req = requests.get(url); data = req.json()
 lon = data['coord']['lon']; lat = data['coord']['lat']
 url2 = f'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude=minute,hourly&appid={api_key}'
 req2 = requests.get(url2); data2 = req2.json()
 forecast_list = []
 for i in range(5):
  daily = data2['daily'][i]
  day_temp = round(daily['temp']['day'] - 273.15, 1)
  weather_main = daily['weather'][0]['main']
  description = daily['weather'][0]['description']
  forecast_list.append({
   "dayIndex": i,"label": ["Today", "Tomorrow", "", "", ""][i] if i < 2 else "",
   "temperature": day_temp,"condition": weather_main,"description": description
  })
 with open(file_path, "w") as f:
  json.dump(forecast_list, f, indent=4)
 print("Weather updated → weather.json saved")
get_weather("Phnom Penh")
