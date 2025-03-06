from django.urls import path
from .views import (ProductView, OrderView, CategoryView,
                    OrderDetailView, InfoCustomerView, InventoryMovementView,
                    OrdersView, ProductsView, CategoriesView, OrderDetailsView,
                    InfoCustomersView, InventoryMovementsView)


urlpatterns = [
    path('products/', ProductsView.as_view(), name='product-list-create'),
    path('orders/', OrdersView.as_view(), name='order-list-create'),
    path('categories/', CategoriesView.as_view(), name='category-list-create'),
    path('order_details/', OrderDetailsView.as_view(),
         name='order-list-create'),
    path('customers/', InfoCustomersView.as_view(),
         name='customer-list-create'),
    path('inventory_movements/', InventoryMovementsView.as_view(),
         name='inventory-movement-list-create'),

    path('products/<int:pk>/', ProductView.as_view(),
         name='product-retrieve-update-destroy'),
    path('orders/<int:pk>/', OrderView.as_view(),
         name='order-retrieve-update-destroy'),
    path('categories/<int:pk>/', CategoryView.as_view(),
         name='category-retrieve-update-destroy'),
    path('order_details/<int:pk>/', OrderDetailView.as_view(),
         name='order-retrieve-update-destroy'),
    path('customers/<int:pk>/', InfoCustomerView.as_view(),
         name='customer-retrieve-update-destroy'),
    path('inventory_movements/<int:pk>/', InventoryMovementView.as_view(),
         name='inventory-movement-retrieve-update-destroy'),
]
