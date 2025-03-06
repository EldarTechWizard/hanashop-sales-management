from rest_framework.test import APITestCase
from rest_framework import status
from sales_api_app.factories import (
    OrderFactory, InfoCustomerFactory, UserFactory)
from sales_api_app.models import Order


class OrderAPITestCases(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.customer = InfoCustomerFactory()
        self.order = OrderFactory(user=self.user, customer=self.customer)

    def test_get_orders(self):
        response = self.client.get('/api/orders/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_order(self):
        data = {
            "user": self.user.id,
            "customer": self.customer.id,
            "total": 150.75,
            "status": True
        }
        response = self.client.post('/api/orders/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        order = Order.objects.get(total=150.75)
        self.assertEqual(order.status, True)

    def test_update_order(self):
        data = {
            "total": 200.50,
            "status": False
        }
        response = self.client.put(
            f'/api/orders/{self.order.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.order.refresh_from_db()
        self.assertEqual(self.order.total, 200.50)
        self.assertEqual(self.order.status, False)

    def test_delete_order(self):
        response = self.client.delete(f'/api/orders/{self.order.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaises(Order.DoesNotExist):
            Order.objects.get(id=self.order.id)
