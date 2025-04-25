# Usa la imagen oficial de Python
FROM python:3.10

# Establece el directorio de trabajo
WORKDIR /app

# Instala pipenv
RUN pip install --no-cache-dir pipenv

# Copia solo los archivos necesarios para instalar dependencias
COPY Pipfile Pipfile.lock /app/

# Instala las dependencias en un entorno virtual
RUN pipenv install --deploy --ignore-pipfile

# Copia el resto de los archivos del proyecto
COPY . /app

# Expone el puerto 8000
EXPOSE 8000

# Activa el entorno de pipenv y ejecuta el servidor
CMD ["sh", "-c", "pipenv run python hanashop_api/manage.py migrate && pipenv run python hanashop_api/manage.py runserver 0.0.0.0:8000 --noreload"]

