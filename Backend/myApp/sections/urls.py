from django.urls import path
from .views import CreateSectionAPIView,RenameSectionAPIView

urlpatterns = [
    path('create/',CreateSectionAPIView.as_view(),name='create-section'),
    path('rename/<int:board_id>/',RenameSectionAPIView.as_view(),name='rename-section')

]