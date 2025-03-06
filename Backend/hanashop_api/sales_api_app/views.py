from rest_framework import generics
from .models import (Product, Category, InventoryMovement,
                     Order, InfoCustomer, OrderDetail)
from .serializers import (ProductSerializer, CategorySerializer,
                          InventoryMovementSerializer, OrderDetailSerializer,
                          InfoCustomerSerializer, OrderSerializer)


class ProductsView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CategoriesView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class InventoryMovementsView(generics.ListCreateAPIView):
    queryset = InventoryMovement.objects.all()
    serializer_class = InventoryMovementSerializer


class InventoryMovementView(generics.RetrieveUpdateDestroyAPIView):
    queryset = InventoryMovement.objects.all()
    serializer_class = InventoryMovementSerializer


class OrdersView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderDetailsView(generics.ListCreateAPIView):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer


class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer


class InfoCustomersView(generics.ListCreateAPIView):
    queryset = InfoCustomer.objects.all()
    serializer_class = InfoCustomerSerializer


class InfoCustomerView(generics.RetrieveUpdateDestroyAPIView):
    queryset = InfoCustomer.objects.all()
    serializer_class = InfoCustomerSerializer
