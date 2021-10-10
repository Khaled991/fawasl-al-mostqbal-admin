const formatAMPM = (date: Date): string => {
  let hours: number = date.getHours();
  let minutes: string | number = date.getMinutes();
  const ampm: string = hours >= 12 ? "pm" : "am";

  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const strTime = `${hours}:${minutes} ${ampm}`;

  return strTime;
};
export default formatAMPM;
