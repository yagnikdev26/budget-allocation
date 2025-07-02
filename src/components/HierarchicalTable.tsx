import React from "react";
import { TableRow } from "./TableRow";
import { useTableData } from "../hooks/useTableData";
import { calculateGrandTotal } from "../utils/calculations";

export const HierarchicalTable: React.FC = () => {
  const { data, updateRowValue } = useTableData();
  const grandTotal = calculateGrandTotal(data);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            Hierarchical Budget Allocation
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and allocate budget values across categories
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Label
                </th>
                <th className="py-4 px-6 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Value
                </th>
                <th className="py-4 px-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Input
                </th>
                <th className="py-4 px-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Allocation %
                </th>
                <th className="py-4 px-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Allocation Val
                </th>
                <th className="py-4 px-6 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Variance %
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  row={row}
                  level={0}
                  onUpdateValue={updateRowValue}
                />
              ))}

              {/* Grand Total Row */}
              <tr className="bg-blue-50 border-t-2 border-blue-200">
                <td className="py-4 px-6">
                  <span className="font-bold text-blue-900 text-lg">
                    Grand Total
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <span className="font-bold text-blue-900 text-xl">
                    {grandTotal.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </td>
                <td className="py-4 px-6"></td>
                <td className="py-4 px-6"></td>
                <td className="py-4 px-6"></td>
                <td className="py-4 px-6"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
