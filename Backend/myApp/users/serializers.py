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

        user = User(**validated_data) 

        user.set_password(validated_data['password'])
        user.save()

        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({"email": _("This email is not registered.")})

        
        if not user.check_password(password):
            raise serializers.ValidationError({"password": _("Incorrect password.")})

        
        data["user"] = user
        return data

class UpdateUserSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_email = serializers.EmailField(required=False)
    new_password = serializers.CharField(required=False, write_only=True)

    def validate(self,data):
        user = self.context['request'].user

        old_password = data.get('old_password')
        new_email = data.get('new_email')
        new_password = data.get('new_password')

        if new_email or new_password:
            
            if not user.check_password(old_password):
                raise serializers.ValidationError({"password": _("Incorrect password.")})
        else:
            raise serializers.ValidationError({"Error":"You must provide either new_email or new_password to update."})
        
        return data
        




    
        

