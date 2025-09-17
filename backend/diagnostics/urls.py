from django.urls import path
from .views import (
    PneumoniaPredictView,
    RetinopathyPredictionView,
    HeartDiseasePredictView,
    RegisterView,
    CustomTokenObtainPairView
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # Prediction endpoints
    path('predict/pneumonia/', PneumoniaPredictView.as_view(), name='predict_pneumonia'),
    path('predict/heart/', HeartDiseasePredictView.as_view(), name='predict_heart'),
    path('predict/retinopathy/', RetinopathyPredictionView.as_view(), name='retinopathy_prediction'),  # Retinopathy Prediction API
    # Auth endpoints
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),     # Token obtain for authentication
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh token for re-authentication

    path('register/', RegisterView.as_view(), name='register'),  # Register a new user
]
