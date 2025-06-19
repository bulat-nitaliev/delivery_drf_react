from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet
from api.models import Delivery, Service, TypePackage, StatusDelivery,NumberModel
from rest_framework.permissions import IsAuthenticated
from api.serializers import DeliverySerializers, NameSerializers, NumberModelSerializer
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
    serializer_class = DeliverySerializers


    
    # permission_classes = [IsAuthenticated]
    
    
class DeliveryApiView(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self, request):
        deliveries = data_deliveries()

        data_grouped = sorted_groupby_data(deliveries=deliveries)

        line_data = get_groupby_date_delivery()
        

        return Response({"deliveries_list": data_grouped, "line_data": line_data})
    

