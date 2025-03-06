from rest_framework.test import APITestCase
from rest_framework import status
from sales_api_app.factories import CategoryFactory
from sales_api_app.models import Category


class CategoryAPITestCases(APITestCase):
    def setUp(self):
        self.category = CategoryFactory()

    def test_get_categories(self):
        response = self.client.get('/api/categories/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn(self.category.name, [
                      category['name'] for category in response.data])

    def test_create_category(self):
        data = {
            "name": "New Category",
            "icon": "dinner"
        }
        response = self.client.post('/api/categories/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        category = Category.objects.get(name="New Category")
        self.assertEqual(category.icon,
                         "dinner")

    def test_update_category(self):
        data = {
            "name": "Updated Category",
            "icon": "food"
        }
        response = self.client.put(
            f'/api/categories/{self.category.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.category.refresh_from_db()
        self.assertEqual(self.category.name, "Updated Category")
        self.assertEqual(self.category.description,
                         "food")

    def test_delete_category(self):
        response = self.client.delete(f'/api/categories/{self.category.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        with self.assertRaises(Category.DoesNotExist):
            Category.objects.get(id=self.category.id)
