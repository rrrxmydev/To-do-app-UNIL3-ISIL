# serializers.py
from rest_framework import serializers
from .models import Board,BoardInvitation
from users.models import User
from sections.serializers import SectionSerializer
from tasks.serializers import TasksSerializer

class BoardSerializer(serializers.ModelSerializer):
    members = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='email', many=True, required=False)
    sections = SectionSerializer(many=True,read_only=True)
    tasks = TasksSerializer(many=True,read_only=True)
    class Meta:
        model = Board
        fields =['id', 'title', 'members','sections','tasks','created_at']
        read_only_fields = ['id', 'created_at']
    
    def create(self, validated_data):
        
        owner = self.context['request'].user
        members = validated_data.pop('members', [])

        board = Board.objects.create(owner=owner, **validated_data)
        board.save()

        
        if members:
            board.members.add(*members) 

        return board
    

class BoardInvitationSerializer(serializers.ModelSerializer):
    board_title = serializers.CharField(source='board.title', read_only=True)
    inviter_email = serializers.EmailField(source='inviter.email', read_only=True)
    invitee_email = serializers.EmailField(write_only=True)

    class Meta:
        model = BoardInvitation
        fields = ['id', 'board_title', 'inviter_email', 'invitee_email', 'status']
        read_only_fields = ['id', 'board_title', 'inviter_email', 'status']

    def validate(self, data):
        board = self.context['board']  
        inviter = self.context['inviter'] 
        invitee_email = data.get('invitee_email')

       
        try:
            invitee = User.objects.get(email=invitee_email)
        except User.DoesNotExist:
            raise serializers.ValidationError({"invitee_email": "Invitee user not found."})

        
        if board.owner != inviter:
            raise serializers.ValidationError("Only the board owner can invite users.")

        
        if invitee == inviter:
            raise serializers.ValidationError("You cannot invite yourself.")

        
        if board.members.filter(email=invitee.email).exists():
            raise serializers.ValidationError("The invitee is already a member of the board.")

        
        if BoardInvitation.objects.filter(board=board, invitee=invitee, status='pending').exists():
            raise serializers.ValidationError("An invitation is already pending for this user.")

        
        data['invitee'] = invitee
        return data

    def create(self, validated_data):
        board = self.context['board']
        inviter = self.context['inviter']
        invitee = validated_data['invitee']

        
        return BoardInvitation.objects.create(board=board, inviter=inviter, invitee=invitee)







