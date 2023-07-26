from django.urls import path

from urlshortener import views


urlpatterns = [
    path('short-urls/', views.ShortURLListView.as_view(), name='short_url'),
    path('<str:shortcode>', views.ShortURLRedirectView.as_view(), name='short_url_redirect'),
]
