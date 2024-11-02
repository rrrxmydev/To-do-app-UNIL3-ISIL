from rest_framework import serializers
from .models import User
from django.utils.translation import gettext_lazy as _



class UserSerializer(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields = ['email','id','password','password_confirmation','first_name','last_name']
        extra_kwargs = {
            'password': {'write_only': True},
            'password_confirmation': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError({"password": "Passwords do not match."})

        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "A user with this email already exists."})
        return data
    
    def create(self,validated_data):
        validated_data.pop('password_confirmation')

        user = User(**validated_data) #**validated_data means remaining data

        user.set_password(validated_data['password'])
        user.save()

        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        # Check if the email exists
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({"email": _("This email is not registered.")})

        # Check if the password is correct
        if not user.check_password(password):
            raise serializers.ValidationError({"password": _("Incorrect password.")})

        # Both email and password are correct
        data["user"] = user
        return data

    
        

