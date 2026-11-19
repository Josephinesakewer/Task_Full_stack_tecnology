# Применение методологии БЭМ к лендингу Lambda

## 1. Разработанная БЭМ-структура

Структура описана в формате **BEMJSON** (стандартный формат БЭМ-дерева, используемый в экосистеме BEM: bem-xjst, BH, bem-tools и др.).

Файл: `bemjson-page.js`

Основные блоки:
- `page` (корневой)
- `header` + элементы `overlay`, `inner`
- `logo`, `nav` (`list`, `item`, `link` + мод `active`)
- `social` (моды `header` / `footer`)
- `burger` + `line`
- `promo` + `content`, `title`, `buttons`
- `divider` (моды `hero`, `footer` …)
- `btn` (моды `dark`, `light`, `gold`)
- `about`, `ingredients`, `menu`, `reviews`, `reservations`, `footer`
- `dish` (мод `special`) + `head`, `name`, `price`, `descr`, `tag`
- `title` (моды `gold`, `white`)
- `field`, `booking` и т.д.

Пример фрагмента BEMJSON:

```js
{
  block: 'dish',
  mods: { special: true },
  content: [
    { elem: 'tag', tag: 'span', content: 'Special' },
    { elem: 'head', content: [
      { elem: 'name', tag: 'span', content: 'Roast Lamb' },
      { elem: 'price', tag: 'span', content: '$5.50' }
    ]},
    { elem: 'descr', tag: 'p', content: '...' }
  ]
}
```

На выходе даёт классы: `dish dish--special`, `dish__tag`, `dish__head`, `dish__name` …

## 2. Парсер / сериализатор

Использован собственный легковесный парсер `bemjson-to-html.js` (аналог публичных решений `bemjson-to-html`, `bemer`, `bh.toHtml`, `bem-xjst`).

Он реализует стандартные соглашения BEMJSON:
- `block`, `elem`, `mods` / `elemMods`
- `tag`, `attrs`, `content`, `mix`, `cls`
- генерация классов по правилам `block__elem`, `block--mod`

Публичные альтернативы (можно установить при наличии сети):
```bash
npm i bem-xjst bh bemjson-to-html html2bemjson
```

Пример с bem-xjst:
```js
const bemhtml = require('bem-xjst').bemhtml.compile(() => {});
const html = bemhtml.apply(bemjson);
```

## 3. Запуск

```bash
node bemjson-to-html.js
# → generated.html
```

## 4. Результат

- Исходный HTML страницы уже был написан с соблюдением БЭМ-нейминга.
- BEMJSON-структура полностью описывает дерево.
- Парсер корректно восстанавливает HTML с правильными классами (`nav__link--active`, `dish--special`, `title--gold`, `btn--dark` и т.д.).
- Структура расширяема: достаточно добавить элементы/модификаторы в JSON.

Файлы для демонстрации:
- `bemjson-page.js` — полная (частично сокращённая) БЭМ-структура
- `bemjson-to-html.js` — парсер
- `generated.html` — результат конвертации
