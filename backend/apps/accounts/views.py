from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import GoogleAuthSerializer, UserSerializer
from .services import verify_google_token


class GoogleAuthView(APIView):
    """
    POST /api/auth/google/
    Body: { "credential": "<Google ID token>" }
    Returns: { "access": "...", "refresh": "...", "user": {...} }
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = GoogleAuthSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            payload = verify_google_token(serializer.validated_data["credential"])
        except ValueError as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

        email = payload["email"]
        user, _ = User.objects.get_or_create(
            username=email,
            defaults={
                "email": email,
                "first_name": payload.get("given_name", ""),
                "last_name": payload.get("family_name", ""),
            },
        )

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": UserSerializer(user).data,
            },
            status=status.HTTP_200_OK,
        )


class MeView(APIView):
    """GET /api/auth/me/ — return the authenticated user's profile."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
