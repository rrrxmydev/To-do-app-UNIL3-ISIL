from django.urls import path
from .views import CreateSectionAPIView,RenameSectionAPIView,DeleteSectionAPIView

urlpatterns = [
    path('create/',CreateSectionAPIView.as_view(),name='create-section'),
    path('rename/<int:section_id>/',RenameSectionAPIView.as_view(),name='rename-section'),
    path('delete/<int:section_id>/',DeleteSectionAPIView.as_view(),name='delete-section')

]