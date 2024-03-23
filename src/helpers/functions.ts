export const convertTimestampToDateString = (timestamp: string) => {
  const dateObj = timestamp ? new Date(timestamp) : new Date();
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  const dateString = `${day}/${month}/${year}`;
  return dateString;
};
