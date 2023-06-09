export type ProjectsDictRecord = {
  employeeId: string;
  dateFrom: Date;
  dateTo: Date;
};

export default interface ProjectsDict {
  [key: string]: ProjectsDictRecord[];
}
