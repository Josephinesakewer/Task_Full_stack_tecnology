/**
 * BEMJSON structure for Lambda restaurant page
 * Based on BEM methodology: blocks, elements, modifiers
 * Naming: block, block__elem, block--mod or block_mod_val (classic)
 * Here we use classic BEM with __ and --
 */

module.exports = {
  block: 'page',
  tag: 'html',
  attrs: { lang: 'ru' },
  content: [
    {
      elem: 'head',
      tag: 'head',
      content: [
        { tag: 'meta', attrs: { charset: 'UTF-8' } },
        { tag: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
        { tag: 'meta', attrs: { name: 'description', content: 'Lambda — ресторан греческой кухни. Свежие ингредиенты, авторское меню, бронирование столиков онлайн.' } },
        { tag: 'title', content: 'Lambda — the right ingredients for the right food' },
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
        { tag: 'link', attrs: { href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&family=Yeseva+One&display=swap', rel: 'stylesheet' } },
        { tag: 'link', attrs: { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css' } },
        { tag: 'link', attrs: { rel: 'stylesheet', href: 'css/style.css' } }
      ]
    },
    {
      elem: 'body',
      tag: 'body',
      content: [
        // ========== HEADER block ==========
        {
          block: 'header',
          content: [
            { elem: 'overlay' },
            {
              elem: 'inner',
              mix: [{ block: 'container' }],
              content: [
                {
                  block: 'logo',
                  tag: 'a',
                  attrs: { href: '#promo', 'aria-label': 'Lambda — на главную' },
                  content: 'LAMBDA'
                },
                {
                  block: 'nav',
                  attrs: { id: 'nav' },
                  content: [
                    {
                      elem: 'list',
                      tag: 'ul',
                      content: [
                        { elem: 'item', tag: 'li', content: { elem: 'link', tag: 'a', mods: { active: true }, attrs: { href: '#promo' }, content: 'Home' } },
                        { elem: 'item', tag: 'li', content: { elem: 'link', tag: 'a', attrs: { href: '#about' }, content: 'About' } },
                        { elem: 'item', tag: 'li', content: { elem: 'link', tag: 'a', attrs: { href: '#ingredients' }, content: 'Ingredients' } },
                        { elem: 'item', tag: 'li', content: { elem: 'link', tag: 'a', attrs: { href: '#menu' }, content: 'Menu' } },
                        { elem: 'item', tag: 'li', content: { elem: 'link', tag: 'a', attrs: { href: '#reviews' }, content: 'Reviews' } },
                        { elem: 'item', tag: 'li', content: { elem: 'link', tag: 'a', attrs: { href: '#reservations' }, content: 'Reservations' } }
                      ]
                    }
                  ]
                },
                {
                  block: 'social',
                  mods: { header: true },
                  tag: 'ul',
                  content: [
                    { elem: 'item', tag: 'li', content: { elem: 'link', tag: 'a', attrs: { href: '#', 'aria-label': 'Twitter' }, content: { tag: 'i', attrs: { class: 'fa-brands fa-twitter' } } } },
                    { elem: 'item', tag: 'li', content: { elem: 'link', tag: 'a', attrs: { href: '#', 'aria-label': 'YouTube' }, content: { tag: 'i', attrs: { class: 'fa-brands fa-youtube' } } } },
                    { elem: 'item', tag: 'li', content: { elem: 'link', tag: 'a', attrs: { href: '#', 'aria-label': 'Facebook' }, content: { tag: 'i', attrs: { class: 'fa-brands fa-facebook-f' } } } }
                  ]
                },
                {
                  block: 'burger',
                  tag: 'button',
                  attrs: { type: 'button', id: 'burger', 'aria-label': 'Меню', 'aria-expanded': 'false', 'aria-controls': 'nav' },
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
        // ========== MAIN ==========
        {
          tag: 'main',
          content: [
            // PROMO / HERO
            {
              block: 'promo',
              attrs: { id: 'promo' },
              content: [
                {
                  elem: 'content',
                  content: [
                    {
                      elem: 'title',
                      tag: 'h1',
                      content: ['the right ingredients', { tag: 'br' }, 'for the right food']
                    },
                    {
                      block: 'divider',
                      mods: { hero: true },
                      content: [
                        { elem: 'line' },
                        { elem: 'img', tag: 'img', attrs: { src: 'assets/img/divider-hero.png', alt: '', width: 232, height: 43 } },
                        { elem: 'line' }
                      ]
                    },
                    {
                      elem: 'buttons',
                      content: [
                        { block: 'btn', mods: { dark: true }, tag: 'a', attrs: { href: '#reservations' }, content: 'BOOK A TABLE' },
                        { block: 'btn', mods: { light: true }, tag: 'a', attrs: { href: '#menu' }, content: 'SEE THE MENU' }
                      ]
                    }
                  ]
                }
              ]
            },
            // ABOUT
            {
              block: 'about',
              mods: { section: true },
              attrs: { id: 'about' },
              content: [
                { elem: 'pattern' },
                {
                  elem: 'inner',
                  mix: [{ block: 'container' }],
                  content: [
                    {
                      elem: 'text',
                      content: [
                        { block: 'title', mods: { gold: true }, tag: 'h2', content: 'Just the right food' },
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
              ]
            },
            // INGREDIENTS
            {
              block: 'ingredients',
              mods: { section: true },
              attrs: { id: 'ingredients' },
              content: [
                {
                  elem: 'box',
                  content: [
                    { block: 'title', mods: { white: true }, tag: 'h2', content: 'Fine ingredients' },
                    {
                      block: 'divider',
                      content: [
                        { elem: 'line' },
                        { elem: 'img', tag: 'img', attrs: { src: 'assets/img/divider-ingredients.png', alt: '', width: 247, height: 24 } },
                        { elem: 'line' }
                      ]
                    },
                    {
                      elem: 'descr',
                      tag: 'p',
                      content: 'If you’ve been to one of our restaurants, you’ve seen – and tasted – what keeps our customers coming back for more. Perfect materials and freshly baked food, delicious Lambda cakes, muffins, and gourmet coffees make us hard to resist! Stop in today and check us out!'
                    },
                    {
                      elem: 'list',
                      tag: 'ul',
                      content: [
                        { elem: 'item', tag: 'li', content: { elem: 'img', tag: 'img', attrs: { src: 'assets/img/ingredient-1.jpg', alt: 'Злаки', width: 100, height: 100 } } },
                        { elem: 'item', tag: 'li', content: { elem: 'img', tag: 'img', attrs: { src: 'assets/img/ingredient-2.jpg', alt: 'Специи', width: 100, height: 100 } } },
                        { elem: 'item', tag: 'li', content: { elem: 'img', tag: 'img', attrs: { src: 'assets/img/ingredient-3.jpg', alt: 'Свежая выпечка', width: 100, height: 100 } } }
                      ]
                    }
                  ]
                }
              ]
            },
            // MENU (simplified structure for demo)
            {
              block: 'menu',
              mods: { section: true },
              attrs: { id: 'menu' },
              content: [
                { elem: 'pattern' },
                {
                  mix: [{ block: 'container' }],
                  content: {
                    elem: 'grid',
                    content: [
                      // column 1
                      {
                        elem: 'column',
                        content: [
                          {
                            block: 'menu-group',
                            content: [
                              { block: 'title', mods: { gold: true }, tag: 'h2', content: 'Appetisers' },
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
                                  { elem: 'head', content: [
                                    { elem: 'name', tag: 'span', content: 'Tzatsiki' },
                                    { elem: 'price', tag: 'span', content: '$3.99' }
                                  ]},
                                  { elem: 'descr', tag: 'p', content: 'Refreshing traditional cucumber and garlic yoghurt dip.' }
                                ]
                              },
                              {
                                block: 'dish',
                                content: [
                                  { elem: 'head', content: [
                                    { elem: 'name', tag: 'span', content: 'Aubergine Salad' },
                                    { elem: 'price', tag: 'span', content: '$5.50' }
                                  ]},
                                  { elem: 'descr', tag: 'p', content: 'Pureed eggplant, garlic, green pepper and tomato dip.' }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      // column 2 (abbrev)
                      {
                        elem: 'column',
                        content: [
                          {
                            block: 'menu-group',
                            content: [
                              { block: 'title', mods: { gold: true }, tag: 'h2', content: 'Starters' },
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
                                  { elem: 'head', content: [
                                    { elem: 'name', tag: 'span', content: 'Haloumi' },
                                    { elem: 'price', tag: 'span', content: '$3.99' }
                                  ]},
                                  { elem: 'descr', tag: 'p', content: 'Refreshing traditional cucumber and garlic yoghurt dip.' }
                                ]
                              },
                              {
                                block: 'dish',
                                mods: { special: true },
                                content: [
                                  { elem: 'tag', tag: 'span', content: 'Special' },
                                  { elem: 'head', content: [
                                    { elem: 'name', tag: 'span', content: 'Roast Lamb' },
                                    { elem: 'price', tag: 'span', content: '$5.50' }
                                  ]},
                                  { elem: 'descr', tag: 'p', content: 'Pureed eggplant, garlic, green pepper and tomato dip.' }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                }
              ]
            }
            // ... other sections abbreviated for brevity; full structure follows same pattern
          ]
        },
        // FOOTER
        {
          block: 'footer',
          content: [
            {
              elem: 'inner',
              mix: [{ block: 'container' }],
              content: [
                {
                  elem: 'col',
                  content: [
                    { elem: 'title', tag: 'h3', content: 'About Us' },
                    {
                      block: 'divider',
                      mods: { footer: true },
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
                        ' patisserie, featuring breakfasts of fresh croissants and steaming bowls of café.',
                        { tag: 'br' },
                        'Lamda the best restaurant in town'
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
                      mods: { footer: true },
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
                    },
                    {
                      block: 'payments',
                      tag: 'ul',
                      content: [
                        { elem: 'item', tag: 'li', content: { tag: 'i', attrs: { class: 'fa-brands fa-cc-paypal' } } },
                        { elem: 'item', tag: 'li', content: { tag: 'i', attrs: { class: 'fa-brands fa-cc-mastercard' } } },
                        { elem: 'item', tag: 'li', content: { tag: 'i', attrs: { class: 'fa-brands fa-cc-visa' } } },
                        { elem: 'item', tag: 'li', content: { tag: 'i', attrs: { class: 'fa-brands fa-cc-amex' } } }
                      ]
                    }
                  ]
                },
                {
                  elem: 'col',
                  content: [
                    { elem: 'title', tag: 'h3', content: 'Our Location' },
                    {
                      block: 'divider',
                      mods: { footer: true },
                      content: [
                        { elem: 'line' },
                        { elem: 'img', tag: 'img', attrs: { src: 'assets/img/divider-footer.png', alt: '', width: 199, height: 19 } },
                        { elem: 'line' }
                      ]
                    },
                    {
                      elem: 'text',
                      tag: 'p',
                      content: ['19th Paradise Street Sitia', { tag: 'br' }, '128 Meserole Avenue']
                    },
                    {
                      block: 'social',
                      mods: { footer: true },
                      tag: 'ul',
                      content: [
                        { tag: 'li', content: { elem: 'link', tag: 'a', attrs: { href: '#', 'aria-label': 'Facebook' }, content: { tag: 'i', attrs: { class: 'fa-brands fa-facebook-f' } } } },
                        { tag: 'li', content: { elem: 'link', tag: 'a', attrs: { href: '#', 'aria-label': 'YouTube' }, content: { tag: 'i', attrs: { class: 'fa-brands fa-youtube' } } } },
                        { tag: 'li', content: { elem: 'link', tag: 'a', attrs: { href: '#', 'aria-label': 'Twitter' }, content: { tag: 'i', attrs: { class: 'fa-brands fa-twitter' } } } },
                        { tag: 'li', content: { elem: 'link', tag: 'a', attrs: { href: '#', 'aria-label': 'Vimeo' }, content: { tag: 'i', attrs: { class: 'fa-brands fa-vimeo-v' } } } }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        { tag: 'script', attrs: { src: 'js/main.js' } }
      ]
    }
  ]
};
