import folium
import tweepy
import requests
from datetime import datetime, timezone,timedelta
import Social

#We the function which finds events from GDACS 
def fetch_gdac(days=5):
    #The API url
    api_url = "https://www.gdacs.org/gdacsapi/api/events/geteventlist/SEARCH"
    
    #The time frame
    start_str = (datetime.now(timezone.utc)-timedelta(days=days)).date().isoformat()
    end_str = datetime.now(timezone.utc).date().isoformat()

    #The events we wish to search
    event_types = ["TC","TS","FL"]
    all_events = []
    
    for et in event_types:
        params = {
            "eventlist": et,
            "fromdate": start_str,
            "todate": end_str,
            "alertlevel": "red;orange;green"  
        }
        resp = requests.get(api_url,params=params)
        if resp.status_code == 200:
            all_events.extend(resp.json().get("features",[]))
    return all_events

#We define the pipeling to genereate the map
def generate_gdac_map():
    #We initialize the map
    m = folium.Map(location=[0,0],zoom_start=4)
    #We fetch 5 days worth of data
    data = fetch_gdac(5)
    for d in data:
        #print(d["properties"]["eventname"]," ",d["properties"]["fromdate"]," ",d["properties"]["todate"]," ",d["properties"]["eventtype"])
        lat = (d["bbox"][1] + d["bbox"][3])/2.0
        long = (d["bbox"][0] + d["bbox"][2])/2.0

        folium.Marker(
            location=[lat,long],
            popup=f"{d["properties"]["description"]+":"+d["properties"]["eventtype"]}",
            icon=folium.Icon(color="green")
        ).add_to(m)

    #Search social media
    social_media_data = Social.search_social_media()
    for entry in social_media_data:
        folium.Marker(
            location=[entry["lat"],entry["lon"]],
            popup=f"{entry["date"]+":"+entry["desc"]}",
            icon=folium.Icon(color="blue")
        ).add_to(m)

    m.save("disaster.html")
   




if __name__ == "__main__":
   
    generate_gdac_map()
