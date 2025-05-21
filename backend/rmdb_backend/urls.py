from django.urls import path
from .views import MoviesViewSet, ReviewViewSet, RecommendViewSet

urlpatterns = [
    path('movies/', MoviesViewSet.as_view({'get': 'get_movies'}), name='get_movies'),
    path('movies/<str:pk>/', MoviesViewSet.as_view({'get': 'retrieve'}), name='get_movie_by_id'),
    path('reviews/', ReviewViewSet.as_view({'get':'get_reviews'}), name= 'get_reviews'),
    path('reviews/create/',ReviewViewSet.as_view({'post':'create_review'}), name='create_review'),
    path('reviews/<str:pk>/delete/', ReviewViewSet.as_view({'delete': 'delete_review'}), name='delete-review'),
    path('reviews/<str:pk>/update/', ReviewViewSet.as_view({'patch': 'update_review'}), name='update-review'),
    path('recommend/', RecommendViewSet.as_view({'post':'get_rec'}), name='get_recommend'),
]