# Generated by Django 5.1.5 on 2025-03-06 05:20

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_api_app', '0007_alter_order_detail_sub_total'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Info_customer',
            new_name='InfoCustomer',
        ),
        migrations.RenameModel(
            old_name='Inventory_movement',
            new_name='InventoryMovement',
        ),
        migrations.RenameModel(
            old_name='Order_detail',
            new_name='OrderDetail',
        ),
    ]
