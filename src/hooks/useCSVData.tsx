import { useCallback, useState } from "react";
import Papa from "papaparse";

const useCSVData = <T,>() => {
  const [headers, setHeaders] = useState<string[]>();
  const [rows, setRows] = useState<string[][]>();
  const [data, setData] = useState<T[]>();

  const handleFileParse = useCallback((fileList: FileList) => {
    Papa.parse(fileList[0], {
      header: true,
      skipEmptyLines: true,

      complete: (results: Papa.ParseResult<T>) => {
        if (results.data) {
          setHeaders(results.meta.fields);
          setRows(results.data.map((obj) => Object.values(obj as object)));
          setData(results.data);
        }
      },
    });
  }, []);

  return { headers, rows, data, onFileParse: handleFileParse };
};

export default useCSVData;
