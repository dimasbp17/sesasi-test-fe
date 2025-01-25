import { parseISO, format } from 'date-fns';

export const FormattedDate = ({ date }) => {
  try {
    const parsedDate = parseISO(date);
    const formattedDate = format(parsedDate, 'd MMM yyyy, HH:mm');
    return <span>{formattedDate}</span>;
  } catch (error) {
    return <span>Invalid Date</span>;
  }
};
