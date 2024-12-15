from rest_framework.permissions import BasePermission
from boards.models import Board
from .models import Section
from django.shortcuts import get_object_or_404

class CanEdit(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if not request.user.is_email_verified:
            return False
        
        section = get_object_or_404(Section,id = view.kwargs.get('section_id'))
        board = get_object_or_404(Board,id=section.board.id)
        is_owner = board.owner == request.user
        is_member = board.members.filter(email=request.user.email).exists()
        return is_owner or is_member