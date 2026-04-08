from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Website
from .serializers import WebsiteSerializer


class WebsiteViewSet(viewsets.ModelViewSet):
    """
    Full CRUD for saved websites.
    Every queryset is filtered to request.user — users never see each other's data.
    """
    serializer_class = WebsiteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Website.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
