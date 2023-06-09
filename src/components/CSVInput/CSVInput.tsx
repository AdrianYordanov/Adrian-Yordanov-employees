import React from "react";

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CSVInput: React.FC<Props> = (props) => {
  return (
    <input
      type="file"
      name="file"
      accept=".csv"
      style={{ display: "block", margin: "10px auto" }}
      {...props}
    />
  );
};

export default CSVInput;
