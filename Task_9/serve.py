# Запуск: python serve.py   (из папки с файлами)  ->  http://localhost:8000/
# Сервер отдаёт файлы с заголовком Cache-Control: no-store, поэтому браузер не показывает старые версии.
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, max-age=0')
        super().end_headers()

print('Папка сервера:', os.getcwd())
print('Откройте http://localhost:8000/results.html')
ThreadingHTTPServer(('', 8000), Handler).serve_forever()
