import React from 'react';
import { Department } from '../types/types';

interface EmployeeFormProps {
  employeeId: string;
  setEmployeeId: (id: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (id: string) => void;
  departments: Department[];
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employeeId,
  setEmployeeId,
  selectedDepartment,
  setSelectedDepartment,
  departments,
}) => {
  return (
    <div className="mb-6 bg-white p-5 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">社員情報</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="employee-id"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            社員番号
          </label>
          <input
            type="text"
            id="employee-id"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="例：E12345"
          />
        </div>
        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            部署
          </label>
          <select
            id="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">選択してください</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;