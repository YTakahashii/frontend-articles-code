import { useMemo, useState } from 'react';

export type UseDateFormOptionsProps = {
  fromYear?: number;
  toYear?: number;
  yearOrder?: 'asc' | 'desc';
};

type DateField = 'year' | 'month' | 'day';

type Field<F extends DateField> = {
  [K in F]: number;
};

type DateFormOption<F extends DateField> = Field<F> & {
  value: string;
  label: string;
};

const getYearOptions = (from: number, to: number): DateFormOption<'year'>[] => {
  const options: DateFormOption<'year'>[] = [];

  for (let year = to; from <= year; year--) {
    options.push({
      year,
      value: year.toString(),
      label: `${year.toString()}年`,
    });
  }

  return options;
};

const getMonthOptions = (): DateFormOption<'month'>[] => {
  const months = [...Array.from(Array(12).keys())].map((month) => month + 1);

  return months.map((month) => ({
    month,
    value: month.toString().padStart(2, '0'),
    label: `${month.toString()}月`,
  }));
};

const getDayOptions = (): DateFormOption<'day'>[] => {
  const days = [...Array.from(Array(31).keys())].map((date) => date + 1);

  return days.map((day) => ({
    day,
    value: day.toString().padStart(2, '0'),
    label: `${day.toString()}日`,
  }));
};

export function useDateSelectOptions(props?: UseDateFormOptionsProps) {
  const fromYear = props?.fromYear ?? 1900;
  const [currentYear] = useState(() => new Date().getFullYear());
  const toYear = props?.toYear ?? currentYear;
  const yearOrder = props?.yearOrder ?? 'desc';

  const yearOptions = useMemo(
    () => (yearOrder === 'asc' ? getYearOptions(fromYear, toYear).reverse() : getYearOptions(fromYear, toYear)),
    [fromYear, toYear, yearOrder],
  );
  const monthOptions = useMemo(() => getMonthOptions(), []);
  const dayOptions = useMemo(() => getDayOptions(), []);

  return { yearOptions, monthOptions, dayOptions };
}
