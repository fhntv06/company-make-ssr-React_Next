import { PublicationPage } from '@/views/publication-page';
import React from 'react';

const data = {
  id: 0,
  name: 'ORM для автодилеров: как повысить<br/>узнаваемость бренда через работу<br/>с&nbsp;отзывами',
  slug: 'orm-dlia-avtodilierov-kak-povysit-uznavaiemost-brienda-chieriez-rabotu-s-otzyvami',
  active: true,
  description: null,
  publication_date: '2024-06-25T00:00:00',
  created_at: '2024-06-25T00:00:00',
  updated_at: '2024-06-25T00:00:00',
  preview: null,
  tags: [
    {
      id: 0,
      type: 1,
      title: 'маркетинг',
    },
    {
      id: 1,
      type: 1,
      title: 'исследование',
    },
    {
      id: 1,
      type: 1,
      title: 'orm',
    },
  ],
  type: 1,
  author: {
    id: 1,
    name: 'Катя',
    surname: 'Титаева',
    description: 'head of hr',
    photo: {
      url: '/images/employees/make5.png',
    },
  },
  social_networks: [
    {
      id: 1,
      title: 'телеграм-канал',
      href: 'https://t.me/makeagency',
      children: [],
    },
  ],
  content_blocks: [
    {
      id: 0,
      big_text: '',
      small_text: '',
      text: '',
      content: ``,
      small_content: '',
      images: [
        {
          id: 0,
          iframe: `
            <iframe src="https://www.youtube.com/embed/3y8rCyrbs50?si=IHx0R-f8_rLI2dT9&autoplay=0&vq=hd1080" frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" width="100%" height="100%"></iframe>
          `,
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
      id: 1,
      big_text: '',
      small_text: '',
      text: '',
      content: `
      <p class="lead">
        Прежде чем посетить автосалон и приобрести автомобиль, около 90% клиентов читают отзывы в интернете.
        Поэтому на образ и общее впечатление бренда влияет то, какую информацию о нем пишут в сети. Мнение других клиентов помогает аудитории сформировать свою позицию, а также может повлиять на принятие решения о покупке товара или услуги
      </p>
      <p>
        ORM (Online Reputation Management) – инструмент, который позволяет повысить продажи и узнаваемость, а еще – улучшить репутацию автосалона в интернете
      </p>
      <p>
        Ключевая цель ORM – отработка негативных реакций клиентов, а также публикация положительных упоминаний. Такой комплекс мер позволяет создавать имидж, что приводит к увеличению продаж.</p><p>ORM имеет положительные и негативные стороны. Плюсы:
      </p>
      <ul>
        <li>Взаимодействие со всеми видами отзывов</li>
        <li>Увеличение позитивных упоминаний</li>
        <li>Работа с негативными отзывами</li>
        <li>Анализ проблемных ситуаций и улучшения сервиса</li>
      </ul>
      <p>Минусы:</p>
      <ol>
        <li>Взаимодействие со всеми видами отзывов</li>
        <li>Увеличение позитивных упоминаний</li>
        <li>Работа с негативными отзывами</li>
        <li>Анализ проблемных ситуаций и улучшения сервиса</li>
      </ol>
      <h3>
        заголовок второго уровня: текстовые приколы
      </h3>
      <h4>
        заголовок третьего уровня
      </h4>
      <p>
        если будет нужен заголовок ещё одного уровня, то используем обычный текстовый стиль. например:
      </p>
      <p>
        выделенный текст и цитата
      </p>
      `,
      small_content: '',
      images: [],
      content_block_type: 1,
      files: [],
    },
    {
      id: 3,
      big_text: '',
      small_text: '',
      text: '',
      content: '',
      small_content:
        'небольшой выделенный блок текста служит для того, чтобы сфокусировать внимание на какой-либо мысли. не рекомендуется злоупотреблять этим инструментом: два подряд таких блока использовать нельзя, как и выделять длинный текст',
      images: [],
      content_block_type: 4,
      files: [],
    },
    {
      id: 4,
      big_text: '',
      small_text: '',
      text: '',
      content: `
      <p>
        цитата — тот же выделенный текстовый блок, только с авторством. используется небольшая фотография, имя-фамилия, должность
      </p>
      `,
      small_content: '',
      images: [],
      content_block_type: 1,
      files: [],
    },
    {
      id: 5,
      big_text: '',
      small_text: 'Вера Гитциграт',
      text: 'руководитель отдела маркетинга нефтетранссервиса',
      content: '',
      small_content:
        'небольшой выделенный блок текста служит для того, чтобы сфокусировать внимание на какой-либо мысли. не рекомендуется злоупотреблять этим инструментом: два подряд таких блока использовать нельзя, как и выделять длинный текст',
      images: [
        {
          id: 0,
          iframe: null,
          media: {
            url: '/images/employees/make10.png',
          },
          subtext: '',
        },
      ],
      content_block_type: 5,
      files: [],
    },
    {
      id: 6,
      big_text: '',
      small_text: '',
      text: '',
      content: `
      <p>
        цитата — тот же выделенный текстовый блок, только с авторством. используется небольшая фотография, имя-фамилия, должность
      </p>
      <p>
        <a href='#0'><strong>ссылки в тексте</strong></a>
      </p>
      <p>
        ссылка в тексте — обычная подчёркнутая <a href="#0">ссылка</a> без каких-либо заморочек
      </p>
      <h3>
        графика
      </h3>
      <p>
        могут быть и другими, но не вертикальными. в галерее все картинки должны быть одинаковыми. 
      </p>
      <h4>
        картинки и видео
      </h4>
      <p>
        видео — айфреймы с видеохостингов. у графики может быть своё небольшое текстовое описание
      </p>
      `,
      small_content: '',
      images: [],
      content_block_type: 1,
      files: [],
    },
    {
      id: 7,
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
          subtext: '',
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
      id: 8,
      big_text: '',
      small_text: '',
      text: '',
      content: `
      <h3>
        галерея
      </h3>
      <p>
        видео — айфреймы с видеохостингов. у графики может быть своё небольшое текстовое описание
      </p>
      `,
      small_content: '',
      images: [],
      content_block_type: 1,
      files: [],
    },
    {
      id: 9,
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
            url: '/images/gallery/gallery1.jpg',
            type: 'image/jpeg',
            aggregate_type: 'image',
            extension: 'jpg',
          },
          subtext: 'необязательно описание картинки или видео',
        },
        {
          id: 1,
          iframe: null,
          media: {
            url: '/images/gallery/gallery2.jpg',
            type: 'image/jpeg',
            aggregate_type: 'image',
            extension: 'jpg',
          },
          subtext: 'необязательно описание картинки или видео',
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
          subtext: 'необязательно описание картинки или видео',
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
          subtext: 'необязательно описание картинки или видео',
        },
      ],
      content_block_type: 8,
      files: [],
    },
    {
      id: 4,
      big_text: '',
      small_text: '',
      text: '',
      content: `
      <p>
        видео — айфреймы с видеохостингов. у графики может быть своё небольшое текстовое описание
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
  return <PublicationPage data={data} />;
}
