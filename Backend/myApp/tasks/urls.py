from django.urls import path
from .views import CreateTaskView,UpdateTaskView,SetStatusView,DeleteTaskView

urlpatterns = [
    path('create/',CreateTaskView.as_view(),name='create-task'),
    path('update/<int:task_id>/',UpdateTaskView.as_view(),name ='update-task'),
    path('update/<str:task_status>/<int:task_id>/',SetStatusView.as_view(),name='set-to-finsihed'),
    path('delete/<int:task_id>/',DeleteTaskView.as_view(),name='delet-task')
]