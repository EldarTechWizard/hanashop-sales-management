import django_filters
from datetime import datetime, time
from .models import (Order, InventoryMovement)


class OrderFilter(django_filters.FilterSet):
    start_date = django_filters.DateFilter(field_name='order_date',
                                           lookup_expr='gte')
    end_date = django_filters.IsoDateTimeFilter(field_name='order_date',
                                                method='filter_end_date')

    class Meta:
        model = Order
        fields = ['start_date', 'end_date']

    def filter_end_date(self, queryset, name, value):
        end_of_day = datetime.combine(value.date(), time.max)
        return queryset.filter(**{f"{name}__lte": end_of_day})


class InventoryFilter(django_filters.FilterSet):
    start_date = django_filters.DateFilter(field_name='movement_date',
                                           lookup_expr='gte')
    end_date = django_filters.IsoDateTimeFilter(field_name='movement_date',
                                                method='filter_end_date')

    class Meta:
        model = InventoryMovement
        fields = ['start_date', 'end_date']

    def filter_end_date(self, queryset, name, value):
        end_of_day = datetime.combine(value.date(), time.max)
        return queryset.filter(**{f"{name}__lte": end_of_day})
