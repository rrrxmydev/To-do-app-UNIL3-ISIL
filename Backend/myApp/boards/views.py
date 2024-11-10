from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Board
from users.permissions import IsEmailVerified
from .serializers import BoardSerializer

class CreateListBoardView(APIView):
    permission_classes = [IsEmailVerified]
    
    def post(self, request):
        serializer = BoardSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            board = serializer.save()
            return Response(BoardSerializer(board).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self,request):
        owned_boards = Board.objects.filter(owner = request.user)
        joined_boards = Board.objects.filter(members = request.user).exclude(owner=request.user)

        if owned_boards:
            serializer = BoardSerializer(owned_boards,many=True)
            serializer2 = BoardSerializer(joined_boards,many=True)
            return Response({
                "message":"succuss",
                "owned_boards":{
                    "number_of_boards":len(serializer.data),
                    "data":serializer.data
                },
                "joined_boards":{
                    "number_of_boards":len(serializer2.data),
                    "data":serializer2.data
                }
            },status=status.HTTP_200_OK)
        return Response({"message":"this user don't have any boards"},status=status.HTTP_404_NOT_FOUND)



# class AddNewMemberView(APIView):

