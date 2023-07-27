from django.test import TestCase

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from urlshortener.models import ShortURL


class ShortURLListViewTestCase(TestCase):
    def setUp(self):
        # Create a test client
        self.client = APIClient()

    def test_create_shorturl(self):
        # Test creating a new ShortURL
        data = {'target_url': 'https://www.example.com'}
        response = self.client.post('/api/shorturls/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ShortURL.objects.count(), 1)

    def test_list_shorturls(self):
        # Test listing all ShortURLs
        ShortURL.objects.create(shortcode='abc123', target_url='https://www.example.com')
        ShortURL.objects.create(shortcode='def456', target_url='https://www.example.org')
        response = self.client.get('/api/shorturls/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)


class ShortURLRedirectViewTestCase(TestCase):
    def setUp(self):
        # Create a test client
        self.client = APIClient()

    def test_redirect_existing_shorturl(self):
        # Test redirection for an existing ShortURL
        shorturl = ShortURL.objects.create(shortcode='abc123', target_url='https://www.example.com')
        response = self.client.get(f'/{shorturl.shortcode}')
        self.assertEqual(response.status_code, status.HTTP_302_FOUND)
        self.assertEqual(response.url, shorturl.target_url)
        

    def test_redirect_redirect_hit_counts(self):
         # Test hit counts of redirect
        shorturl = ShortURL.objects.create(shortcode='abc123', target_url='https://www.example.com')
        for _ in range(2):
            self.client.get(f'/{shorturl.shortcode}')
    
        shorturl.refresh_from_db()
        self.assertEqual(shorturl.hits, 2)
