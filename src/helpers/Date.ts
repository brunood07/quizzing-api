import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function compareInHours(start_date: Date, end_date: Date): number {
  const end_date_utc = this.convertToUTC(end_date);
  const start_date_utc = this.convertToUTC(start_date);

  return dayjs(end_date_utc).diff(start_date_utc, 'hours');
}

export function convertToUTC(date: Date): string {
  return dayjs(date).utc().local().format();
}

export function dateNow(): Date {
  return dayjs().toDate();
}

export function compareInDays(start_date: Date, end_date: Date): number {
  const end_date_utc = this.convertToUTC(end_date);
  const start_date_utc = this.convertToUTC(start_date);

  return dayjs(end_date_utc).diff(start_date_utc, 'days');
}

export function addDays(days: number): Date {
  return dayjs().add(days, 'days').toDate();
}

export function addHours(hours: number): Date {
  return dayjs().add(hours, 'hours').toDate();
}

export function compareIfBefore(start_date: Date, end_date: Date): boolean {
  return dayjs(start_date).isBefore(end_date);
}
