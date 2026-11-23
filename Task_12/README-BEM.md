# Демонстрация методологии БЭМ для страницы Lambda

## Что сделано

1. Разработана **BEM-структура** страницы в формате **BEMJSON** (JSON).
2. Использован общедоступный парсер **bem-json-to-html**.
3. Дополнительно подготовлен пример для официального движка **BEMHTML (bem-xjst)** — https://bem.github.io/bem-xjst/ (но он не работает)

## Файлы

| Файл | Назначение |
|------|------------|
| `lambda-full.bemjson.js` | Полная BEMJSON-структура основных блоков страницы |
| `convert-full.js` | Скрипт, который подаёт BEMJSON на вход парсеру |
| `output-bem.html` | Результат — корректный HTML с БЭМ-классами |
| `playground-bemjson.js` | Упрощённый фрагмент для онлайн-песочницы BEMHTML |

## Как воспроизвести (сценарий записи с экрана)

### Вариант A — локальный парсер (рекомендуется)

```bash
cd bem-demo
node convert-full.js
```

В консоли видно:
1. Вход (BEMJSON)
2. Запуск парсера
3. Выход (HTML с классами `block`, `block__elem`, `block--mod`)

Открыть `output-bem.html` в браузере.

### Вариант B — официальный BEMHTML (онлайн)

1. Открыть https://bem.github.io/bem-xjst/
2. В левое поле (Templates) вставить простые шаблоны BEMHTML
3. В правое поле (BEMJSON) вставить содержимое `playground-bemjson.js`
4. Справа сразу появится сгенерированный HTML

## Пример преобразования

**Вход (BEMJSON):**
```js
{
  block: 'dish',
  mods: { special: true },
  content: [
    { elem: 'tag', content: 'Special' },
    { elem: 'head', content: [
      { elem: 'name', content: 'Greek Salad' },
      { elem: 'price', content: '$5.50' }
    ]},
    { elem: 'descr', tag: 'p', content: '...' }
  ]
}
```

**Выход (HTML):**
```html
<div class="dish dish--special">
  <div class="dish__tag">Special</div>
  <div class="dish__head">
    <div class="dish__name">Greek Salad</div>
    <div class="dish__price">$5.50</div>
  </div>
  <p class="dish__descr">...</p>
</div>
```

Классы полностью соответствуют методологии БЭМ.
