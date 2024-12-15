from rest_framework.permissions import BasePermission
from .models import Board


class IsMember(BasePermission):
    def has_permission(self, request, view):

        board_id = view.kwargs.get('board_id')
        
        if not board_id:
            return False
        
        try:
            board = Board.objects.get(id=board_id)
            return board.members.filter(email=request.user.email).exists()
        except Board.DoesNotExist:
            return False
        
class IsOwner(BasePermission):
    def has_permission(self, request, view):
        try:
            board = Board.objects.get(id=view.kwargs.get('board_id'))
            return board.owner.email == request.user.email
        except:
            return False
        