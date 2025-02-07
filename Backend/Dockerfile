# Usa la imagen oficial de Python
FROM python:3.10

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos al contenedor
COPY . /app

# Instala dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Expone el puerto 8000
EXPOSE 8000

# Comando por defecto
CMD ["sh", "-c", "python hanashop_api/manage.py migrate && python hanashop_api/manage.py runserver 0.0.0.0:8000"]
