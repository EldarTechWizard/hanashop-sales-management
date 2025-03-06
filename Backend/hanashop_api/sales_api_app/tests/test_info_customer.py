from rest_framework.test import APITestCase
from rest_framework import status
from sales_api_app.factories import InfoCustomerFactory
from sales_api_app.models import Info_customer


class InfoCustomerAPITestCases(APITestCase):
    def setUp(self):
        self.info_customer = InfoCustomerFactory()

    def test_get_info_customers(self):
        response = self.client.get('/api/info_customer/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_info_customer(self):
        data = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "address": "123 Main St",
            "user": self.info_customer.user.id,
        }
        response = self.client.post('/api/info_customer/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        customer = Info_customer.objects.get(name="John Doe")
        self.assertEqual(customer.email, "john.doe@example.com")

    def test_update_info_customer(self):
        data = {
            "name": "Jane Doe",
            "email": "jane.doe@example.com",
            "phone": "0987654321",
            "address": "456 Elm St",
            "status": False
        }
        response = self.client.put(
            f'/api/info_customer/{self.info_customer.id}/', data, format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.info_customer.refresh_from_db()
        self.assertEqual(self.info_customer.name, "Jane Doe")
        self.assertEqual(self.info_customer.email, "jane.doe@example.com")

    def test_delete_info_customer(self):
        response = self.client.delete(
            f'/api/info_customer/{self.info_customer.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaises(Info_customer.DoesNotExist):
            Info_customer.objects.get(id=self.info_customer.id)
