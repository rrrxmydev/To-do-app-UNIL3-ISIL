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
        # Get the owner from the request context
        owner = self.context['request'].user
        members = validated_data.pop('members', [])

        # Create the Board instance (without saving it yet)
        board = Board.objects.create(owner=owner, **validated_data)

        # Save the board first before adding members
        board.save()

        # Add members to the board's members relationship
        if members:
            board.members.add(*members)  # Use * to unpack the list of user instances

        return board

class BoardInvitationSerializer(serializers.ModelSerializer):
    invitee_email = serializers.EmailField(write_only=True)  # Add this for input
    invitee = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = BoardInvitation
        fields = ['id', 'board', 'inviter', 'invitee', 'invitee_email', 'status']
        read_only_fields = ['id', 'status', 'board', 'inviter', 'invitee']

    def validate(self, data):
        board = self.context['board']  # Get board from context
        inviter = self.context['inviter']  # Get inviter from context
        invitee_email = data.get('invitee_email')

        try:
            invitee = User.objects.get(email=invitee_email)
        except User.DoesNotExist:
            raise serializers.ValidationError({"invitee_email": "Invitee user not found."})

        # Ensure only the board owner can invite users
        if board.owner != inviter:
            raise serializers.ValidationError("Only the board owner can invite users.")

        # Prevent inviter from inviting themselves
        if invitee == inviter:
            raise serializers.ValidationError("You cannot invite yourself.")

        # Check if the invitee is already a member of the board
        if board.members.filter(email=invitee.email).exists():
            raise serializers.ValidationError("The invitee is already a member of the board.")

        # Check if an invitation already exists
        if BoardInvitation.objects.filter(board=board, invitee=invitee, status='pending').exists():
            raise serializers.ValidationError("An invitation is already pending for this user.")

        data['invitee'] = invitee  # Add the invitee object to the data
        return data

    def create(self, validated_data):
        board = self.context['board']
        inviter = self.context['inviter']
        invitee = validated_data['invitee']
        return BoardInvitation.objects.create(board=board, inviter=inviter, invitee=invitee)





