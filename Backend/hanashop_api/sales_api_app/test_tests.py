from rest_framework.test import APITestCase
from rest_framework import status


# Create your tests here.
class ProductAPITestCase(APITestCase):
    def test_get_products(self):
        """This test checks the basic functionality of the addition operation."""
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
