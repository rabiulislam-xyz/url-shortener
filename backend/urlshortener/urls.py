from django.urls import path

from urlshortener import views


urlpatterns = [
    path('api/shorturls/', views.ShortURLListView.as_view(), name='shorturls'),
    path('<str:shortcode>', views.ShortURLRedirectView.as_view(), name='short_url_redirect'),
]
