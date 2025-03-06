from rest_framework import serializers
from django.contrib.auth import models as auth_models
from .models import (Product, Category, InventoryMovement,
                     Order, InfoCustomer, OrderDetail)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = auth_models.User
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class InventoryMovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryMovement
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class InfoCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = InfoCustomer
        fields = '__all__'


class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = '__all__'
