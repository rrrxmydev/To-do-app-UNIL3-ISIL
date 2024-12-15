from django.db import models
from users.models import User

class Board(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_boards')  
    members = models.ManyToManyField(User, blank=True, related_name='member_boards')        
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
class BoardInvitation(models.Model):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    DECLINED = 'declined'

    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (ACCEPTED, 'Accepted'),
        (DECLINED, 'Declined'),
    ]

    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name='invitations')  
    inviter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_invitations')
    invitee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_invitations')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=PENDING)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Invitation from {self.inviter} to {self.invitee} for board {self.board}"

