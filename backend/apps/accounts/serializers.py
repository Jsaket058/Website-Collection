from rest_framework import serializers
from django.contrib.auth.models import User


class GoogleAuthSerializer(serializers.Serializer):
    """Accepts the Google credential (ID token) from the frontend."""
    credential = serializers.CharField()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "first_name", "last_name")
