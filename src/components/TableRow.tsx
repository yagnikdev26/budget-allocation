import React, { useState } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';
import { DataRow } from '../types';
import { calculateVariance } from '../utils/calculations';

interface TableRowProps {
  row: DataRow;
  level: number;
  onUpdateValue: (id: string, value: number, isPercentage?: boolean) => void;
}

export const TableRow: React.FC<TableRowProps> = ({ row, level, onUpdateValue }) => {
  const [inputValue, setInputValue] = useState('');
  
  const variance = calculateVariance(row.value, row.originalValue);
  const isParent = row.children && row.children.length > 0;
  
  const handleAllocationPercent = () => {
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      onUpdateValue(row.id, value, true);
      setInputValue('');
    }
  };
  
  const handleAllocationValue = () => {
    const value = parseFloat(inputValue);
    if (!isNaN(value) && value >= 0) {
      onUpdateValue(row.id, value, false);
      setInputValue('');
    }
  };
  
  const getVarianceColor = (variance: number) => {
    if (Math.abs(variance) < 0.01) return 'text-gray-600';
    return variance > 0 ? 'text-green-600' : 'text-red-600';
  };
  
  const indentClass = level > 0 ? `pl-${level * 8}` : '';
  const bgClass = level > 0 ? 'bg-gray-50' : 'bg-white';
  
  return (
    <>
      <tr className={`${bgClass} hover:bg-gray-100 transition-colors border-b border-gray-200`}>
        <td className={`py-4 px-6 ${indentClass}`}>
          <div className="flex items-center">
            {level > 0 && (
              <span className="text-gray-400 mr-2">└─</span>
            )}
            <span className={`font-${isParent ? 'semibold' : 'medium'} ${isParent ? 'text-gray-900' : 'text-gray-700'}`}>
              {row.label}
            </span>
          </div>
        </td>
        <td className="py-4 px-6 text-right">
          <span className={`font-${isParent ? 'bold' : 'semibold'} text-lg`}>
            {row.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </td>
        <td className="py-4 px-6">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </td>
        <td className="py-4 px-6">
          <button
            onClick={handleAllocationPercent}
            disabled={!inputValue}
            className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            Allocation %
          </button>
        </td>
        <td className="py-4 px-6">
          <button
            onClick={handleAllocationValue}
            disabled={!inputValue}
            className="inline-flex items-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Calculator className="w-4 h-4 mr-1" />
            Allocation Val
          </button>
        </td>
        <td className="py-4 px-6 text-right">
          <span className={`font-semibold ${getVarianceColor(variance)}`}>
            {variance.toFixed(2)}%
          </span>
        </td>
      </tr>
      
      {/* Render children */}
      {row.children && row.children.map(child => (
        <TableRow
          key={child.id}
          row={child}
          level={level + 1}
          onUpdateValue={onUpdateValue}
        />
      ))}
    </>
  );
};