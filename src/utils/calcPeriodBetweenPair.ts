import { ProjectsDictRecord } from "../types/projects";

const MILLISECONDS_TO_DAYS_CONVERSION_PARAM = 1000 * 60 * 60 * 24;

const getDiffInDays = (date1: Date, date2: Date) => {
  // Here we consider that date1 is before date 2
  console.log(date1);
  console.log(date2);
  const diffTime = date2.getTime() - date1.getTime();
  return Math.ceil(diffTime / MILLISECONDS_TO_DAYS_CONVERSION_PARAM);
};

const calcPeriodBetweenPair = (
  employee1: ProjectsDictRecord,
  employee2: ProjectsDictRecord
) => {
  let firstParm = undefined;
  let secondParam = undefined;
  if (employee1.dateFrom.getTime() < employee2.dateFrom.getTime()) {
    firstParm = employee2.dateFrom;
    secondParam = employee1.dateTo;
  } else if (employee1.dateFrom.getTime() > employee2.dateFrom.getTime()) {
    firstParm = employee1.dateFrom;
    secondParam = employee2.dateTo;
  } else {
    firstParm = employee1.dateFrom;
    secondParam =
      employee1.dateTo.getTime() < employee2.dateTo.getTime()
        ? employee1.dateTo
        : employee2.dateTo;
  }

  if (firstParm && secondParam) {
    const result = getDiffInDays(firstParm, secondParam);
    if (result >= 0) {
      return result;
    }
  }
};

export default calcPeriodBetweenPair;
