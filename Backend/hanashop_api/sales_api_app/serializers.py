from rest_framework import serializers
from django.contrib.auth import models as auth_models
from .models import (Product, Category, InventoryMovement,
                     Order, InfoCustomer, OrderDetail)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = auth_models.User
        fields = '__all__'


class ImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

    def update(self, instance, validated_data):
        allowed_fields = {"name", "icon"}

        disallowed = set(validated_data.keys()) - allowed_fields
        if disallowed:
            raise serializers.ValidationError(
                {field: "Este campo no se puede actualizar."
                 for field in disallowed}
            )

        # Solo actualizar los permitidos
        for field in allowed_fields:
            if field in validated_data:
                setattr(instance, field, validated_data[field])

        instance.save()
        return instance


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def update(self, instance, validated_data):
        allowed_fields = {"category", "name", "color", "description",
                          "unit_price", "minimum_stock_level", "stock",
                          "image"}

        disallowed = set(validated_data.keys()) - allowed_fields
        if disallowed:
            raise serializers.ValidationError(
                {field: "Este campo no se puede actualizar."
                 for field in disallowed}
            )

        # Solo actualizar los permitidos
        for field in allowed_fields:
            if field in validated_data:
                setattr(instance, field, validated_data[field])

        instance.save()
        return instance


class InventoryMovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryMovement
        fields = '__all__'

    def update(self, instance, validated_data):
        allowed_fields = {"movement_type", "quantity", "reference", "product"}

        disallowed = set(validated_data.keys()) - allowed_fields
        if disallowed:
            raise serializers.ValidationError(
                {field: "Este campo no se puede actualizar."
                 for field in disallowed}
            )

        # Solo actualizar los permitidos
        for field in allowed_fields:
            if field in validated_data:
                setattr(instance, field, validated_data[field])

        instance.save()
        return instance


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class InfoCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = InfoCustomer
        fields = '__all__'

    def update(self, instance, validated_data):
        allowed_fields = {"name", "phone", "address"}

        disallowed = set(validated_data.keys()) - allowed_fields
        if disallowed:
            raise serializers.ValidationError(
                {field: "Este campo no se puede actualizar."
                 for field in disallowed}
            )

        # Solo actualizar los permitidos
        for field in allowed_fields:
            if field in validated_data:
                setattr(instance, field, validated_data[field])

        instance.save()
        return instance


class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = '__all__'
