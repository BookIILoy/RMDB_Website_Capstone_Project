from rest_framework import viewsets
from rest_framework.response import Response
from .models import movies_collection, reviews_collection  # Assuming movies_collection is a MongoDB collection
from rest_framework import status
from .serializers import MoviesSerializer, ReviewsSerializer
from bson.regex import Regex
from bson.objectid import ObjectId  # Import ObjectId for ID handling
import pickle
import os
import requests

base_dir = "rmdb_backend"
models_folder = "Models"
movies_path = "movies_list.pkl"
similarity_path = "similarity.pkl"
movies_join = os.path.join(base_dir, models_folder, movies_path)
similarity_join = os.path.join(base_dir, models_folder, similarity_path)

movies = pickle.load(open(movies_join, "rb"))
similarity = pickle.load(open(similarity_join, "rb"))
apiKey = '22bd8561d5f68d41d4d6f2f5e3e28ab2'

def recommend(movie):
    index = movies[movies['title'] == movie].index
    print(index)
    if len(index) == 1:  
        if index >= 10000 or len(index) == 0:
            # If movie title not found, fetch similar movies from TMDB API
            similar_movies = fetch_similar_movies(movie)
            return similar_movies
        else:
            index = index[0]
            recommend_movies = []
            distance = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda vector:vector[1])
            for i in distance[0:5]:
                movie_id = int(movies.iloc[i[0]].movie_id)
                movies_detail = list(movies_collection.find({'movie_id': movie_id}))
                serializer = MoviesSerializer(many=True, data=movies_detail)
                if serializer.is_valid():
                    serialized_data = serializer.data
                    recommend_movies.append(serialized_data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return recommend_movies
    else:
        if index[0] >= 10000 or len(index) == 0:
            # If movie title not found, fetch similar movies from TMDB API
            similar_movies = fetch_similar_movies(movie)
            return similar_movies
        else:
            index = index[0]
            recommend_movies = []
            distance = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda vector:vector[1])
            for i in distance[0:5]:
                movie_id = int(movies.iloc[i[0]].movie_id)
                movies_detail = list(movies_collection.find({'movie_id': movie_id}))
                serializer = MoviesSerializer(many=True, data=movies_detail)
                if serializer.is_valid():
                    serialized_data = serializer.data
                    recommend_movies.append(serialized_data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return recommend_movies

def fetch_similar_movies(movie):
    try:
        response = requests.get(f'https://api.themoviedb.org/3/search/movie?api_key={apiKey}&query={movie}')
        data = response.json()
        if 'results' in data and len(data['results']) > 0:
            movie_id = data['results'][0]['id']
            similar_response = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key={apiKey}')
            similar_data = similar_response.json()
            similar_movies = similar_data.get('results', [])
            return similar_movies
        else:
            return []
    except Exception as e:
        print('Error fetching similar movies:', e)
        return []

class RecommendViewSet(viewsets.ViewSet):
    def get_rec(self, request):
        try:
            movie_title = request.data.get('movie_title')
            movie_recommend = recommend(movie_title)
            response_data = {
                "Success": 1,
                "From Movie Name" : movie_title,
                "Recommend" : movie_recommend
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "success" : 0,
                "error": str(e),
            }, status=status.HTTP_200_OK)
class MoviesViewSet(viewsets.ViewSet):
    def get_movies(self, request):
        """Fetches and returns movies with pagination."""
        try:
            page = int(request.query_params.get('page', 1))
            per_page = 20
            
            # Calculate skip based on page number and per_page
            skip = (page - 1) * per_page
            
            year = request.query_params.get('year')

            # Query movies based on the year if provided
            if year:
                regex_pattern = Regex(f"{year}")
                movies_detail = list(movies_collection.find({'release_date': regex_pattern}).skip(skip).limit(per_page))
            else:
                movies_detail = list(movies_collection.find().skip(skip).limit(per_page))

            total_movies = movies_collection.count_documents({})

            # Serialize the data
            serializer = MoviesSerializer(many=True, data=movies_detail)

            if serializer.is_valid():
                serialized_data = serializer.data
                response_data = {
                    "movies": serialized_data,
                    "total_movies": total_movies,
                    "page": page,
                    "total_pages" : float(total_movies / per_page),
                    "per_page": per_page,
                    "has_next": total_movies > (page * per_page),
                    "has_prev": page > 1,
                    "count": len(serialized_data),
                }
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def retrieve(self, request, pk=None):
        """Retrieves a specific movie by its ID."""
        try:
            if not pk:
                return Response({"error": "Missing movie ID"}, status=status.HTTP_400_BAD_REQUEST)

            # Convert the provided ID to a MongoDB ObjectId
            movie_id = ObjectId(pk)

            # Find the movie with the matching ID
            movie_detail = movies_collection.find_one({"_id": movie_id})

            if not movie_detail:
                return Response({"error": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = MoviesSerializer(movie_detail)
            serialized_data = serializer.data  # Directly access serialized data
            return Response(serialized_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def list(self, request):
        """Handles GET requests to the viewset, delegates to get_movies."""
        return self.get_movies(request)

class ReviewViewSet(viewsets.ViewSet):
    def get_reviews(self, request):
        try:
            user_id = request.query_params.get('id')
            movie_id = request.query_params.get('movie_id')

            if(user_id):
                reviews_detail = list(reviews_collection.find({'user_id':user_id}))
            elif(movie_id):
                reviews_detail = list(reviews_collection.find({'movie_id':int(movie_id)}))
            else:
                 reviews_detail = list(reviews_collection.find())
        
            total_reviews = len(reviews_detail)
            serializer = ReviewsSerializer(many=True, data=reviews_detail)

            if serializer.is_valid():
                serialized_data = serializer.data
                response_data = {
                "success": 1,
                "reviews": serialized_data,
                "total_reviews": total_reviews,
                }
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({"success": 0,"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def create_review(self, request):
        user_id = request.data.get('user_id')
        user_name = request.data.get('user_name')
        movie_id = request.data.get('movie_id')
        movie_name = request.data.get('movie_name')
        score = request.data.get('score')
        overall = request.data.get('overall')
        subject = request.data.get('subject')
        comment = request.data.get('comment')

        if user_id and user_name and movie_id and movie_name and overall and subject and comment:
            reviews_collection.insert_one({
            "user_id": user_id,
            "user_name": user_name,
            "movie_id": movie_id,
            "movie_name": movie_name,
            "score": score,
            "overall": overall,
            "subject": subject,
            "comment": comment
            })

            return Response({"success": 1, "message": "Review created successfully"},status=status.HTTP_200_OK)
        else :
            return Response({"success" : 0, "message": "Some part is missing"}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete_review(self, request, pk=None):
        try:
            if pk:
                # Convert pk (URL argument) to ObjectId for MongoDB
                review_id = ObjectId(pk)
                deleted_review = reviews_collection.delete_one({'_id': review_id})

                if deleted_review.deleted_count == 1:
                    return Response({"success": 1,"message": "Review deleted successfully"}, status=status.HTTP_200_OK)
                else:
                    return Response({"success": 0,"error": "Review not found"}, status=status.HTTP_404_NOT_FOUND)

            else:
                return Response({"success": 0,"error": "Missing review ID"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"success":0,"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def update_review(self, request, pk=None):
        try:
            if pk:
                review_id = ObjectId(pk)
                update_data = request.data  # Data from request body (serializer)

                # Update logic (using update_one or find_one_and_update)
                updated_review = reviews_collection.update_one(
                    {'_id': review_id},
                    {'$set': update_data}  # Update specific fields with $set
                )

                if updated_review.matched_count == 1:
                    # Retrieve the updated document for response
                    updated_review_data = reviews_collection.find_one({'_id': review_id})
                    serializer = ReviewsSerializer(updated_review_data)
                    serialized_data = serializer.data
                    return Response(serialized_data, status=status.HTTP_200_OK)
                else:
                    return Response({"success": 0,"error": "Review not found"}, status=status.HTTP_404_NOT_FOUND)

            else:
                return Response({"success": 0,"error": "Missing review ID"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"success": 0,"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
