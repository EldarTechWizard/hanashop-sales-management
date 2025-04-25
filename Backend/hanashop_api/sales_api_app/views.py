from rest_framework import generics, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import Http404
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

    def create(self, request, *args, **kwargs):
        orders = request.data.get("orders")
        customer_id = request.data.get("customer")
        total = request.data.get("total")

        if not orders or not customer_id or total is None:
            return Response(data="Datos incompletos",
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            customer = get_object_or_404(InfoCustomer, id=customer_id)
        except Http404 as e:
            return Response(data=f"Cliente no encontrado: {str(e)}",
                            status=status.HTTP_400_BAD_REQUEST)

        order = Order(
            customer=customer,
            total=total
        )

        if not request.user.is_anonymous:
            order.user = request.user

        order.save()

        order_details = []
        for item in orders:
            try:
                product = Product.objects.get(id=item["product"])
                order_details.append(OrderDetail(
                    order=order,
                    product=product,
                    quantity=item["quantity"],
                    sub_total=item["sub_total"]
                ))
            except Product.DoesNotExist:
                return Response(
                    data=f"Producto con ID {item['product']} no encontrado",
                    status=status.HTTP_400_BAD_REQUEST)

        OrderDetail.objects.bulk_create(order_details)

        return Response(data="Pedido creado correctamente",
                        status=status.HTTP_201_CREATED)


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
