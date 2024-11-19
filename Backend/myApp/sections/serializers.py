from rest_framework import serializers
from .models import Section
from boards.models import Board

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id','title','board']
        read_only_fields = ['id']





