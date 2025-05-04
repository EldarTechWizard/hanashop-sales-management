from django.contrib.auth import models as auth_models
from django.db import models


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    icon = models.CharField(max_length=255, blank=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    color = models.CharField(max_length=100, blank=True)
    description = models.CharField(max_length=200, blank=True)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    minimum_stock_level = models.IntegerField(default=0)
    stock = models.IntegerField(default=0)
    registration_date = models.DateTimeField(auto_now_add=True)
    image = models.CharField(max_length=512, blank=True)
    status = models.BooleanField(default=True)
    _skip_signal = models.BooleanField(default=False, editable=False)

    def __str__(self):
        return self.name


class InfoCustomer(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=25, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    user = models.ForeignKey(auth_models.User, on_delete=models.CASCADE,
                             null=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(auth_models.User, on_delete=models.SET_NULL,
                             null=True,
                             blank=True)
    customer = models.ForeignKey(InfoCustomer,
                                 on_delete=models.CASCADE,
                                 null=True)
    order_date = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.BooleanField(default=True)

    def __str__(self):
        return f"Order #{self.id}"


class OrderDetail(models.Model):
    id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    sub_total = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ('order', 'product')

    def __str__(self):
        return f"Detail for Order #{self.order.id}"


class InventoryMovement(models.Model):
    MOVEMENT_CHOICES = [
        ('IN', 'In'),
        ('OUT', 'Out'),
    ]

    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    movement_type = models.CharField(max_length=3, choices=MOVEMENT_CHOICES)
    quantity = models.IntegerField()
    movement_date = models.DateTimeField(auto_now_add=True)
    reference = models.CharField(max_length=255, blank=True, null=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return f"Reference: {self.reference}"
