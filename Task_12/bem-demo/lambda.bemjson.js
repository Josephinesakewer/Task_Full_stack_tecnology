/**
 * BEMJSON-структура страницы Lambda (ресторан)
 * Методология БЭМ: block / element / modifier
 * Naming: block__elem--mod (или классический _ )
 */

module.exports = {
  block: 'page',
  content: [
    // ===== HEADER =====
    {
      block: 'header',
      content: [
        {
          elem: 'inner',
          content: [
            {
              block: 'logo',
              tag: 'a',
              attrs: { href: '#promo', 'aria-label': 'Lambda — на главную' },
              content: 'LAMBDA'
            },
            {
              block: 'nav',
              content: {
                elem: 'list',
                tag: 'ul',
                content: [
                  { elem: 'item', content: { elem: 'link', tag: 'a', mods: { active: true }, attrs: { href: '#promo' }, content: 'Home' } },
                  { elem: 'item', content: { elem: 'link', tag: 'a', attrs: { href: '#about' }, content: 'About' } },
                  { elem: 'item', content: { elem: 'link', tag: 'a', attrs: { href: '#ingredients' }, content: 'Ingredients' } },
                  { elem: 'item', content: { elem: 'link', tag: 'a', attrs: { href: '#menu' }, content: 'Menu' } },
                  { elem: 'item', content: { elem: 'link', tag: 'a', attrs: { href: '#reviews' }, content: 'Reviews' } },
                  { elem: 'item', content: { elem: 'link', tag: 'a', attrs: { href: '#reservations' }, content: 'Reservations' } }
                ]
              }
            },
            {
              block: 'social',
              mods: { place: 'header' },
              content: [
                { elem: 'item', content: { elem: 'link', tag: 'a', attrs: { href: '#', 'aria-label': 'Twitter' }, content: '𝕏' } },
                { elem: 'item', content: { elem: 'link', tag: 'a', attrs: { href: '#', 'aria-label': 'YouTube' }, content: '▶' } },
                { elem: 'item', content: { elem: 'link', tag: 'a', attrs: { href: '#', 'aria-label': 'Facebook' }, content: 'f' } }
              ]
            },
            {
              block: 'burger',
              tag: 'button',
              attrs: { type: 'button', 'aria-label': 'Меню' },
              content: [
                { elem: 'line' },
                { elem: 'line' },
                { elem: 'line' }
              ]
            }
          ]
        }
      ]
    },

    // ===== PROMO (HERO) =====
    {
      block: 'promo',
      content: {
        elem: 'content',
        content: [
          {
            elem: 'title',
            tag: 'h1',
            content: ['the right ingredients', { tag: 'br' }, 'for the right food']
          },
          {
            block: 'divider',
            mods: { theme: 'hero' },
            content: [
              { elem: 'line' },
              { elem: 'img', tag: 'img', attrs: { src: 'assets/img/divider-hero.png', alt: '', width: 232, height: 43 } },
              { elem: 'line' }
            ]
          },
          {
            elem: 'buttons',
            content: [
              { block: 'button', mods: { theme: 'dark' }, tag: 'a', attrs: { href: '#reservations' }, content: 'BOOK A TABLE' },
              { block: 'button', mods: { theme: 'light' }, tag: 'a', attrs: { href: '#menu' }, content: 'SEE THE MENU' }
            ]
          }
        ]
      }
    },

    // ===== ABOUT =====
    {
      block: 'about',
      content: {
        elem: 'inner',
        content: [
          {
            elem: 'text',
            content: [
              { block: 'title', mods: { color: 'gold' }, tag: 'h2', content: 'Just the right food' },
              {
                block: 'divider',
                content: [
                  { elem: 'line' },
                  { elem: 'img', tag: 'img', attrs: { src: 'assets/img/divider-about.png', alt: '', width: 247, height: 24 } },
                  { elem: 'line' }
                ]
              },
              {
                tag: 'p',
                content: 'If you’ve been to one of our restaurants, you’ve seen – and tasted – what keeps our customers coming back for more. Perfect materials and freshly baked food, delicious Lambda cakes, muffins, and gourmet coffees make us hard to resist! Stop in today and check us out!'
              },
              {
                elem: 'photos',
                content: {
                  elem: 'cook',
                  tag: 'img',
                  attrs: { src: 'assets/img/about-cook.jpg', alt: 'Наш шеф-повар', width: 219, height: 221 }
                }
              }
            ]
          },
          {
            elem: 'picture',
            content: {
              elem: 'dish',
              tag: 'img',
              attrs: { src: 'assets/img/about-dish.jpg', alt: 'Блюдо ресторана Lambda', width: 621, height: 625 }
            }
          }
        ]
      }
    },

    // ===== MENU (фрагмент) =====
    {
      block: 'menu',
      content: {
        elem: 'grid',
        content: [
          {
            elem: 'column',
            content: [
              {
                block: 'menu-group',
                content: [
                  { block: 'title', mods: { color: 'gold' }, tag: 'h2', content: 'Appetisers' },
                  {
                    block: 'divider',
                    content: [
                      { elem: 'line' },
                      { elem: 'img', tag: 'img', attrs: { src: 'assets/img/divider-menu.png', alt: '', width: 247, height: 24 } },
                      { elem: 'line' }
                    ]
                  },
                  {
                    block: 'dish',
                    content: [
                      {
                        elem: 'head',
                        content: [
                          { elem: 'name', content: 'Tzatsiki' },
                          { elem: 'price', content: '$3.99' }
                        ]
                      },
                      { elem: 'descr', tag: 'p', content: 'Refreshing traditional cucumber and garlic yoghurt dip.' }
                    ]
                  },
                  {
                    block: 'dish',
                    mods: { special: true },
                    content: [
                      { elem: 'tag', content: 'Special' },
                      {
                        elem: 'head',
                        content: [
                          { elem: 'name', content: 'Greek Salad' },
                          { elem: 'price', content: '$5.50' }
                        ]
                      },
                      { elem: 'descr', tag: 'p', content: 'Pureed eggplant, garlic, green pepper and tomato dip.' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    },

    // ===== FOOTER =====
    {
      block: 'footer',
      content: {
        elem: 'inner',
        content: [
          {
            elem: 'col',
            content: [
              { elem: 'title', tag: 'h3', content: 'About Us' },
              {
                block: 'divider',
                mods: { theme: 'footer' },
                content: [
                  { elem: 'line' },
                  { elem: 'img', tag: 'img', attrs: { src: 'assets/img/divider-footer.png', alt: '', width: 199, height: 19 } },
                  { elem: 'line' }
                ]
              },
              {
                elem: 'text',
                tag: 'p',
                content: [
                  "Lambda's new and expanded Chelsea location represents a truly authentic ",
                  { tag: 'strong', content: 'Greek' },
                  ' patisserie...'
                ]
              }
            ]
          },
          {
            elem: 'col',
            content: [
              { elem: 'title', tag: 'h3', content: 'Opening Hours' },
              {
                block: 'divider',
                mods: { theme: 'footer' },
                content: [
                  { elem: 'line' },
                  { elem: 'img', tag: 'img', attrs: { src: 'assets/img/divider-footer.png', alt: '', width: 199, height: 19 } },
                  { elem: 'line' }
                ]
              },
              {
                elem: 'text',
                tag: 'p',
                content: [
                  { tag: 'strong', content: 'Mon-Thu:' },
                  ' 7:00am-8:00pm',
                  { tag: 'br' },
                  { tag: 'strong', content: 'Fri-Sun:' },
                  ' 7:00am-10:00pm'
                ]
              }
            ]
          }
        ]
      }
    }
  ]
};
