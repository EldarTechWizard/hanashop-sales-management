from django.apps import AppConfig


class SalesApiAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'sales_api_app'

    def ready(self):
        import sales_api_app.signals  # noqa: F401
