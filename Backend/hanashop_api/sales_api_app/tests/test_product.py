from rest_framework.test import APITestCase
from rest_framework import status
from sales_api_app.factories import ProductFactory
from sales_api_app.models import Product


class ProductAPITestCases(APITestCase):
    def setUp(self):
        self.product = ProductFactory()

    def test_get_products(self):
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_product(self):
        data = {
            "category": self.product.category.id,
            "name": "New Product",
            "barcode": "1234567890",
            "color": "Red",
            "description": "A new product",
            "size": "M",
            "size_type": "Medium",
            "unit_price": 99.99,
            "minimum_stock_level": 10,
            "stock": 50,
            "image": "image_url",
            "status": True
        }
        response = self.client.post('/api/products/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        product = Product.objects.get(name="New Product")
        self.assertEqual(product.barcode, "1234567890")

    def test_update_product(self):
        data = {
            "name": "Updated Product",
            "barcode": "0987654321",
            "color": "Blue",
            "description": "Updated description",
            "size": "L",
            "size_type": "Large",
            "unit_price": 109.99,
            "minimum_stock_level": 5,
            "stock": 30,
            "image": "new_image_url",
            "status": False
        }
        response = self.client.patch(
            f'/api/products/{self.product.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.product.refresh_from_db()
        self.assertEqual(self.product.name, "Updated Product")
        self.assertEqual(self.product.barcode, "0987654321")

    def test_delete_product(self):
        response = self.client.delete(f'/api/products/{self.product.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaises(Product.DoesNotExist):
            Product.objects.get(id=self.product.id)
