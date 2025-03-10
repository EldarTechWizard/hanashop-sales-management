# Generated by Django 5.1.5 on 2025-03-06 04:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_api_app', '0003_order_customer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='status',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='info_customer',
            name='status',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='customer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='sales_api_app.info_customer'),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='color',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='product',
            name='description',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.CharField(blank=True, max_length=512),
        ),
        migrations.AlterField(
            model_name='product',
            name='status',
            field=models.BooleanField(default=True),
        ),
    ]
