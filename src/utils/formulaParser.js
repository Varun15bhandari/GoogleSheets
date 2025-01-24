export const evaluateFormula = (formula, data) => {
    try {
      if (formula.startsWith('=')) {
        const expression = formula.slice(1);
  
        // Handle range-based functions like SUM, AVERAGE, etc.
        if (expression.startsWith('SUM(')) {
          return calculateRangeFunction('SUM', expression, data);
        } else if (expression.startsWith('AVERAGE(')) {
          return calculateRangeFunction('AVERAGE', expression, data);
        } else if (expression.startsWith('MAX(')) {
          return calculateRangeFunction('MAX', expression, data);
        } else if (expression.startsWith('MIN(')) {
          return calculateRangeFunction('MIN', expression, data);
        } else if (expression.startsWith('COUNT(')) {
          return calculateRangeFunction('COUNT', expression, data);
        }
  
        // Handle basic arithmetic and cell references
        const parsed = expression.replace(/[A-Z]\d+/g, (match) => {
          const col = match.charCodeAt(0) - 65; // Convert column letter to index
          const row = parseInt(match.slice(1)); // Convert row number
          const key = `${row},${col}`;
          return parseFloat(data[key] || 0);
        });
        return eval(parsed);
      }
    } catch {
      return 'ERROR';
    }
    return formula;
  };
  
  const calculateRangeFunction = (type, expression, data) => {
    const range = expression.match(/\((.*?)\)/)[1];
    const [start, end] = range.split(':');
    const startCol = start.charCodeAt(0) - 65;
    const startRow = parseInt(start.slice(1));
    const endCol = end.charCodeAt(0) - 65;
    const endRow = parseInt(end.slice(1));
  
    let values = [];
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const key = `${row},${col}`;
        const value = parseFloat(data[key] || 0);
        if (!isNaN(value)) values.push(value);
      }
    }
  
    switch (type) {
      case 'SUM':
        return values.reduce((a, b) => a + b, 0);
      case 'AVERAGE':
        return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
      case 'MAX':
        return Math.max(...values);
      case 'MIN':
        return Math.min(...values);
      case 'COUNT':
        return values.length;
      default:
        return 'ERROR';
    }
  };
  