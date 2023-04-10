export const convertTimeToText = (totalTime: number): string => {
  const hours: number = Math.floor(totalTime / 60);
  const minutes: number = totalTime % 60;

  const hoursText: string = `Hour${_getTimeEnd(hours)}`;
  const minutesText: string = `minute${_getTimeEnd(minutes)}`;

  const timeStr: string = `${hours} ${hoursText} and ${minutes} ${minutesText}`;

  return timeStr;
}


const _getTimeEnd = (num: number): string => {
  return num > 1 ? 's' : '';
}
