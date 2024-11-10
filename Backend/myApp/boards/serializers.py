# serializers.py
from rest_framework import serializers
from .models import Board
from users.models import User

class BoardSerializer(serializers.ModelSerializer):
    members = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='email', many=True, required=False)

    class Meta:
        model = Board
        fields =['id', 'title', 'members', 'created_at']
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
