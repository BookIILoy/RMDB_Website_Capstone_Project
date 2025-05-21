from db_connection import db

# Create your models here.
accounts_collection = db['user_accounts']
movies_collection = db['movie_database']
reviews_collection = db['movie_review']
