from django.urls import path
from .views import RegisterView,LoginAPIView,LogoutAPIView,GenerateOTPView, VerifyOTPView,UpdateUserView


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),  
    path('login/',LoginAPIView.as_view(),name="login"),
    path('logout/',LogoutAPIView.as_view(),name="logout"),
    path('generate-otp/',GenerateOTPView.as_view(),name="generate-otp"),
    path('verify-otp/',VerifyOTPView.as_view(),name="verify-otp"),
    path('update-user/',UpdateUserView.as_view(),name='update-user')

]