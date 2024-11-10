from django.db import models
from django.contrib.auth.models import AbstractUser
import pyotp

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255,blank=False)
    last_name = models.CharField(max_length=255,blank=False)
    otp_secrete = models.CharField(max_length=6,default=pyotp.random_base32)
    is_email_verified = models.BooleanField(default = False)

    def generate_totp_token(self):
        totp = pyotp.TOTP(self.otp_secrete)
        return totp.now()
    
    def verify_totp_token(self,token):
        totp = pyotp.TOTP(self.otp_secrete)
        return totp.verify(token,valid_window=1)
    


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []