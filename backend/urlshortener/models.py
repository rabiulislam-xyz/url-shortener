import secrets
import string

from django.db import models, transaction, IntegrityError

CHARACTERS = string.ascii_letters + string.digits
SHORTCODE_LENGTH = 6


class ShortURL(models.Model):
    shortcode = models.CharField(max_length=20, unique=True, db_index=True)
    target_url = models.URLField()
    hits = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at', )

    def __str__(self):
        return self.shortcode

    @classmethod
    def create(cls, target_url):
        while True:
            shortcode = ''.join((secrets.choice(CHARACTERS) for _ in range(SHORTCODE_LENGTH)))
            try:
                # using transaction, so it can be used within other transactions
                # without having any issues for integrity errors
                with transaction.atomic():
                    return cls.objects.create(shortcode=shortcode, target_url=target_url)
            except IntegrityError:
                continue
