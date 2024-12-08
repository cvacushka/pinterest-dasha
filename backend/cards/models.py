from django.db import models


# Create your models here.
class Cards(models.Model):
    title = models.CharField(verbose_name="title", max_length=150)
    url = models.URLField(verbose_name="url")
