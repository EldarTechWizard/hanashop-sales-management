from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import InventoryMovement


@receiver(pre_save, sender=InventoryMovement)
def handle_inventory_movement_create_or_update(sender, instance, **kwargs):
    """
    Ajusta el stock al crear, actualizar o anular (status=False) un movimiento.
    """
    product = instance.product

    if instance.pk:
        try:
            prev = InventoryMovement.objects.get(pk=instance.pk)

            # Si el status cambió a False, revertimos el movimiento anterior
            if prev.status and not instance.status:
                if prev.movement_type == 'IN':
                    product.stock -= prev.quantity
                elif prev.movement_type == 'OUT':
                    product.stock += prev.quantity

                product.stock = max(product.stock, 0)
                product._skip_signal = True
                product.save()
                return

            if prev.status:
                if prev.movement_type == 'IN':
                    product.stock -= prev.quantity
                elif prev.movement_type == 'OUT':
                    product.stock += prev.quantity

        except InventoryMovement.DoesNotExist:
            pass

    # Si el movimiento está activo, aplicar su efecto
    if instance.status:
        if instance.movement_type == 'IN':
            product.stock += instance.quantity
        elif instance.movement_type == 'OUT':
            product.stock -= instance.quantity

        product.stock = max(product.stock, 0)
        product.save()

