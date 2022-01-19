import config from '../config';

function setPath(path) {
  if (config.global.env === 'development') return path;
  return [config.path, path].join('');
}

export default [
  {
    title: 'kolobki',
    list: [
      {
        icon: setPath(require('@/assets/crazy2.gif')),
        title: 'crazy2',
        size: 27,
      },
    ],
  },
  {
    title: 'itstickers',
    list: [
      {
        icon: 'https://natelegram.ru/wp-content/uploads/2017/11/IItstickers-8.png',
        title: 'У меня амнезия, кто вы и какой проект?',
      },
      {
        icon: 'https://natelegram.ru/wp-content/uploads/2017/11/IItstickers-13.png',
        title: 'Ну чё там, чё там? Готово? Готово?',
      },
    ],
  },
  {
    title: 'terebonk_2',
    list: [
      {
        icon: 'https://s.tcdn.co/e65/38d/e6538d88-ed55-39d9-a67f-ad97feea9c01/22.png',
        title: 'С ДР',
      },
    ],
  },
  {
    title: 'odessastickers',
    list: [
      {
        icon: 'https://natelegram.ru/wp-content/uploads/2017/11/StickOdessa-1.png',
        title: 'Ты говоришь обидно',
      },
      {
        icon: 'https://natelegram.ru/wp-content/uploads/2017/11/StickOdessa-3.png',
        title: 'Ой, не надо меня уговаривать, я и так соглашусь',
      },
      {
        icon: 'https://natelegram.ru/wp-content/uploads/2017/11/StickOdessa-21.png',
        title: 'Будем посмотреть',
      },
      {
        icon: 'https://natelegram.ru/wp-content/uploads/2017/11/StickOdessa-22.png',
        title: 'Шо вы мне сердце рвёте?',
      },
      {
        icon: 'https://natelegram.ru/wp-content/uploads/2017/11/StickOdessa-46.png',
        title: 'Оно вам надо?',
      },
      {
        icon: 'https://natelegram.ru/wp-content/uploads/2017/11/StickOdessa-57.png',
        title: 'Я весь одно большое ухо',
      },
    ],
  },
  {
    title: 'corrections',
    list: [
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/1.png',
        title: 'А есть ещё варианты?',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/2.png',
        title: 'Где макет?',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/5.png',
        title: 'Вздыхает',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/7.png',
        title: 'А тебе самому-то нравится?',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/8.png',
        title: 'Есть пара нюансов',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/9.png',
        title: 'Давай подумаем ещё',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/10.png',
        title: 'Ты же профессионал',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/11.png',
        title: 'Как-то грустно',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/12.png',
        title: 'Всё хуйня переделывай',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/14.png',
        title: 'Нужно как у эпл',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/15.png',
        title: 'Нет вау',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/16.png',
        title: 'Ну, такое',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/17.png',
        title: 'Миленько',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/21.png',
        title: 'Принято',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/22.png',
        title: 'Нравится',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/23.png',
        title: 'Спасибо',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/24.png',
        title: 'Услышал',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/25.png',
        title: 'Ясно',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/26.png',
        title: 'Понятно',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/27.png',
        title: '5 минут',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/28.png',
        title: 'Будет',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/29.png',
        title: 'Сделано',
      },
      {
        icon: 'https://s.tcdn.co/988/e97/988e9751-3dab-3606-902b-230563e114a3/30.png',
        title: 'Сегодня к вечеру',
      },
    ],
  },
  {
    title: 'websokol',
    list: [
      {
        icon: 'https://tgram.ru/wiki/stickers/imagepng/websokol/websokol_1.png',
        title: 'Ребята совещание',
      },
      {
        icon: 'https://tgram.ru/wiki/stickers/imagepng/websokol/websokol_2.png',
        title: 'Работаем дальше',
      },
      {
        icon: 'https://tgram.ru/wiki/stickers/imagepng/websokol/websokol_4.png',
        title: 'У меня есть пара идей',
      },
      {
        icon: 'https://tgram.ru/wiki/stickers/imagepng/websokol/websokol_5.png',
        title: 'Сайт должен приносить прибыль',
      },
    ],
  },
];
