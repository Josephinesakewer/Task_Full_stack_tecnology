# Демонстрация методологии БЭМ: BEMJSON → HTML (страница Lambda)

Структура страницы описана не в HTML, а в **BEMJSON** (обычный JSON из блоков, элементов и модификаторов).
Парсер превращает это дерево в HTML, где классы названы по БЭМ: `block`, `block__elem`, `block--mod`.
Результат проверяется автоматически: БЭМ-нейминг, вложенность, валидность HTML.

```
lambda-full.bemjson.json ──► парсер ──► output-*.html ──► build-fixed.js (проверка)
      (структура)         bem-json-to-html
                          или bem-xjst
```

## Что сделано

1. Разработана БЭМ-структура страницы в формате BEMJSON (JSON): блоки, элементы, модификаторы, миксы.
2. Конвертация выполнена двумя парсерами:
   - `bem-json-to-html` (npm), скрипт `convert-full.js`;
   - официальный движок **bem-xjst** (BEMHTML), локальный скрипт `render-xjst.js` и онлайн-песочница https://bem.github.io/bem-xjst/.
3. Результат проверен скриптом `build-fixed.js`.

## Файлы

| Файл | Назначение |
|------|------------|
| `lambda-full.bemjson.json` | Полная БЭМ-структура страницы (входные данные) |
| `convert-full.js` | Конвертация парсером `bem-json-to-html`, запись `output-bem.html` |
| `render-xjst.js` | Конвертация движком `bem-xjst` с нейммингом `block__elem--mod`, запись `output-xjst.html` |
| `playground-bemjson.js` | Фрагмент BEMJSON для онлайн-песочницы bem-xjst |
| `playground-templates.bemhtml.js` | Шаблоны BEMHTML для онлайн-песочницы (теги, `url` → `href`, `aria-disabled`) |
| `build-fixed.js` | Проверка готового HTML: БЭМ-классы, вложенность, блоки `dish`, файлы ресурсов, валидность |
| `output-bem.html`, `output-xjst.html` | Сгенерированные страницы |
| `output-full.html` | Эталонная страница для сравнения |
| `css/style.css` | Стили страницы |

## Как воспроизвести

```bash
cd Task_12
npm install 
npm run build
```

### Вариант A: `bem-json-to-html`

```bash
node convert-full.js
node build-fixed.js output-bem.html
```

В консоли: входной BEMJSON, первый блок `.dish` из реального результата, путь к файлу.
Парсер выводит булев атрибут как `required="true"`, скрипт заменяет его на `required`.

### Вариант B: `bem-xjst` локально

```bash
node render-xjst.js
node build-fixed.js output-xjst.html
```

Нейминг настраивается опцией движка:
`naming: { elem: '__', mod: { name: '--', val: '_' } }`. Булев `required: true` движок выводит без значения.

### Вариант C: `bem-xjst` в онлайн-песочнице (Не работающий)

1. Открыть https://bem.github.io/bem-xjst/
2. В поле шаблонов вставить `playground-templates.bemhtml.js`.
3. В поле BEMJSON вставить `playground-bemjson.js`.

Песочница работает с настройками по умолчанию, поэтому модификаторы выходят в оригинальном стиле
(`btn_dark`, `nav__link_active`). Для стиля `btn--dark` используйте вариант B.

## Как BEMJSON превращается в HTML

| BEMJSON | HTML |
|---|---|
| `{ block: 'dish' }` | `<div class="dish">` |
| `{ block: 'dish', elem: 'price' }` (или `elem` внутри блока) | `class="dish__price"` |
| `mods: { special: true }` | `class="dish dish--special"` |
| `elemMods: { active: true }` | `class="nav__link nav__link--active"` |
| `mix: { block: 'container' }` | `class="about__inner container"` |
| `tag: 'ul'`, `attrs: { href: '#' }` | `<ul>`, атрибут `href` |

## Результат проверки

`node build-fixed.js output-bem.html` и `node build-fixed.js output-xjst.html`:

- 12 блоков `.dish`;
- ошибок БЭМ-нейминга и HTML нет;
- атрибут `required` выведен без значения.

Предупреждения «Нет в CSS» относятся к блокам-обёрткам и иконкам (`page`, `fa`, `fa--*`): для них нет стилей, на корректность HTML это не влияет.
