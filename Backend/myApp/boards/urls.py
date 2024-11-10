from django.urls import path
from .views import CreateListBoardView
urlpatterns = [
    path('create/',CreateListBoardView.as_view(),name='create board'),
    path('get/',CreateListBoardView.as_view(),name='liste baords')
]