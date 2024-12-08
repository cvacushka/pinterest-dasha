from django.urls import path
from cards.views import CardCreateListView, CardDetailView

app_name = 'cards'

urlpatterns = [
    path('', CardCreateListView.as_view(), name="list"),
    path('<int:pk>/', CardDetailView.as_view(), name="detail"),
]