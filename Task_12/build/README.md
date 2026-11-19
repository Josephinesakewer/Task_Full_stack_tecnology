# Скриншоты проверки вёрстки

Сняты в headless Chrome через DevTools Protocol (device scale 1, полная высота страницы):

| Файл | Ширина окна | Высота страницы |
|---|---|---|
| screenshots/desktop-1440.png | 1440 px | 5990 px |
| screenshots/tablet-992.png  | 992 px  | 4523 px |
| screenshots/tablet-768.png  | 768 px  | 6125 px |
| screenshots/mobile-375.png  | 375 px  | 6218 px |

Их можно пересобрать, открыв `index.html` в браузере и меняя ширину окна
(или через headless Chrome: `chrome --headless --screenshot --window-size=1440,2000 index.html`).
