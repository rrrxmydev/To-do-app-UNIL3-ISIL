from django.db import models
from users.models import User

class Board(models.Model):
    id = models.BigAutoField(primary_key=True,default=0)
    title = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_boards')  
    members = models.ManyToManyField(User, blank=True, related_name='member_boards')        
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
