from rest_framework.permissions import BasePermission
from boards.models import Board

class CanEdit(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated and not request.user.is_email_verified:
            return False

        board_id = view.kwargs.get('board_id')
        if not board_id and not board_id == 0:
            return False
        
        try:
            board = Board.objects.get(id=board_id)
            is_owner = board.owner == request.user
            is_member = board.members.filter(email=request.user.email).exists()
            return is_owner or is_member
        except Board.DoesNotExist:
            return False