import React from 'react';
import { CaseInnerPage } from '@/views/case-inner-page';
import { Case } from '@/entities/case';

const data = {
  id: 1,
  categoryID: 1,
  date: '2023-03-13T02:55:00.000000Z',
  title: 'сайт объединённых кондитеров',
  url: 'https://uniconf.ru',
  slug: 'sait-obiedinionnykh-konditierov',
  description: 'корпоративный сайт крупнейшего кондитерского холдинга, интеграция с 1c-каталогом на 3500 позиций',
  logotype: {
    url: '/images/client_logotypes/uniconf-logos.png',
  },
  links: [
    {
      id: 0,
      title: 'объединённые кондитеры',
      href: '#0',
      children: [],
    },
    {
      id: 1,
      title: 'отзыв клиента',
      href: '#0',
      children: [],
    },
  ],
  tags: [
    {
      id: 0,
      type: 2,
      title: 'промышленность',
    },
    {
      id: 2,
      type: 1,
      title: 'корпоративный сайт',
    },
    {
      id: 3,
      type: 1,
      title: '3d-графика',
    },
    {
      id: 4,
      type: 1,
      title: 'техподдержка',
    },
  ],
  awards: [
    {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#F9CC1F',
    },
    {
      awardID: 1,
      title: 'title',
      description: 'description',
      color: '#D89774',
    },
    {
      awardID: 2,
      title: 'title',
      description: 'description',
      color: '#AD9058',
    },
    {
      awardID: 4,
      title: 'title',
      description: 'description',
      color: '#FE5639',
    },
  ],
  position: 4,
  media: {
    url: '/images/gallery/gallery3.jpg',
  },
  client: [],
  video: {
    src: '',
  },
  review: {
    id: 0,
    name: '',
    slug: '',
    description: 'команда выполнила поставленную задачу, предложив ряд нестандартных и интересных решений',
    media: {
      type: 'video',
      url: 'https://www.youtube.com/watch?v=XQZJFT6V_h4',
    },
    person: {
      id: 0,
      name: 'имя',
      surname: 'фамилия',
      description: 'самый главный человек',
      photo: {
        url: '/images/employees/make10.png',
      },
    },
    pdf: '#0',
  },
  team: [
    {
      department: 'менеджмент',
      members: [
        {
          id: 0,
          name: 'илья',
          surname: 'васильев',
          description: 'самый главный человек',
        },
        {
          id: 1,
          name: 'катя',
          surname: 'титаева',
          description: 'самый главный человек',
          photo: {
            url: '/images/employees/make5.png',
          },
        },
      ],
    },
    {
      department: 'артдирекшн',
      members: [
        {
          id: 0,
          name: 'саша',
          surname: 'кудрявцев',
          description: 'самый главный человек',
          photo: {
            url: '/images/employees/make6.png',
          },
        },
      ],
    },
    {
      department: 'дизайн',
      members: [
        {
          id: 0,
          name: 'никита',
          surname: 'капков',
          description: 'самый главный человек',
        },
        {
          id: 1,
          name: 'ринат',
          surname: 'шарипов',
          description: 'самый главный человек',
        },
      ],
    },
    {
      department: 'фронт',
      members: [
        {
          id: 0,
          name: 'никита',
          surname: 'капков',
          description: 'самый главный человек',
        },
        {
          id: 1,
          name: 'ринат',
          surname: 'шарипов',
          description: 'самый главный человек',
        },
      ],
    },
    {
      department: 'бэк',
      members: [
        {
          id: 0,
          name: 'никита',
          surname: 'капков',
          description: 'самый главный человек',
        },
        {
          id: 1,
          name: 'ринат',
          surname: 'шарипов',
          description: 'самый главный человек',
        },
      ],
    },
  ],
  content_blocks: [
    {
      id: 1,
      big_text: '',
      small_text: '',
      text: '',
      content: `
      <h3>
        клиент и задачи
      </h3>
      <p class="lead">
        объединённые кондитеры — крупнейший в россии кондитерский холдинг, владеет культовыми брендами: алёнка, бабаевский, красный октябрь, ротфронт и другими. холдинг объединяет агропромышленный кластер, 16 фабрик по всей стране и обширную торговую сеть 
      </p>
      <h4>
        задачи
      </h4>
      <p>
        <strong>корпоративные и информационные:</strong> раскрытие информации о холдинге, социальная ответственность, новости, hr
      </p>
      <p>
        <strong>брендинг, имиджевые:</strong> у холдинга нет чётко сформулированного айдентикой бренда. образ компании не складывается, как сумма её брендов — каждый из них существует сам по себе. это размывает позиционирование. необходимо через сайт выстроить позиционирование, завести знакомые всем бренды под одну крышу, заявить о масштабах холдинга и его конкурентных преимуществах
      </p>
      <p>
        <strong>продажи:</strong> каталог из 3500 наименований, заказная продукция, запрос коммерческого предложения, поиск дистрибьюторов и магазинов
      </p>
      `,
      small_content: '',
      images: [],
      content_block_type: 1,
      files: [],
    },
    {
      id: 2,
      big_text: '',
      small_text: '',
      text: '',
      content: '',
      small_content: '',
      images: [
        {
          id: 0,
          iframe: null,
          media: {
            url: '/images/publications/video.png',
          },
          subtext:
            'подпись к фотографии или видео — необзязательный элемент. стоит ввести в него ограничение по количеству символов. 200, может 250. потом будет видно',
        },
      ],
      content_block_type: 2,
      files: [],
    },
    {
      id: 3,
      big_text: '',
      small_text: '',
      text: '',
      content: `
      <p>
        у холдинга нет чётко сформулированного айдентикой бренда. образ компании 
        не складывается, как сумма её брендов — каждый из них существует сам по себе. это размывает позиционирование. необходимо через сайт выстроить позиционирование, завести знакомые всем бренды под одну крышу, заявить 
        о масштабах холдинга и его конкурентных преимуществах 
      </p>
      <p class="lead-big">
        Выделенный текст большой — так можно поступать только если очень-очень-очень нужно и блок должен быть мегакратким
      </p>
      <p>
        у холдинга нет чётко сформулированного айдентикой бренда. образ компании 
        не складывается, как сумма её брендов — каждый из них существует сам по себе. это размывает позиционирование. необходимо через сайт выстроить позиционирование, завести знакомые всем бренды под одну крышу, заявить 
        о масштабах холдинга и его конкурентных преимуществах 
      </p>
      `,
      small_content: '',
      images: [],
      content_block_type: 1,
      files: [],
    },
    {
      id: 4,
      big_text: '',
      small_text: '',
      text: '',
      content: ``,
      small_content: '',
      images: [
        {
          id: 0,
          iframe: null,
          media: {
            url: '/images/gallery/gallery3.jpg',
            type: 'image/jpeg',
            aggregate_type: 'image',
            extension: 'jpg',
          },
        },
        {
          id: 1,
          iframe: null,
          media: {
            url: '/images/gallery/gallery3.jpg',
            type: 'image/jpeg',
            aggregate_type: 'image',
            extension: 'jpg',
          },
        },
        {
          id: 2,
          iframe: null,
          media: {
            url: '/images/gallery/gallery3.jpg',
            type: 'image/jpeg',
            aggregate_type: 'image',
            extension: 'jpg',
          },
        },
        {
          id: 3,
          iframe: null,
          media: {
            url: '/images/gallery/gallery3.jpg',
            type: 'image/jpeg',
            aggregate_type: 'image',
            extension: 'jpg',
          },
        },
      ],
      content_block_type: 8,
      files: [],
    },
    {
      id: 5,
      big_text: '',
      small_text: '',
      text: '',
      content: `
      <p>
        у холдинга нет чётко сформулированного айдентикой бренда. образ компании 
        не складывается, как сумма её брендов — каждый из них существует сам по себе. это размывает позиционирование. необходимо через сайт выстроить позиционирование, завести знакомые всем бренды под одну крышу, заявить 
        о масштабах холдинга и его конкурентных преимуществах 
      </p>
      `,
      small_content: '',
      images: [],
      content_block_type: 1,
      files: [],
    },
    {
      id: 6,
      big_text: '',
      small_text: '',
      text: '',
      content: '',
      small_content: '',
      images: [
        {
          id: 0,
          iframe: null,
          media: {
            url: '/images/publications/video.png',
          },
          subtext: 'необязательно описание картинки или видео',
        },
        {
          id: 1,
          iframe: null,
          media: {
            url: '/images/publications/video.png',
          },
          subtext: 'необязательно описание картинки или видео',
        },
      ],
      content_block_type: 2,
      files: [],
    },
    {
      id: 7,
      big_text: '',
      small_text: '',
      text: '',
      content: `
      <h3>команда и технологии</h3>
      <p>
        над сайтом работала команда из 8 человек: менеджер, 3 дизайнера, 2 фронтенд-разработчика и 2 битрикс-программиста
      </p>
      <p>
        проект построен на cms битрикс. две крупных интеграции: 1с-каталог и яндекс.карты. полный список технологий:
      </p>
      <ul>
        <li><strong>cms, электронная коммерция:</strong> 1с-bitrix</li>
        <li><strong>аналитика:</strong> yandex.metrika, google analitics</li>
        <li><strong>js-библиотеки и фреймворки:</strong> core.js, gsap, stimulus, swiper</li>
      </ul>
      `,
      small_content: '',
      images: [],
      content_block_type: 1,
      files: [],
    },
    {
      id: 8,
      big_text: '',
      small_text: '',
      text: '',
      content: `
      <h3>результаты</h3>
      <p>
        над сайтом работала команда из 8 человек: менеджер, 3 дизайнера, 2 фронтенд-разработчика и 2 битрикс-программиста
      </p>
      <dl>
        <div>
          <dt>17</dt>
          <dd>в рейтинге подрядчиков для государства</dd>
        </div>
        <div>
          <dt>9</dt>
          <dd>в рейтинге подрядчиков для государства</dd>
        </div>
        <div>
        <dt>17</dt>
        <dd>текстовое наполнение</dd>
        </div>
      </dl>
      <p>
        над сайтом работала команда из 8 человек: менеджер, 3 дизайнера, 2 фронтенд-разработчика и 2 битрикс-программиста
      </p>
      `,
      small_content: '',
      images: [],
      content_block_type: 1,
      files: [],
    },
  ],
};

export default function page() {
  return <CaseInnerPage data={data as Case} />;
}
