# Makefile для Django проекта

# Переменная для управления Django командой
DJANGO_MANAGE = python manage.py

# Переменная для управления средой
# Если используете virtualenv, то активируйте его перед командой make:
# source path/to/venv/bin/activate && make <target>

.PHONY: runserver migrate test

# Запустить сервер разработки
run:
 $(DJANGO_MANAGE) runserver

# Накатить миграции
migrate:
 $(DJANGO_MANAGE) migrate

# Запустить тесты
test:
 $(DJANGO_MANAGE) test

# Очистить скомпилированные файлы Python
clean:
 find . -name "*.pyc" -exec rm -f {} +
 find . -name "__pycache__" -exec rm -rf {} +

# Помощь: показать доступные команды
help:
 @echo "Доступные команды:"
 @echo "  runserver - Запустить сервер разработки Django"
 @echo "  migrate   - Накатить миграции базы данных"
 @echo "  test      - Выполнить тесты с помощью Django тестового фреймворка"
 @echo "  clean     - Удалить скомпилированные файлы Python и каталоги __pycache__"