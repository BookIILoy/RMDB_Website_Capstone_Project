from rest_framework import serializers
from bson import ObjectId

class UserSerializer(serializers.Serializer):
    firstname = serializers.CharField()
    lastname = serializers.CharField()
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()

class ObjectIdField(serializers.Field):
    """
    Custom serializer field to convert ObjectId to string.
    """
    def to_representation(self, value):
        return str(value)
    def to_internal_value(self, data):
        try:
            return ObjectId(data)
        except Exception as e:
            raise serializers.ValidationError(str(e))

class GenreSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(allow_null=True,allow_blank=True)

class ProductionCompanySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    logo_path = serializers.CharField(allow_null=True,allow_blank=True)
    name = serializers.CharField(allow_null=True,allow_blank=True)
    origin_country = serializers.CharField(allow_null=True,allow_blank=True)

class ProductionCountrySerializer(serializers.Serializer):
    iso_3166_1 = serializers.CharField(allow_null=True,allow_blank=True)
    name = serializers.CharField(allow_null=True,allow_blank=True)

class LanguageSerializer(serializers.Serializer):
    iso_639_1 = serializers.CharField(allow_null=True,allow_blank=True)
    name = serializers.CharField(allow_null=True,allow_blank=True)

class CollectionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(allow_blank=True, allow_null=True)
    poster_path = serializers.CharField(allow_blank=True, allow_null=True)
    backdrop_path = serializers.CharField(allow_blank=True, allow_null=True)

class MoviesSerializer(serializers.Serializer):
    _id = ObjectIdField()
    adult = serializers.BooleanField(allow_null=True)
    backdrop_path = serializers.CharField(allow_null=True,allow_blank=True)
    belongs_to_collection = CollectionSerializer(allow_null=True)
    budget = serializers.IntegerField(allow_null=True)

    # Handling genres as a list of objects
    genres = GenreSerializer(many=True)

    homepage = serializers.CharField(allow_null=True, allow_blank=True)
    movie_id = serializers.IntegerField(allow_null=True)
    imdb_id = serializers.CharField(allow_null=True,allow_blank=True)
    original_language = serializers.CharField(allow_null=True,allow_blank=True)
    original_title = serializers.CharField(allow_null=True,allow_blank=True)
    overview = serializers.CharField(allow_null=True,allow_blank=True)
    popularity = serializers.FloatField(allow_null=True)
    poster_path = serializers.CharField(allow_null=True,allow_blank=True)

    # Handling production companies as a list of objects
    production_companies = ProductionCompanySerializer(many=True, allow_null=True)

    # Handling production countries as a list of objects
    production_countries = ProductionCountrySerializer(many=True, allow_null=True)

    release_date = serializers.CharField(allow_null=True,allow_blank=True)
    revenue = serializers.IntegerField(allow_null=True)
    runtime = serializers.IntegerField(allow_null=True)

    # Handling spoken languages as a list of objects
    spoken_languages = LanguageSerializer(many=True, allow_null=True)

    status = serializers.CharField(allow_null=True,allow_blank=True)
    tagline = serializers.CharField(allow_null=True,allow_blank=True)
    title = serializers.CharField(allow_null=True,allow_blank=True)
    video = serializers.BooleanField(allow_null=True)
    vote_average = serializers.FloatField(allow_null=True)
    vote_count = serializers.IntegerField(allow_null=True)

class ReviewsSerializer(serializers.Serializer):
    _id = ObjectIdField()
    user_id = serializers.CharField()
    user_name = serializers.CharField()
    movie_id = serializers.IntegerField()
    movie_name = serializers.CharField()
    score = serializers.FloatField()
    overall = serializers.CharField()
    subject = serializers.CharField()
    comment = serializers.CharField()
