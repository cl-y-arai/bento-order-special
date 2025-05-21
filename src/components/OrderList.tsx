import React from 'react';
import { OrderItem, DepartmentTotal } from '../types/types';
import { Trash2 } from 'lucide-react';

interface OrderListProps {
  orders: OrderItem[];
  onDeleteOrder: (orderId: string) => void;
  totalAmount: number;
  departmentTotals: DepartmentTotal[];
}

const OrderList: React.FC<OrderListProps> = ({
  orders,
  onDeleteOrder,
  totalAmount,
  departmentTotals,
}) => {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">注文リスト</h2>
        <p className="text-gray-500 italic">注文はまだありません</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">注文リスト</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                社員番号
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                部署
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                お弁当
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                価格
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.employeeId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.departmentName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.bentoName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.bentoPrice}円
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onDeleteOrder(order.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none transition-colors"
                    aria-label="削除"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-medium mb-3 text-gray-800">部署別集計</h3>
        <div className="space-y-2">
          {departmentTotals.map((dept) => (
            <div key={dept.departmentId} className="flex justify-between items-center">
              <span className="font-medium text-gray-700">{dept.departmentName}</span>
              <span className="text-gray-900">{dept.totalAmount}円 ({dept.count}個)</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>合計金額</span>
          <span>{totalAmount}円</span>
        </div>
      </div>
    </div>
  );
};

export default OrderList;