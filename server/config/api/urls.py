from django.urls import path
from .views import DeliveryApiView


urlpatterns = [
    path("deliveries/", DeliveryApiView.as_view()),
]
