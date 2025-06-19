from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet
from api.models import Delivery, Service, TypePackage, StatusDelivery,NumberModel
from rest_framework.permissions import IsAuthenticated
from api.serializers import (
    DeliverySerializers, 
    NameSerializers, 
    NumberModelSerializer,
    DeliveryCreateUpdateSerializer
)
from django.db.models import Prefetch

from .utils import sorted_groupby_data, data_deliveries, get_groupby_date_delivery



class ServiceViewSet(ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = NameSerializers


class TypePackageViewSet(ReadOnlyModelViewSet):
    queryset = TypePackage.objects.all()
    serializer_class = NameSerializers


class StatusDeliveryViewSet(ReadOnlyModelViewSet):
    queryset = StatusDelivery.objects.all()
    serializer_class = NameSerializers



class NumberModelViewSet(ReadOnlyModelViewSet):
    queryset = NumberModel.objects.select_related('name_model')
    serializer_class = NumberModelSerializer


class DeliveryModelVIewSet(ModelViewSet):
    queryset = Delivery.objects.select_related(
         'stutus_delivery', 
         'package', 
         'number_model__name_model',
           'user'
           ).prefetch_related(
                Prefetch(
                    'service', 
                    queryset=Service.objects.all(), 
                    to_attr='prefetched_services'
                    )
            )
    # permission_classes = [IsAuthenticated,]
    # serializer_class = DeliverySerializers

    def get_serializer_class(self):
        if self.action in ['create', 'update','partial_update']:
            return DeliveryCreateUpdateSerializer
        return DeliverySerializers #super().get_serializer_class()

    def create(self, request, *args, **kwargs):
        self.queryset = Delivery.objects.all()
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    

    
    
class DeliveryApiView(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self, request):
        deliveries = data_deliveries()

        data_grouped = sorted_groupby_data(deliveries=deliveries)

        line_data = get_groupby_date_delivery()
        

        return Response({"deliveries_list": data_grouped, "line_data": line_data})
    

