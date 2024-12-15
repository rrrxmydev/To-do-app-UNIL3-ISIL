from rest_framework import serializers
from .models import Task

class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id','title','description','status','created_at','section']
        read_only_fields = ['id','created_at','status']
