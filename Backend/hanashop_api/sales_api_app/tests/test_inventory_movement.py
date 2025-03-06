from rest_framework.test import APITestCase
from rest_framework import status
from sales_api_app.factories import ProductFactory, InventoryMovementFactory
from sales_api_app.models import Inventory_movement


class InventoryMovementAPITestCases(APITestCase):
    def setUp(self):
        self.product = ProductFactory()
        self.inventory_movement = InventoryMovementFactory(
            product=self.product)

    def test_get_inventory_movements(self):
        response = self.client.get('/api/inventory_movement/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_inventory_movement(self):
        data = {
            "product": self.product.id,
            "movement_type": "IN",
            "quantity": 100,
            "reference": "Stock Arrival"
        }
        response = self.client.post(
            '/api/inventory_movement/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        inventory_movement = Inventory_movement.objects.get(
            reference="Stock Arrival")
        self.assertEqual(inventory_movement.quantity, 100)

    def test_update_inventory_movement(self):
        data = {
            "movement_type": "OUT",
            "quantity": 50,
            "reference": "Stock Sale"
        }
        response = self.client.put(
            f'/api/inventory_movement/{self.inventory_movement.id}/',
            data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.inventory_movement.refresh_from_db()
        self.assertEqual(self.inventory_movement.movement_type, "OUT")
        self.assertEqual(self.inventory_movement.quantity, 50)
        self.assertEqual(self.inventory_movement.reference, "Stock Sale")

    def test_delete_inventory_movement(self):
        response = self.client.delete(
            f'/api/inventory_movement/{self.inventory_movement.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaises(Inventory_movement.DoesNotExist):
            Inventory_movement.objects.get(id=self.inventory_movement.id)
