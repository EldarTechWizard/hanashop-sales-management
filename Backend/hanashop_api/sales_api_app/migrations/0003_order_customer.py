# Generated by Django 5.1.5 on 2025-03-06 03:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_api_app', '0002_rename_inventorymovement_inventory_movement'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='customer',
            field=models.ForeignKey(blank=True, default=0, on_delete=django.db.models.deletion.CASCADE, to='sales_api_app.info_customer'),
            preserve_default=False,
        ),
    ]
