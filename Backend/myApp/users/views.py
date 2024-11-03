from rest_framework.views import APIView
from .serializers import UserSerializer,LoginSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.contrib.auth import authenticate
from django.core.mail import send_mail


#============Register View===============
class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            token,created = Token.objects.get_or_create(user=user)

            return Response(
                {"message": "User registered successfully.", "token": token.key},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

#============Login View===============
class LoginAPIView(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        data = request.data
        serializer = LoginSerializer(data = data)

        if not serializer.is_valid():
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)   
        
        email = data['email']
        password = data['password']

        user_obj = authenticate(email=email , password=password)

        if user_obj:
            token,_ = Token.objects.get_or_create(user=user_obj)
            return Response({
                "message":"valid credentials",
                "token":token.key
            },status=status.HTTP_200_OK)

        return Response({
            "message":"Invalid Credentials"
        },status=status.HTTP_400_BAD_REQUEST)
    
class LogoutAPIView(APIView):
#============Logout View===============
    permission_classes = [IsAuthenticated]

    def post(self,request):
        try:
            token = Token.objects.get(user = request.user)
            token.delete()
            return Response({
                "message":"Successfully logged out"
            },status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({"message":"error : Token does not exist"},status = status.HTTP_400_BAD_REQUEST)
        

#============Generate OTP View===============
class GenerateOTPView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        user = request.user
        otp = user.generate_totp_token()

        send_mail(
            'OTP Code',
            f'Hello {user.first_name} this is your OTP code {otp}',
            'sandbox.smtp.mailtrap.io',
            [user.email],
            fail_silently=False,
        )

        return Response({"message":"OTP sent successfully."},status=status.HTTP_200_OK)
    
#============Verify OTP View===============
class VerifyOTPView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        user = request.user
        otp_code = request.data.get("otp_code")

        if not otp_code:
            return Response({"message":"otp_code field is required"},status=status.HTTP_400_BAD_REQUEST)
        print(user.verify_totp_token(otp_code))
        if user.verify_totp_token(otp_code):
            user.is_email_verified = True
            user.save()
            return Response({"message":"Email verified successfully."},status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid or expired OTP."}, status=status.HTTP_400_BAD_REQUEST)
        
        



        
    



