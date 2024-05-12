import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import * as XLSX from "xlsx";

function CollectDataExcelSheet() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const sigCanvas = useRef({});
  const [excelData, setExcelData] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const signature = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");

    const formData = { Name: name, Gender: gender, Signature: signature };

    setExcelData([...excelData, formData]);
    setName("");
    setGender("");
    clearSignature();
  };

  const saveExcelDataLocally = () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Form Data");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "form_data.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Gender:
          <select value={gender} onChange={handleGenderChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />
        <div>
          <label>E-Signature:</label>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{
              width: 400,
              height: 200,
              className: "sigCanvas",
            }}
          />
          <button onClick={clearSignature}>Clear</button>
        </div>
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={saveExcelDataLocally}>
          Save Data Locally
        </button>
      </form>
    </div>
  );
}

export default CollectDataExcelSheet;
