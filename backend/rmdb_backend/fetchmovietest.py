import os
import django
import sys
sys.path.append('D:\\KMUTT Learning\\RMDB_Movies\\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
import requests
from rmdb_backend.models import movies_collection
# Define your API key
api_key = '22bd8561d5f68d41d4d6f2f5e3e28ab2'


def fetch_movie_data_by_id(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch data for movie ID {movie_id}")
        return None

# Assuming you have a database connection object named movie_database and a method named insert_into_movie_database
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
    movie_id = 2
    movie_data = fetch_movie_data_by_id(movie_id)
    if movie_data:
        store_movie(movie_data)
    else:
        print(f"Failed to fetch data for movie ID {movie_id}")

if __name__ == "__main__":
    main()