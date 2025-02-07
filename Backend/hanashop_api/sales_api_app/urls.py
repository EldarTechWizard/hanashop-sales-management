from django.urls import path
from .views import ProductListByCategoryView


urlpatterns = [
    path('products/', ProductListByCategoryView.as_view(), name='product-list-create')
]
