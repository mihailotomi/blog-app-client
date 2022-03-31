export const renderCreationTime = (date) => {
  const timeInMin = Math.floor((Date.now() - Date.parse(date)) / 1000 / 60);
  const timeInHours = Math.floor(
    (Date.now() - Date.parse(date)) / 1000 / 60 / 60
  );
  const timeInDays = Math.floor(
    (Date.now() - Date.parse(date)) / 1000 / 60 / 60 / 24
  );
  const text =
    timeInMin < 1
      ? "just now"
      : timeInMin < 60
      ? `${timeInMin} minutes ago`
      : timeInHours < 24
      ? `${timeInHours} hours ago`
      : `${timeInDays} days ago`;
  return text;
};
