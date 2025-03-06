from rest_framework.test import APITestCase
from rest_framework import status
from sales_api_app.factories import (
    OrderFactory, ProductFactory, OrderDetailFactory)
from sales_api_app.models import OrderDetail
from decimal import Decimal


class OrderDetailAPITestCases(APITestCase):
    def setUp(self):
        self.order = OrderFactory()
        self.product = ProductFactory()
        self.order_detail = OrderDetailFactory(
            order=self.order, product=self.product)

    def test_get_order_details(self):
        response = self.client.get('/api/order_details/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_order_detail(self):
        product = ProductFactory()

        data = {
            "order": self.order.id,
            "product": product.id,
            "quantity": 2,
            "sub_total": 199.98
        }
        response = self.client.post('/api/order_details/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        order_detail = OrderDetail.objects.filter(order=self.order).last()
        self.assertEqual(order_detail.quantity, 2)

    def test_update_order_detail(self):
        data = {
            "quantity": 3,
            "sub_total": 299.97
        }
        response = self.client.patch(
            f'/api/order_details/{self.order_detail.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.order_detail.refresh_from_db()
        self.assertEqual(self.order_detail.quantity, 3)
        self.assertEqual(self.order_detail.sub_total, Decimal('299.97'))

    def test_delete_order_detail(self):
        response = self.client.delete(
            f'/api/order_details/{self.order_detail.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaises(OrderDetail.DoesNotExist):
            OrderDetail.objects.get(id=self.order_detail.id)
