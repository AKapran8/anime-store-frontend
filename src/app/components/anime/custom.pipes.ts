import { IServerAnime, IAnime } from './anime.mode';

export const convertTimeToText = (totalTime: number): string => {
  const hours: number = Math.floor(totalTime / 60);
  const minutes: number = totalTime % 60;

  const hoursText: string = hours ? `${hours} hour${_getTimeEnd(hours)}` : '';
  const minutesText: string = minutes
    ? `${minutes} minute${_getTimeEnd(minutes)}`
    : '';

  switch (true) {
    case !!hoursText && !!minutesText: {
      return `${hoursText} and ${minutesText}`;
    }
    case !!hoursText: {
      return hoursText;
    }
    default: {
      return minutesText;
    }
  }
};

const _getTimeEnd = (num: number): string => {
  return num > 1 ? 's' : '';
};

export const getStarsDescription = (value: number): string => {
  return starsDescrList[value];
};

export const starsDescrList: string[] = [
  'Жах: Аніму зовсім не варте перегляду. Жахлива ідея, відсутність відчуття гумору і глибини, не зачепило, марна трата часу',
  'Дуже слабо: Аніме має низьку якість, занадто банальний або занадто складний сюжет, не цікаві персонажі та погані ефекти.',
  'Переважно погано: Аніме має деякі позитивні моменти, але загалом воно погане.',
  'Середній рівень: Аніме не вражає своєю оригінальністю або надзвичайною якістю, але воно також не заслуговує на низький бал.',
  "Прийнятно: Аніме можна переглянути, але воно не є особливо пам'ятним або вражаючим.",
  'Добре: Аніме має свої позитивні моменти, але воно також має недоліки. Воно добре зробление, але не вражає своєю оригінальністю або якістю.',
  'Дуже добре: Аніме має свої позитивні моменти, які роблять цу вартим уваги. Є оригінальна ідея та ефекти.',
  'Відмінно: Аніме дуже добре зроблене, має оригінальну ідею, глибокі персонажі, непередбачуваний сюжет та вражаючі ефекти',
  "Шедевр: Аніме вражає своєю оригінальністю, якістю та глибиною.Є непередбачуваний сюжет, хороша режисура, незабутні персонажі та вражаючі ефекти.Це твір мистецтва, який обов'язково варто переглянути.",
  'Шедевр, який вартий перегляду: Аніме є одним з найкращих у своєму жанрі. Воно має все - оригінальну ідею, глибоких персонажів та вражаючі ефекти.Це шедевр, який варто переглянути не тільки фанатам жанру, але і тим, хто просто любить дивитися хороше аніме.',
];

export const getModifiedAnimeItemComponent = (
  elem: IServerAnime
): IAnime => {
  const modifiedEl: IAnime = {
    id: elem._id,
    name: elem.name,
    nameUA: elem.nameUA,
    stars: elem.stars,
    time: elem.time,
    genres: elem.genres,
    status: elem.status,
    heroes: elem.heroes,
    quotes: elem.quotes,
  };

  return modifiedEl;
};
