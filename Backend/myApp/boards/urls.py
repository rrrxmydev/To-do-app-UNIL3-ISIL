from django.urls import path
from .views import CreateListBoardView,SendInvitationView,AcceptInvitationView,DeclineInvitationView,ListInvitationView,DeleteBoardView,RenameBoardView
urlpatterns = [
    path('create/',CreateListBoardView.as_view(),name='create board'),
    path('get/',CreateListBoardView.as_view(),name='liste baords'),
    path('delete/<int:board_id>/',DeleteBoardView.as_view(),name="delete-baord"),
    path('rename/<int:board_id>/',RenameBoardView.as_view(),name="rename-board-title"),
    path('invitation/accept/<int:invitation_id>/',AcceptInvitationView.as_view(),name='accept-anvitation'),
    path('invitation/decline/<int:invitation_id>/',DeclineInvitationView.as_view(),name='decline-anvitation'),
    path('<int:board_id>/invite/',SendInvitationView.as_view(),name="send-invitation"),
    path('invitations/',ListInvitationView.as_view(),name='list-invitations')
]