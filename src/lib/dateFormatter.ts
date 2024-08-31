import { formatDistance } from "date-fns";

export const dateFormatter = (date: Date | string) => {
  return formatDistance(date, new Date(), { addSuffix: true });
};
