import { useState, useCallback } from 'react';
import { DataRow } from '../types';
import { distributeToChildren } from '../utils/calculations';

const initialData: DataRow[] = [
  {
    id: "electronics",
    label: "Electronics",
    value: 1500,
    originalValue: 1500,
    children: [
      {
        id: "phones",
        label: "Phones",
        value: 800,
        originalValue: 800
      },
      {
        id: "laptops",
        label: "Laptops",
        value: 700,
        originalValue: 700
      }
    ]
  },
  {
    id: "furniture",
    label: "Furniture",
    value: 1000,
    originalValue: 1000,
    children: [
      {
        id: "tables",
        label: "Tables",
        value: 300,
        originalValue: 300
      },
      {
        id: "chairs",
        label: "Chairs",
        value: 700,
        originalValue: 700
      }
    ]
  }
];

export const useTableData = () => {
  const [data, setData] = useState<DataRow[]>(initialData);

  const updateRowValue = useCallback((rowId: string, newValue: number, isPercentage: boolean = false) => {
    const updateRow = (rows: DataRow[], targetId: string): DataRow[] => {
      return rows.map(row => {
        if (row.id === targetId) {
          const updatedValue = isPercentage 
            ? row.value + (row.value * newValue / 100)
            : newValue;
          
          const finalValue = Math.round(updatedValue * 100) / 100;
          
          if (row.children && row.children.length > 0) {
            const updatedChildren = distributeToChildren(finalValue, row.children);
            return {
              ...row,
              value: finalValue,
              children: [...updatedChildren]  
            };
          }
          
          return {
            ...row,
            value: finalValue
          };
        }
        
         
        if (row.children) {
          const updatedChildren = updateRow(row.children, targetId);
          const childrenChanged = row.children && updatedChildren.some((child, idx) => child !== row.children![idx]);
          if (childrenChanged) {
            const newParentValue = updatedChildren.reduce((sum, child) => sum + child.value, 0);
            return {
              ...row,
              value: Math.round(newParentValue * 100) / 100,
              children: [...updatedChildren]  
            };
          }
        }
        
        return row;
      });
    };

    setData(prevData => updateRow(prevData, rowId));
  }, []);

  return {
    data,
    updateRowValue
  };
};