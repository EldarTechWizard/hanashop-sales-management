import factory
from django.contrib.auth import models as auth_models
from factory.fuzzy import FuzzyChoice
from sales_api_app.models import (
    Product, Category, InfoCustomer, Order, OrderDetail, InventoryMovement)


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = auth_models.User

    username = factory.Faker('user_name')
    email = factory.Faker('email')
    password = factory.PostGenerationMethodCall('set_password', 'password123')


class CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Category

    name = factory.Faker("word")
    icon = factory.Faker("word")
    status = factory.Faker("boolean")


class ProductFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Product

    category = factory.SubFactory(CategoryFactory)
    name = factory.Faker("word")
    color = factory.Faker("color_name")
    description = factory.Faker("paragraph")
    unit_price = factory.Faker("pydecimal",
                               left_digits=5,
                               right_digits=2,
                               positive=True)
    minimum_stock_level = factory.Faker("random_number", digits=2)
    stock = factory.Faker("random_number", digits=2)
    registration_date = factory.Faker("date")
    image = factory.Faker("image_url")
    status = factory.Faker("boolean")


class InfoCustomerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = InfoCustomer

    name = factory.Faker("name")
    phone = factory.Faker("phone_number")
    address = factory.Faker("address")
    user = factory.SubFactory(UserFactory)
    status = factory.Faker("boolean")


class OrderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Order

    user = factory.SubFactory(UserFactory)
    customer = factory.SubFactory(InfoCustomerFactory)
    order_date = factory.Faker("date")
    total = factory.Faker("pydecimal",
                          left_digits=5,
                          right_digits=2,
                          positive=True)
    status = factory.Faker("boolean")


class OrderDetailFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = OrderDetail

    order = factory.SubFactory(OrderFactory)
    product = factory.SubFactory(ProductFactory)
    quantity = factory.Faker("random_number", digits=2)
    sub_total = factory.Faker("pydecimal",
                              left_digits=5,
                              right_digits=2,
                              positive=True)


class InventoryMovementFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = InventoryMovement

    product = factory.SubFactory(ProductFactory)
    movement_type = FuzzyChoice(["In", "Out"])
    quantity = factory.Faker("random_number", digits=2)
    movement_date = factory.Faker("date")
    reference = factory.Faker("paragraph")
    status = factory.Faker("boolean")
