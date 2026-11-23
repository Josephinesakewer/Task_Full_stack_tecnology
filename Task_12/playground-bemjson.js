// Вставить это в ПРАВОЕ поле (BEMJSON) на https://bem.github.io/bem-xjst/

[
  {
    block: 'header',
    content: [
      {
        block: 'logo',
        tag: 'a',
        attrs: { href: '#promo' },
        content: 'LAMBDA'
      },
      {
        block: 'nav',
        content: {
          elem: 'list',
          tag: 'ul',
          content: [
            {
              elem: 'item',
              tag: 'li',
              content: {
                elem: 'link',
                tag: 'a',
                elemMods: { active: true },   // ← elemMods для элемента
                attrs: { href: '#promo' },
                content: 'Home'
              }
            },
            {
              elem: 'item',
              tag: 'li',
              content: {
                elem: 'link',
                tag: 'a',
                attrs: { href: '#about' },
                content: 'About'
              }
            },
            {
              elem: 'item',
              tag: 'li',
              content: {
                elem: 'link',
                tag: 'a',
                attrs: { href: '#menu' },
                content: 'Menu'
              }
            }
          ]
        }
      }
    ]
  },
  {
    block: 'promo',
    content: {
      elem: 'content',
      content: [
        {
          elem: 'title',
          tag: 'h1',
          content: 'the right ingredients for the right food'
        },
        {
          block: 'btn',
          mods: { dark: true },          // ← btn--dark
          tag: 'a',
          attrs: { href: '#reservations' },
          content: 'BOOK A TABLE'
        },
        {
          block: 'btn',
          mods: { light: true },         // ← btn--light
          tag: 'a',
          attrs: { href: '#menu' },
          content: 'SEE THE MENU'
        }
      ]
    }
  },
  {
    block: 'dish',
    mods: { special: true },             // ← dish--special
    content: [
      { elem: 'tag', content: 'Special' },
      {
        elem: 'head',
        content: [
          { elem: 'name', content: 'Greek Salad' },
          { elem: 'price', content: '$5.50' }
        ]
      },
      {
        elem: 'descr',
        tag: 'p',
        content: 'Refreshing traditional cucumber and garlic yoghurt dip.'
      }
    ]
  }
]
