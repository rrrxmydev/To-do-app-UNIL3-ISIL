from rest_framework import serializers
from .models import Section
from boards.models import Board
from tasks.serializers import TasksSerializer
class SectionSerializer(serializers.ModelSerializer):
    tasks = TasksSerializer(many=True,read_only=True)
    class Meta:
        model = Section
        fields = ['id','title','board','tasks']
        read_only_fields = ['id']





