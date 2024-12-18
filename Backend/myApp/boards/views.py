from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Board,BoardInvitation
from django.shortcuts import get_object_or_404
from users.permissions import IsEmailVerified
from .serializers import BoardSerializer,BoardInvitationSerializer

class CreateListBoardView(APIView):
    permission_classes = [IsEmailVerified]
    
    def post(self, request):
        serializer = BoardSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            board = serializer.save()
            return Response(BoardSerializer(board).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        owned_boards = Board.objects.filter(owner=request.user).prefetch_related('sections__tasks')
        joined_boards = Board.objects.filter(members=request.user).exclude(owner=request.user).prefetch_related('sections__tasks')
        

        if owned_boards or joined_boards:
            owned_serializer = BoardSerializer(owned_boards, many=True)
            joined_serializer = BoardSerializer(joined_boards, many=True)
            return Response({
                "message": "success",
                "owned_boards": {
                    "number_of_boards": len(owned_serializer.data),
                    "data": owned_serializer.data
                },
                "joined_boards": {
                    "number_of_boards": len(joined_serializer.data),
                    "data": joined_serializer.data
                }
            }, status=status.HTTP_200_OK)
        
        return Response({"message": "this user doesn't have any boards"}, status=status.HTTP_404_NOT_FOUND)

class DeleteBoardView(APIView):
    permission_classes = [IsEmailVerified]
    def delete(self, request, board_id):
        
        board = get_object_or_404(Board, id=board_id)

        
        if board.owner != request.user:
            return Response(
                {"message": "You do not have permission to delete this board."},
                status=status.HTTP_403_FORBIDDEN,
            )

        
        board.delete()
        return Response({"message": "Board deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

class RenameBoardView(APIView):
    permission_classes = [IsEmailVerified]
    def put(self, request, board_id):
        
        board = get_object_or_404(Board, id=board_id)

        
        if board.owner != request.user:
            return Response(
                {"message": "You do not have permission to rename this board."},
                status=status.HTTP_403_FORBIDDEN,
            )

        
        new_title = request.data.get("title")
        if not new_title:
            return Response(
                {"message": "The new title is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        
        board.title = new_title
        board.save()

        return Response(
            {"message": "Board renamed successfully.", "new_title": board.title},
            status=status.HTTP_200_OK,
        )

class AcceptInvitationView(APIView):
    permission_classes = [IsEmailVerified]

    def post(self,request,invitation_id):

        invitation = BoardInvitation.objects.get(id = invitation_id)


        if not (invitation.invitee.email == request.user.email):
            return Response({
                "message":"you can't do this action since you are not the invitee"
            },status=status.HTTP_400_BAD_REQUEST)
        
        if invitation.status != BoardInvitation.PENDING:
            return Response({"message":"Invitation is no longer pending !"},status=status.HTTP_400_BAD_REQUEST)
        
        board = invitation.board
        board.members.add(request.user)

        invitation.status = BoardInvitation.ACCEPTED

        invitation.save()
        return Response({
            "message": "You have successfully joined the board."
        }, status=status.HTTP_200_OK)

class DeclineInvitationView(APIView):
    def post(self,request,invitation_id):
        invitation = BoardInvitation.objects.get(id = invitation_id)

        if  invitation.invitee.email != request.user.email:
            return Response({
                "message":"you can't perform this action since you are not the invitee"
            },status=status.HTTP_400_BAD_REQUEST)

        if invitation.status != BoardInvitation.PENDING:
            return Response({"message":"Invitation is no longer pending !"},status=status.HTTP_400_BAD_REQUEST)
        
        invitation.status = BoardInvitation.DECLINED
        invitation.save()

        return Response({
            "message": "You have declined the invitation."
        }, status=status.HTTP_200_OK)

class SendInvitationView(APIView):
    permission_classes = [IsEmailVerified]

    def post(self, request, **kwargs):
        board_id = kwargs.get('board_id')

        
        try:
            board = Board.objects.get(id=board_id)
        except Board.DoesNotExist:
            return Response({"message": "Board not found"}, status=status.HTTP_404_NOT_FOUND)

        
        serializer = BoardInvitationSerializer(
            data=request.data,
            context={"board": board, "inviter": request.user}
        )

        
        if serializer.is_valid():
            invitation = serializer.save()
            return Response(
                {
                    "message": "Invitation sent successfully!",
                    "invitation": BoardInvitationSerializer(invitation).data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ListInvitationView(APIView):
    permission_classes = [IsEmailVerified]

    def get(self, request):
        invitations = BoardInvitation.objects.filter(invitee=request.user)    
        serializer = BoardInvitationSerializer(invitations, many=True)
        if invitations.exists():
            return Response({
                "message": "invitations found",
                "invitations": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "message": "there are no invitations"
        }, status=status.HTTP_404_NOT_FOUND)





