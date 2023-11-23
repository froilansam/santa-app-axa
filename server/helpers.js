// Function to check if a date is less than 10 years old
const isDateLessThan10YearsOld = (dateString) => {
  const inputDate = new Date(dateString);
  const currentDate = new Date();
  const differenceInMilliseconds = currentDate.getTime() - inputDate.getTime();
  const differenceInYears =
    differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
  return differenceInYears < 10;
};

exports.isDateLessThan10YearsOld = isDateLessThan10YearsOld;
