import os
import django
import sys
sys.path.append('C:\\Users\\bookz\\Music\\CapstoneProjectFrFr\\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
import requests
from rmdb_backend.models import movies_collection  # Ensure this import matches your database connection setup

api_key = "22bd8561d5f68d41d4d6f2f5e3e28ab2"

def fetch_movie_ids_from_year(start_page, year):
    initial_url = f"https://api.themoviedb.org/3/discover/movie?api_key={api_key}&primary_release_year={year}&page={start_page}"
    initial_response = requests.get(initial_url)
    if initial_response.status_code != 200:
        print(f"Failed to fetch movie IDs for year {year}")
        return []

    total_pages = initial_response.json().get('total_pages', 1)
    movie_ids = [movie['id'] for movie in initial_response.json()['results']]
    current_pages = 0

    for page in range(start_page+1, total_pages + 1):  # Start from page 2 since we already fetched page 1
        url = f"https://api.themoviedb.org/3/discover/movie?api_key={api_key}&primary_release_year={year}&page={page}"
        response = requests.get(url)
        if response.status_code == 200:
            movie_ids.extend([movie['id'] for movie in response.json()['results']])
        else:
            print(f"Failed to fetch movie IDs for year {year}, page {page}")
            current_pages = page
            break
        

    return movie_ids, current_pages


def fetch_movie_data_by_id(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch data for movie ID {movie_id}")
        return None

# Function to store movies in the database
def store_movie(movie_data):
    db = movies_collection
    
    # Use the correct method for inserting a document
    db.insert_one({
        'adult': movie_data['adult'],
        'backdrop_path': movie_data['backdrop_path'],
        'belongs_to_collection': movie_data.get('belongs_to_collection'),  # Use .get for optional fields
        'budget': movie_data['budget'],
        'genres': movie_data['genres'],  
        'homepage': movie_data['homepage'],
        'movie_id': movie_data['id'],
        'imdb_id': movie_data['imdb_id'],
        'original_language': movie_data['original_language'],
        'original_title': movie_data['original_title'],
        'overview': movie_data['overview'],
        'popularity': movie_data['popularity'],
        'poster_path': movie_data['poster_path'],
        'production_companies': movie_data['production_companies'],  
        'production_countries': movie_data['production_countries'],  
        'release_date': movie_data['release_date'],
        'revenue': movie_data['revenue'],
        'runtime': movie_data['runtime'],
        'spoken_languages': movie_data['spoken_languages'],  
        'status': movie_data['status'],
        'tagline': movie_data['tagline'],
        'title': movie_data['title'],
        'video': movie_data['video'],
        'vote_average': movie_data['vote_average'],
        'vote_count': movie_data['vote_count']
    })
    print(f"Movie {movie_data['title']} stored successfully")

def main():
        year = 2012  # Loop through years 1990 to 2024
        print(f"Fetching movies for the year {year}...")
        movie_ids, current_page = fetch_movie_ids_from_year(1,year)
        for movie_id in movie_ids:
            movie_data = fetch_movie_data_by_id(movie_id)
            if movie_data:
                store_movie(movie_data)
            else:
                print(f"Failed to fetch data for movie ID {movie_id}")

if __name__ == "__main__":
    main()
