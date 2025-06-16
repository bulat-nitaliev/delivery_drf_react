from rest_framework.views import APIView
from rest_framework.response import Response

from .utils import sorted_groupby_data, data_deliveries, get_groupby_date_delivery



class DeliveryApiView(APIView):
    def get(self, request):
        deliveries = data_deliveries()

        data_grouped = sorted_groupby_data(deliveries=deliveries)

        line_data = get_groupby_date_delivery()

        return Response({"deliveries_list": data_grouped, "line_data": line_data})

