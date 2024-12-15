from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .permissions import CanEdit
from .models import Section
from rest_framework import status
from .serializers import SectionSerializer
from django.shortcuts import get_object_or_404

class CreateSectionAPIView(APIView):
    def post(self,request):
        serializer = SectionSerializer(data = request.data)

        if serializer.is_valid():
            section = serializer.save()
            return Response({
                "message":"success",
                "sections":SectionSerializer(section).data
            },status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class RenameSectionAPIView(APIView):
    permission_classes = [CanEdit]
    def put(self,request,section_id):
        section = get_object_or_404(Section,id=section_id)
        if request.data.get('title'):
            section.title = request.data.get('title');
        else:
            return Response({"message":"please enter the new title"},status=status.HTTP_400_BAD_REQUEST)
        section.save()
        return Response({"message":"title updated succussfully","new_title":section.title},status=status.HTTP_200_OK)
        
class DeleteSectionAPIView(APIView):
    permission_classes = [CanEdit]
    def delete(self,request,section_id):
        section = get_object_or_404(Section,id = section_id)
        section.delete()
        return Response({"message":"section deleted succussfully"},status= status.HTTP_204_NO_CONTENT)
