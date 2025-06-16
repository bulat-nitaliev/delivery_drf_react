from itertools import groupby
from operator import itemgetter
from django.db.models import QuerySet
from django.db.models import Prefetch, Count
from django.db.models.functions import TruncDate
from api.models import Delivery, Service


def data_deliveries()->QuerySet:
    return (
            Delivery.objects
            .select_related('stutus_delivery', 'package', 'number_model__name_model', 'user')
            .prefetch_related(
                Prefetch(
                    'service', 
                    queryset=Service.objects.all(), 
                    to_attr='prefetched_services'
                    )
            )
            .values(
                'id',
                'number_model__name',
                'number_model__name_model__name',
                'stutus_delivery__name',
                'package__name',
                'distance',
                'technical_condition',
                'travel_time',
                'user__username',
                'created_at',
                'service__name'
            )
        )


def get_groupby_date_delivery()->QuerySet:
    return Delivery.objects.annotate(
            date_only=TruncDate('created_at')
            ).values('date_only').annotate(
                count=Count('id')
                ).order_by('date_only')


def sorted_groupby_data(deliveries: QuerySet, data_grouped=None)->list[dict]:
    if data_grouped is None:
        data_grouped = []

    data_sorted = sorted(deliveries, key=lambda x: x['id'])
    
    for _, group in groupby(data_sorted, key=itemgetter('id')):
        
        first_item = next(group)

        new_item = dict(first_item)

        del new_item['service__name']
        services = set([first_item['service__name']])
        for i in group:
            services.add(i['service__name'])
            
        new_item['services'] = list(services)
        
        data_grouped.append(new_item)

    return data_grouped