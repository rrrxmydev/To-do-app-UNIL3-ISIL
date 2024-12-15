from rest_framework import status
from rest_framework.response import Response
from .serializers import TasksSerializer
from .permissions import CanEdit,CanEditTask
from rest_framework.views import APIView
from .models import Task
from django.shortcuts import get_object_or_404

class CreateTaskView(APIView):
    permission_classes = [CanEdit]

    def post(self,request):
        serializer = TasksSerializer(data = request.data)

        if serializer.is_valid():
            task = serializer.save()
            return Response({
                "message":"task created succussfuly",
                "task":TasksSerializer(task).data
            },status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class UpdateTaskView(APIView):
    permission_classes = [CanEditTask]

    def put(self,request,task_id):
        task = get_object_or_404(Task,id = task_id)
        
        if not request.data.get('title') and not request.data.get('description'):
            return Response({"message":"you need to pass data to updated"},status=status.HTTP_400_BAD_REQUEST)
        
        if request.data.get('title'):
            task.title = request.data.get('title')
        if request.data.get('description'):
            task.description = request.data.get('description')

        task.save()

        return Response(
            {
                "message":"task updated succussfully",
                "task":TasksSerializer(task).data
            },
            status=status.HTTP_200_OK
        )

class SetStatusView(APIView):
    permission_classes = [CanEditTask]
    def post(self,request,task_status,task_id):
        if task_status == 'finished':
            set_status = Task.FINISHED
        elif task_status == 'in-progress':
            set_status = Task.IN_PROGRESS
        elif task_status == 'to-do':
            set_status = Task.TO_DO
        else :
            return Response({"error":"please enter the right status"},status=status.HTTP_404_NOT_FOUND)

        task = get_object_or_404(Task,id=task_id)

        if task.status == set_status:
            return Response({"message":f"task already set to {set_status} "},status = status.HTTP_400_BAD_REQUEST)
        task.status = set_status
        task.save()

        return Response({
            "message":f"task set to {set_status}"
        },status=status.HTTP_200_OK)


class DeleteTaskView(APIView):
    permission_classes = [CanEditTask]
    def delete(self,request,task_id):
        task = get_object_or_404(Task,id = task_id)
        task.delete()
        return Response({"message":"task deleted succussfully"},status=status.HTTP_204_NO_CONTENT)
        