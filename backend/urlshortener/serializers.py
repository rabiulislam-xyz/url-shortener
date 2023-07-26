from rest_framework import serializers

from urlshortener.models import ShortURL


class ShortURLSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortURL
        fields = ('shortcode', 'target_url', 'hits', 'created_at')
        read_only_fields = ('shortcode', 'hits', 'created_at')

    def create(self, validated_data):
        return ShortURL.create(target_url=validated_data['target_url'])
