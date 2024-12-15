from django.db import models
from sections.models import Section



class Task(models.Model):
    FINISHED = 'finished'
    IN_PROGRESS = 'in_progress'
    TO_DO ='to_do'

    STATUS_CHOICES = [
    (FINISHED,'Finished'),
    (IN_PROGRESS,'In_progress'),
    (TO_DO,'To_do'),
]
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=300)
    description = models.CharField(max_length=1500)
    status =models.CharField(max_length=12,choices=STATUS_CHOICES,default=TO_DO)
    section = models.ForeignKey(Section, related_name='tasks', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
