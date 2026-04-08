from rest_framework import serializers
from .models import Website


class WebsiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Website
        fields = ("id", "url", "title", "description", "created_at", "updated_at")
        read_only_fields = ("id", "created_at", "updated_at")
