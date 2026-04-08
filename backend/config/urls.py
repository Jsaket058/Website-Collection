from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    # Auth: Google sign-in + JWT refresh + current user
    path("api/auth/", include("apps.accounts.urls")),
    # Websites CRUD
    path("api/", include("apps.websites.urls")),
]
