from django.conf import settings
from django.db import transaction
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import Http404
from .models import (Product, Category, InventoryMovement,
                     Order, InfoCustomer, OrderDetail)
from .serializers import (ProductSerializer, CategorySerializer,
                          InventoryMovementSerializer, OrderDetailSerializer,
                          InfoCustomerSerializer, OrderSerializer,
                          ImageUploadSerializer)


class ImageUploadView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ImageUploadSerializer(data=request.data)
        if serializer.is_valid():
            image = serializer.validated_data['image']
            # Guardar la imagen manualmente
            from django.core.files.storage import default_storage
            path = default_storage.save(f"images/{image.name}", image)
            image_url = request.build_absolute_uri(settings.MEDIA_URL + path)
            return Response({"url": image_url}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductsView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['name', 'description']

    def get_queryset(self):
        return Product.objects.filter(status=True)


class ProductView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_destroy(self, instance):
        instance.status = False
        instance.save()


class CategoriesView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        return Category.objects.filter(status=True)


class CategoryView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def perform_destroy(self, instance):
        instance.status = False
        instance.save()


class InventoryMovementsView(generics.ListCreateAPIView):
    queryset = InventoryMovement.objects.all()
    serializer_class = InventoryMovementSerializer

    def get_queryset(self):
        return InventoryMovement.objects.filter(status=True)


class InventoryMovementView(generics.RetrieveUpdateDestroyAPIView):
    queryset = InventoryMovement.objects.all()
    serializer_class = InventoryMovementSerializer

    def perform_destroy(self, instance):
        instance.status = False
        instance.save()


class OrdersView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(status=True)

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

        try:
            with transaction.atomic():
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
                        raise ValueError(
                            f"Producto con ID {item['product']} no encontrado"
                        )

                OrderDetail.objects.bulk_create(order_details)

                for detail in order_details:
                    InventoryMovement.objects.create(
                        product=detail.product,
                        movement_type='OUT',
                        quantity=detail.quantity,
                        reference=f"Orden #{order.id} creada",
                    )

        except ValueError as e:
            return Response(data=str(e),
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(data=f"Error al crear el pedido: {str(e)}",
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(data="Pedido creado correctamente",
                        status=status.HTTP_201_CREATED)


class OrderView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def perform_destroy(self, instance):
        instance.status = False
        instance.save()


class OrderDetailsView(generics.ListCreateAPIView):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer


class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer

    def perform_destroy(self, instance):
        instance.status = False
        instance.save()


class InfoCustomersView(generics.ListCreateAPIView):
    queryset = InfoCustomer.objects.all()
    serializer_class = InfoCustomerSerializer

    def get_queryset(self):
        return InfoCustomer.objects.filter(status=True)


class InfoCustomerView(generics.RetrieveUpdateDestroyAPIView):
    queryset = InfoCustomer.objects.all()
    serializer_class = InfoCustomerSerializer

    def perform_destroy(self, instance):
        instance.status = False
        instance.save()
