// import React, { useState } from 'react';
// import '../styles/styles.css';
// import { evaluateFormula } from '../utils/formulaParser';

// const Spreadsheet = () => {
//   const [data, setData] = useState({});

//   const handleInput = (row, col, value) => {
//     const key = `${row},${col}`;
//     const newData = { ...data, [key]: value };
//     setData(newData);
//   };

//   const renderCell = (row, col) => {
//     const key = `${row},${col}`;
//     const value = data[key] || '';
//     const displayValue = value.startsWith('=') ? evaluateFormula(value, data) : value;

//     return (
//       <div
//         key={key}
//         className="cell"
//         contentEditable
//         onInput={(e) => handleInput(row, col, e.target.textContent)}
//         suppressContentEditableWarning={true}
//       >
//         {displayValue}
//       </div>
//     );
//   };

//   const renderGrid = () => {
//     const rows = 10; // Number of rows
//     const cols = 10; // Number of columns
//     const grid = [];

//     for (let row = 0; row <= rows; row++) {
//       for (let col = 0; col <= cols; col++) {
//         if (row === 0 && col === 0) {
//           grid.push(
//             <div key={`header-${row}-${col}`} className="cell header"></div>
//           );
//         } else if (row === 0) {
//           grid.push(
//             <div key={`header-col-${col}`} className="cell header">
//               {String.fromCharCode(65 + col - 1)}
//             </div>
//           );
//         } else if (col === 0) {
//           grid.push(
//             <div key={`header-row-${row}`} className="cell header">
//               {row}
//             </div>
//           );
//         } else {
//           grid.push(renderCell(row, col - 1));
//         }
//       }
//     }

//     return <div className="grid">{grid}</div>;
//   };

//   return <div>{renderGrid()}</div>;
// };

// export default Spreadsheet;
// import React, { useState } from 'react';
// import '../styles/styles.css';
// import { evaluateFormula } from '../utils/formulaParser';

// const Spreadsheet = () => {
//   const [data, setData] = useState({});
//   const [result, setResult] = useState(''); // Store the result of calculations
//   const [range, setRange] = useState('');  // Store the selected range (e.g., A1:A3)

//   const handleInput = (row, col, value) => {
//     const key = `${row},${col}`;
//     const newData = { ...data, [key]: value };
//     setData(newData);
//   };

//   const handleCalculation = (type) => {
//     if (!range) {
//       setResult('Please specify a range (e.g., A1:A3)');
//       return;
//     }
//     const formula = `=${type}(${range})`;
//     const calculatedResult = evaluateFormula(formula, data);
//     setResult(`${type}(${range}) = ${calculatedResult}`);
//   };

//   const renderCell = (row, col) => {
//     const key = `${row},${col}`;
//     const value = data[key] || '';
//     const displayValue = value.startsWith('=') ? evaluateFormula(value, data) : value;

//     return (
//       <div
//         key={key}
//         className="cell"
//         contentEditable
//         onInput={(e) => handleInput(row, col, e.target.textContent)}
//         suppressContentEditableWarning={true}
//       >
//         {displayValue}
//       </div>
//     );
//   };

//   const renderGrid = () => {
//     const rows = 10; // Number of rows
//     const cols = 10; // Number of columns
//     const grid = [];

//     for (let row = 0; row <= rows; row++) {
//       for (let col = 0; col <= cols; col++) {
//         if (row === 0 && col === 0) {
//           grid.push(
//             <div key={`header-${row}-${col}`} className="cell header"></div>
//           );
//         } else if (row === 0) {
//           grid.push(
//             <div key={`header-col-${col}`} className="cell header">
//               {String.fromCharCode(65 + col - 1)}
//             </div>
//           );
//         } else if (col === 0) {
//           grid.push(
//             <div key={`header-row-${row}`} className="cell header">
//               {row}
//             </div>
//           );
//         } else {
//           grid.push(renderCell(row, col - 1));
//         }
//       }
//     }

//     return <div className="grid">{grid}</div>;
//   };

//   return (
//     <div>
//       <div>{renderGrid()}</div>
//       <div className="controls">
//         <input
//           type="text"
//           placeholder="Enter range (e.g., A1:A3)"
//           value={range}
//           onChange={(e) => setRange(e.target.value)}
//           className="range-input"
//         />
//         <button onClick={() => handleCalculation('SUM')}>SUM</button>
//         <button onClick={() => handleCalculation('AVERAGE')}>AVERAGE</button>
//         <button onClick={() => handleCalculation('MAX')}>MAX</button>
//         <button onClick={() => handleCalculation('MIN')}>MIN</button>
//         <button onClick={() => handleCalculation('COUNT')}>COUNT</button>
//       </div>
//       <div className="result">{result}</div>
//     </div>
//   );
// };

// export default Spreadsheet;

import React, { useState } from 'react';
import '../styles/styles.css';
import { evaluateFormula } from '../utils/formulaParser';

const Spreadsheet = () => {
  const [data, setData] = useState({});
  const [result, setResult] = useState(''); // Stores calculation results
  const [range, setRange] = useState('');  // Stores the range for operations
  const [findText, setFindText] = useState(''); // Find text
  const [replaceText, setReplaceText] = useState(''); // Replace text

  const handleInput = (row, col, value) => {
    const key = `${row},${col}`;
    const newData = { ...data, [key]: value };
    setData(newData);
  };

  const handleCalculation = (type) => {
    if (!range) {
      setResult('Please specify a range (e.g., A1:A3)');
      return;
    }
    const formula = `=${type}(${range})`;
    const calculatedResult = evaluateFormula(formula, data);
    setResult(`${type}(${range}) = ${calculatedResult}`);
  };

  const handleDataQuality = (type) => {
    const newData = { ...data };
    if (type === 'REMOVE_DUPLICATES' && range) {
      const [start, end] = range.split(':');
      const startCol = start.charCodeAt(0) - 65;
      const startRow = parseInt(start.slice(1));
      const endCol = end.charCodeAt(0) - 65;
      const endRow = parseInt(end.slice(1));
      const rows = [];

      for (let row = startRow; row <= endRow; row++) {
        const rowValues = [];
        for (let col = startCol; col <= endCol; col++) {
          const key = `${row},${col}`;
          rowValues.push(newData[key] || '');
        }
        rows.push(rowValues.join(','));
      }

      const uniqueRows = Array.from(new Set(rows));
      uniqueRows.forEach((row, rowIndex) => {
        const values = row.split(',');
        values.forEach((value, colIndex) => {
          const key = `${startRow + rowIndex},${startCol + colIndex}`;
          newData[key] = value;
        });
      });

      for (let row = startRow + uniqueRows.length; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          const key = `${row},${col}`;
          delete newData[key];
        }
      }
    } else if (range) {
      const [start, end] = range.split(':');
      const startCol = start.charCodeAt(0) - 65;
      const startRow = parseInt(start.slice(1));
      const endCol = end.charCodeAt(0) - 65;
      const endRow = parseInt(end.slice(1));

      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          const key = `${row},${col}`;
          const value = newData[key] || '';
          if (type === 'TRIM') {
            newData[key] = value.trim();
          } else if (type === 'UPPER') {
            newData[key] = value.toUpperCase();
          } else if (type === 'LOWER') {
            newData[key] = value.toLowerCase();
          }
        }
      }
    }
    setData(newData);
  };

  const handleFindAndReplace = () => {
    const newData = { ...data };
    Object.keys(newData).forEach((key) => {
      if (newData[key].includes(findText)) {
        newData[key] = newData[key].replace(new RegExp(findText, 'g'), replaceText);
      }
    });
    setData(newData);
  };

  const renderCell = (row, col) => {
    const key = `${row},${col}`;
    const value = data[key] || '';
    const displayValue = value.startsWith('=') ? evaluateFormula(value, data) : value;

    return (
      <div
        key={key}
        className="cell"
        contentEditable
        onInput={(e) => handleInput(row, col, e.target.textContent)}
        suppressContentEditableWarning={true}
      >
        {displayValue}
      </div>
    );
  };

  const renderGrid = () => {
    const rows = 10; // Number of rows
    const cols = 10; // Number of columns
    const grid = [];

    for (let row = 0; row <= rows; row++) {
      for (let col = 0; col <= cols; col++) {
        if (row === 0 && col === 0) {
          grid.push(
            <div key={`header-${row}-${col}`} className="cell header"></div>
          );
        } else if (row === 0) {
          grid.push(
            <div key={`header-col-${col}`} className="cell header">
              {String.fromCharCode(65 + col - 1)}
            </div>
          );
        } else if (col === 0) {
          grid.push(
            <div key={`header-row-${row}`} className="cell header">
              {row}
            </div>
          );
        } else {
          grid.push(renderCell(row, col - 1));
        }
      }
    }

    return <div className="grid">{grid}</div>;
  };

  return (
    <div>
      <div>{renderGrid()}</div>
      <div className="controls">
        <input
          type="text"
          placeholder="Enter range (e.g., A1:A3)"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="range-input"
        />
        <button onClick={() => handleCalculation('SUM')}>SUM</button>
        <button onClick={() => handleCalculation('AVERAGE')}>AVERAGE</button>
        <button onClick={() => handleCalculation('MAX')}>MAX</button>
        <button onClick={() => handleCalculation('MIN')}>MIN</button>
        <button onClick={() => handleCalculation('COUNT')}>COUNT</button>
        <button onClick={() => handleDataQuality('TRIM')}>TRIM</button>
        <button onClick={() => handleDataQuality('UPPER')}>UPPER</button>
        <button onClick={() => handleDataQuality('LOWER')}>LOWER</button>
        <button onClick={() => handleDataQuality('REMOVE_DUPLICATES')}>
          REMOVE DUPLICATES
        </button>
        <input
          type="text"
          placeholder="Find text"
          value={findText}
          onChange={(e) => setFindText(e.target.value)}
          className="find-input"
        />
        <input
          type="text"
          placeholder="Replace with"
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
          className="replace-input"
        />
        <button onClick={handleFindAndReplace}>FIND & REPLACE</button>
      </div>
      <div className="result">{result}</div>
    </div>
  );
};

export default Spreadsheet;
