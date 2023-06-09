import React, { useCallback } from "react";
import Table from "./components/Table";
import CSVInput from "./components/CSVInput";
import PairedEmployees from "./components/PairedEmployees";
import useCSVData from "./hooks/useCSVData";
import CSVData from "./types/CSVData";

const App = () => {
  const { headers, rows, data, onFileParse } = useCSVData<CSVData>();

  const CSVInputChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const fileList = event.target.files;
        if (fileList) {
          onFileParse(fileList);
        }
      },
      [onFileParse]
    );

  return (
    <div>
      <CSVInput onChange={CSVInputChangeHandler} />
      {headers && rows ? <Table headers={headers} rows={rows} /> : null}
      {data ? (
        <PairedEmployees data={data}>
          {(props) => (
            <div>{`${props.employee1Id} and ${props.employee2Id} is the longest period pair ${props.periodInDays} day(s).`}</div>
          )}
        </PairedEmployees>
      ) : null}
    </div>
  );
};

export default App;
