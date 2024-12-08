from rest_framework.serializers import ModelSerializer
from cards.models import Cards


class CardSerializer(ModelSerializer):
    class Meta:
        model = Cards
        fields = ("id", "title", "url")
