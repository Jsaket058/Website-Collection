"""Google OAuth ID token verification."""
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from django.conf import settings


def verify_google_token(token: str) -> dict:
    """
    Verify a Google ID token and return its payload.

    Raises ValueError if the token is invalid or the audience does not match.
    """
    return id_token.verify_oauth2_token(
        token,
        google_requests.Request(),
        settings.GOOGLE_CLIENT_ID,
    )
