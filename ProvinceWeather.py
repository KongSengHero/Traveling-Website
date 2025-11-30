import requests
from datetime import datetime, timedelta

api_key = "" \
"eb8ab4d1cc54eb4db91fe02667b38c7e"

#user input option
def cityoption():
    print("Select the province/city that you want to visit 1-25")
    province = ["Phnom Penh",
                "Banteay Meanchey",
                "Battambang",
                "Kampong Cham",
                "Kampong Chhnang",
                "Kampong Speu",
                "Kampong Thom",
                "Kampot",
                "Kandal",
                "Kep",
                "Koh Kong",
                "Kratié",
                "Mondulkiri",
                "Oddar Meanchey",
                "Pailin",
                "Preah Vihear",
                "Preah Sihanouk",
                "Prey Veng",
                "Pursat",
                "Ratanakiri",
                "Siem Reap",
                "Stung Treng",
                "Svay Rieng",
                "Takéo",
                "Tboung Khmum "]
    for idx, ProvinceName in enumerate(province, start=1):
        print(f"{idx}. {ProvinceName}")
        
    while True:
        try:
            city_name = int(input("Please input the number of the province/city that you want to visit: "))
            if 1 <= city_name <= len(province):
                start(province[city_name - 1])
                break
            else:
                print(f"Invalid input. Please enter a number between 1 and {len(province)}.")
        except ValueError:
            print("Invalid input. Please enter a valid integer.")

#logic
def start(city_name):
    #city's coordinates (lat and lon)
    
    url = f'https://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={api_key}'
    

    ##parse the Json
    req = requests.get(url)
    data = req.json()

    #get the name, the longitude and latitude
    if 'name' in data and 'coord' in data and 'lon' in data['coord'] and 'lat' in data['coord']:
        name = data['name']
        lon = data['coord']['lon']
        lat = data['coord']['lat']
    
    else:
        print("Error: City not found or missing data in API response.")
        return

    #use the One Call Api to get the 8 day forecast
    #exclude the minutely and hourly
    exclude = "minute,hourly"

    url2 = f'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={exclude}&appid={api_key}'
    

    #Let's now parse the JSON
    req2 = requests.get(url2)
    data2 = req2.json()
    # print(data2)

    #get the temp for the day, the night and the weather conditions
    days = []
    nights = []
    descr = []

    #Check if 'daily' exists in the response
    if 'daily' in data2:
        for i in data2['daily']:
            #change temp from kelvin to C

            #Let's start by days
            #Let's round the decimal numbers to 2
            days.append(round(i['temp']['day'] - 273.15,2))

            #Nights
            nights.append(round(i['temp']['night'] - 273.15,2))

            #the weather condition and the description
            #'weather' [0] 'main' + 'weather' [0] 'description'
            descr.append(i['weather'][0]['main'] + ": " +i['weather'][0]['description'])
    else:
        print("Error:", data2.get('message', 'Unknown error'))


    #format the output to make it readable
    string = f'[ {name} - 8 days forecast]\n'
    
    today = datetime.today()
    #loop for as much days as there available (8 in this case):
    for i in range(len(days)):
        date = today + timedelta(days=i)
        formatted_date = date.strftime('%A, %d %B %Y')
        
        # day 1 = today and day 2 = tomorrow for reference
        if i == 0:
            string += f'\nDay {i+1} (Today) - {formatted_date}\n'
        elif i == 1:
            string += f'\nDay {i+1} (Tomorrow) - {formatted_date}\n'
        else:
            string += f'\nDay {i+1} - {formatted_date}\n'
        
        string += 'Morning: ' + str(days[i]) + '°C' + "\n"
        string += 'Night: ' + str(nights[i]) + '°C' + "\n"
        string += 'Conditions: ' + descr[i] + '\n'
        
    print(string)

cityoption()