export interface WorkingPeriodPair {
  employee1Id: string;
  employee2Id: string;
  periodInDays: number;
}

export default interface PairsDict {
  [key: string]: number;
}
