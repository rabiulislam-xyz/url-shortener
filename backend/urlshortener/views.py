from django.db.models import F
from django.http import HttpResponseRedirect
from rest_framework import generics
from rest_framework.views import APIView

from project.settings import env
from urlshortener.models import ShortURL
from urlshortener.serializers import ShortURLSerializer


class ShortURLListView(generics.ListCreateAPIView):
    queryset = ShortURL.objects.all()
    serializer_class = ShortURLSerializer


class ShortURLRedirectView(APIView):
    def get(self, request, shortcode, *args, **kwargs):
        try:
            shorturl = ShortURL.objects.get(shortcode=shortcode)
            shorturl.hits = F('hits') + 1
            shorturl.save(update_fields=['hits'])
            return HttpResponseRedirect(shorturl.target_url)

        except ShortURL.DoesNotExist:
            pass

        # redirect to home page instead of raising 404
        return HttpResponseRedirect(env.str("FRONTEND_URL", default='http://localhost:3000'))
