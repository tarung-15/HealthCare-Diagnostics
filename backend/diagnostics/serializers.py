from rest_framework import serializers

class ImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField()

from rest_framework import serializers

class HeartDiseaseSerializer(serializers.Serializer):
    age = serializers.FloatField()
    sex = serializers.IntegerField()
    cp = serializers.IntegerField()
    trestbps = serializers.FloatField()
    chol = serializers.FloatField()
    fbs = serializers.IntegerField()
    restecg = serializers.IntegerField()
    thalach = serializers.FloatField()
    exang = serializers.IntegerField()
    oldpeak = serializers.FloatField()
    slope = serializers.IntegerField()
    ca = serializers.IntegerField()
    thal = serializers.IntegerField()
