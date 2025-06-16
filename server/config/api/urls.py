from django.urls import path
from .views import (
  DeliveryApiView, 
  DeliveryModelVIewSet, 
  ServiceViewSet, 
  TypePackageViewSet,
  StatusDeliveryViewSet,
  NumberModelViewSet
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('deliveries', DeliveryModelVIewSet, basename='deliveries')
router.register('service', ServiceViewSet,basename='service')
router.register('package', TypePackageViewSet,basename='package')
router.register('status', StatusDeliveryViewSet,basename='status')
router.register('number_model', NumberModelViewSet,basename='number_model')



urlpatterns = [
    path("deliveries_list/", DeliveryApiView.as_view()),
   
]

urlpatterns += router.urls