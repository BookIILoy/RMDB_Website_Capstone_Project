from pymongo import MongoClient
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle

client = MongoClient('mongodb+srv://RMDB_admin2:nWlV72M80GMB101H@cluster0.unw3ppl.mongodb.net/')
db = client["rmdb_db"]
movies = db["movie_database"]

movies_data = movies.find({})

df = pd.DataFrame(list(movies_data))
df = df[['movie_id', 'title', 'overview', 'genres']]
df['genres'] = df['genres'].apply(lambda x: [genre['name'] for genre in x] if isinstance(x, list) else [])
df['overview'] = df['overview'].astype(str)
df['genres'] = df['genres'].apply(lambda x: ', '.join(x) if isinstance(x, list) else '').astype(str)
df['tags'] = df['overview'] + ', ' + df['genres']

new_data  = df.drop(columns=['overview', 'genres'])
max = len(new_data)
new_data_subset = new_data.iloc[:10000]

cv=CountVectorizer(max_features=10000, stop_words='english')
vector = cv.fit_transform(new_data_subset['tags'].values.astype('U')).toarray()

similarity=cosine_similarity(vector)

pickle.dump(new_data, open('../rmdb_backend/Models/movies_list.pkl', 'wb'))
pickle.dump(similarity, open('../rmdb_backend/Models/similarity.pkl', 'wb'))
