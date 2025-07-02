import { DataRow } from '../types';

export const calculateVariance = (currentValue: number, originalValue: number): number => {
  if (originalValue === 0) return 0;
  return ((currentValue - originalValue) / originalValue) * 100;
};

export const calculateSubtotal = (children: DataRow[]): number => {
  return children.reduce((sum, child) => sum + child.value, 0);
};

export const calculateGrandTotal = (rows: DataRow[]): number => {
  return rows.reduce((sum, row) => sum + row.value, 0);
};

export const updateParentValues = (rows: DataRow[]): DataRow[] => {
  return rows.map(row => {
    if (row.children && row.children.length > 0) {
      const updatedChildren = updateParentValues(row.children);
      const newValue = calculateSubtotal(updatedChildren);
      return {
        ...row,
        value: newValue,
        children: updatedChildren
      };
    }
    return row;
  });
};

export const distributeToChildren = (
  parentValue: number,
  children: DataRow[]
): DataRow[] => {
  const currentTotal = calculateSubtotal(children);
  
  if (currentTotal === 0) {
    // If current total is 0, distribute equally
    const valuePerChild = parentValue / children.length;
    return children.map(child => ({
      ...child,
      value: Math.round(valuePerChild * 100) / 100
    }));
  }
  
  // Distribute proportionally based on current contribution
  return children.map(child => {
    const proportion = child.value / currentTotal;
    const newValue = parentValue * proportion;
    return {
      ...child,
      value: Math.round(newValue * 100) / 100
    };
  });
};