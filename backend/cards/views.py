from cards.models import Cards
from cards.serializers import CardSerializer
from rest_framework.generics import ListCreateAPIView, DestroyAPIView


class CardCreateListView(ListCreateAPIView):
    serializer_class = CardSerializer
    queryset = Cards.objects.all()


class CardDetailView(DestroyAPIView):
    serializer_class = CardSerializer
    queryset = Cards.objects.all()
