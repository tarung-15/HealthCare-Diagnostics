from django.http import JsonResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
import numpy as np
from .model_utils import pneumonia_model, retinopathy_model, heart_model
from django.http import JsonResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
from .model_utils import pneumonia_model, retinopathy_model, heart_model
from django.http import JsonResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
from .model_utils import pneumonia_model, retinopathy_model, heart_model
from PIL import Image
import pandas as pd
import joblib
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
import logging
import traceback

# -------------------- Serializers --------------------

class ImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField()

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


# -------------------- Pneumonia API --------------------

class PneumoniaPredictView(APIView):
    parser_classes = [MultiPartParser]

    def get(self, request):
        serializer = ImageUploadSerializer()
        return Response(serializer.data)

    def post(self, request):
        serializer = ImageUploadSerializer(data=request.data)
        if serializer.is_valid():
            image = serializer.validated_data['image']
            result = pneumonia_model.predict_pneumonia(image)
            return Response({'result': result})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


##HEART
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import joblib
import numpy as np
import pandas as pd
import os

class HeartDiseasePredictView(APIView):
    def post(self, request):
        try:
            input_data = request.data
            print("Received input data:", input_data)

            expected_fields = [
                'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs',
                'restecg', 'thalach', 'exang', 'oldpeak',
                'slope', 'ca', 'thal'
            ]

            # Check for missing fields
            missing_fields = [field for field in expected_fields if field not in input_data]
            if missing_fields:
                error_message = f"Missing fields: {', '.join(missing_fields)}"
                print(error_message)
                return Response({"result": f"❌ Prediction failed. {error_message}"}, status=400)

            # Prepare input DataFrame
            data = {field: [float(input_data[field])] for field in expected_fields}
            df = pd.DataFrame(data)
            print("Formatted input DataFrame:\n", df)

            # Load model
            model_path = os.path.join(os.path.dirname(__file__), '..', 'ml_models', 'heart_model.pkl')
            model_path = os.path.abspath(model_path)
            print("Model path:", model_path)

            if not os.path.exists(model_path):
                print("Model file not found at:", model_path)
                return Response({"result": "❌ Model file not found."}, status=500)

            model = joblib.load(model_path)

            # Predict
            prediction = model.predict(df)[0]
            probability = model.predict_proba(df)[0][int(prediction)] * 100
            print(f"Prediction: {prediction}, Probability: {probability:.2f}%")

            # Format result
            if prediction == 1:
                result = f"High risk - ({probability:.2f}%) chance that you have heart disease"
            else:
                result = f"Low risk - ({probability:.2f}%) chance that you do NOT have heart disease"

            return Response({"result": result})

        except Exception as e:
            print(" Prediction error:", str(e))
            return Response({
                "result": " Prediction failed or incomplete data."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# -------------------- Optional Function-Based Views --------------------



from PIL import Image
@api_view(['POST'])
def pneumonia_api_view(request):
    image = request.FILES.get('image')
    
    if image is None:
        return Response({'error': 'No image provided'}, status=400)

    try:
        pil_image = Image.open(image).convert("RGB")  
        result = predict_pneumonia(pil_image)         
        return Response({'result': result})
    except Exception as e:
        return Response({'error': str(e)}, status=500)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# -------- Signup View --------
class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        User.objects.create_user(username=username, email=email, password=password)
        return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)


# -------- Login View (Customized Token Response) --------
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username  # Extra field in response
        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer




# diagnostics/views.py

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from diagnostics.model_utils.retinopathy_model import predict_retinopathy
import logging, traceback
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .model_utils.retinopathy_model import predict_retinopathy

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

class RetinopathyPredictionView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        try:
            logger.info(f"Received request.data: {request.data}")
            logger.info(f"Received request.FILES: {request.FILES}")

            image = request.FILES.get('image')
            if not image:
                logger.warning("No image received in request.FILES")
                return Response({"error": "No image provided"}, status=400)

            logger.info(f"File name: {image.name}, size: {image.size}, type: {image.content_type}")

            # Run prediction
            result = predict_retinopathy(image)

            if "error" in result:
                logger.error(f"Prediction error: {result['error']}")
                return Response(result, status=400)

            return Response(result, status=200)

        except Exception as e:
            tb = traceback.format_exc()
            logger.error(f"Exception in RetinopathyPredictionView:\n{tb}")
            return Response({"error": str(e)}, status=500)

