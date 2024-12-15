from rest_framework.permissions import BasePermission
from sections.models import Section
from django.shortcuts import get_object_or_404
from .models import Task

class CanEdit(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if not request.user.is_email_verified:
            return False

        section_id = request.data['section']
        print(section_id)
        if not section_id and not section_id == 0:
            return False
        
        try:
            section = Section.objects.get(id=section_id)
            board = section.board
            is_owner = board.owner == request.user
            is_member = board.members.filter(email=request.user.email).exists()
            return is_owner or is_member
        except Section.DoesNotExist:
            return False
        
class CanEditTask(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if not request.user.is_email_verified:
            return False

        task = get_object_or_404(Task,id = view.kwargs.get('task_id'))
        board = task.section.board
        is_owner = board.owner == request.user
        is_member = board.members.filter(email=request.user.email).exists()
        return is_owner or is_member

