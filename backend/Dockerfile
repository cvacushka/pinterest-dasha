# Используем официальный базовый образ Python
FROM python:3.13-slim

# Устанавливаем зависимости системы (если необходимы)
RUN apt-get update && apt-get install -y build-essential

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем requirements.txt в рабочую директорию
COPY requirements.txt .

# Устанавливаем Python-зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь проект в контейнер
COPY . .

# Устанавливаем Uvicorn
RUN pip install uvicorn

# Открываем порт 8000 для приложения
EXPOSE 8000

# Команда для запуска Uvicorn с использованием ASGI приложения
CMD ["uvicorn", "app.asgi:application", "--host", "0.0.0.0", "--port", "8000"]