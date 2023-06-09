import React, { useCallback, useEffect, useState } from "react";
import calcPeriodBetweenPair from "../../utils/calcPeriodBetweenPair";
import PairsDict, { WorkingPeriodPair } from "../../types/pairs";
import ProjectsDict from "../../types/projects";
import CSVData from "../../types/CSVData";

type ChildrenProps = WorkingPeriodPair;

interface Props {
  data: CSVData[];
  children: React.FC<ChildrenProps>;
}

const PairedEmployees: React.FC<Props> = ({ data, children }) => {
  const [longestPeriodPair, setLongestPeriodPair] =
    useState<WorkingPeriodPair>();

  const calculateLongestPeriodPair = useCallback(() => {
    const pairsDict: PairsDict = {};
    const projectsDict: ProjectsDict = {};
    let bestPairResult: WorkingPeriodPair | undefined = undefined;
    data.forEach((field) => {
      const newProjectsDictRecord = {
        employeeId: field.EmpID,
        dateFrom: new Date(new Date(field.DateFrom).toDateString()),
        dateTo:
          field.DateTo.toUpperCase() === "NULL"
            ? new Date(new Date().toDateString())
            : new Date(field.DateTo),
      };
      if (projectsDict[field.ProjectID]) {
        projectsDict[field.ProjectID].forEach((projectEmployeeRecord) => {
          const periodInDays = calcPeriodBetweenPair(
            projectEmployeeRecord,
            newProjectsDictRecord
          );
          if (periodInDays) {
            const pairKeyTokens = [
              projectEmployeeRecord.employeeId,
              newProjectsDictRecord.employeeId,
            ];
            pairKeyTokens.sort();
            const pairKey = pairKeyTokens.join("-");
            if (!pairsDict[pairKey]) {
              pairsDict[pairKey] = 0;
            }
            pairsDict[pairKey] += periodInDays;
            if (
              !bestPairResult ||
              bestPairResult.periodInDays <= periodInDays
            ) {
              bestPairResult = {
                employee1Id: pairKeyTokens[0],
                employee2Id: pairKeyTokens[1],
                periodInDays: periodInDays,
              };
            }
          }
        });
      } else {
        projectsDict[field.ProjectID] = [];
      }
      projectsDict[field.ProjectID].push(newProjectsDictRecord);
    });

    console.log(pairsDict);
    setLongestPeriodPair(bestPairResult);
  }, [data]);

  useEffect(() => {
    calculateLongestPeriodPair();
  }, [calculateLongestPeriodPair]);

  if (!longestPeriodPair) {
    return <div>No Longest Period</div>;
  }

  return children(longestPeriodPair);
};

export default PairedEmployees;
