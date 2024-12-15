from django.db import models
from boards.models import Board
class Section(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255)
    board = models.ForeignKey(Board, related_name='sections', on_delete=models.CASCADE)

    def __str__(self):
        return self.title;