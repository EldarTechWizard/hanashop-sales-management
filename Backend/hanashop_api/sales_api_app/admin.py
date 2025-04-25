from django.contrib import admin
from .models import (Order, OrderDetail, Product,
                     InfoCustomer, InventoryMovement, Category)

# Register your models here.
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(InfoCustomer)
admin.site.register(OrderDetail)
admin.site.register(InventoryMovement)
admin.site.register(Order)
