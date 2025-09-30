import praw
import re
from geopy.geocoders import Nominatim
import time
import spacy
import folium
from datetime import datetime
import tqdm

geolocator = Nominatim(user_agent="Calamity-v0.1")
#python -m spacy download en_core_web_sm
nlp = spacy.load("en_core_web_sm")
# Configuration
reddit = praw.Reddit(
    client_id="stfQv-7DgTT_h6kveEkfFw",
    client_secret="8BuhNJ0duAcR4QeqfULxGdBXtfsFWw",
    user_agent="Calamity/0.1 by SplendidSurvivor"
)

def guess_location(text):
    doc = nlp(text)
    candidates = [ent.text for ent in doc.ents if ent.label_=="GPE"]
    #For each candidate place
    for place in candidates:
        try:
            loc = geolocator.geocode(place,timeout=10)
            if loc:
                return {"Place":place,"lat":loc.latitude,"lon":loc.longitude,"desc":text}
        except Exception as e:
            time.sleep(0.01)
    return None

def search_social_media():
    data = []
    subreddits = reddit.subreddit("disasters+maritime+news+worldnews+tsunami+oceanography+marine+environment") 
    queries = ["storm","tsunami","oil spill","cyclone","ship sinking","shipwreck","flood","capsize"]
    for query in queries:
        for post in tqdm.tqdm(subreddits.search(query, sort='new', limit=100)):
            text = (post.title +" "+post.selftext)
        
            timestamp = post.created_utc  
            post_date = datetime.fromtimestamp(timestamp) 

            ret = guess_location(text)
            if ret !=None:
                ret["date"] = str(post_date)
                data.append(ret)
    return data
        