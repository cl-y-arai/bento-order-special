import React, { useState, useEffect } from 'react';
import { bentoOptions, departments } from './data/bentoData';
import { OrderItem, DepartmentTotal } from './types/types';
import BentoSelection from './components/BentoSelection';
import EmployeeForm from './components/EmployeeForm';
import OrderList from './components/OrderList';
import DeleteConfirmation from './components/DeleteConfirmation';
import { downloadOrdersAsCsv } from './utils/csvExport';
import { Download } from 'lucide-react';

function App() {
  const [employeeId, setEmployeeId] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedBento, setSelectedBento] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [departmentTotals, setDepartmentTotals] = useState<DepartmentTotal[]>([]);

  // Calculate totals whenever orders change
  useEffect(() => {
    calculateTotals();
  }, [orders]);

  const calculateTotals = () => {
    // Calculate total amount
    const total = orders.reduce((sum, order) => sum + order.bentoPrice, 0);
    setTotalAmount(total);

    // Calculate department totals
    const deptMap = new Map<string, { totalAmount: number; count: number; name: string }>();

    orders.forEach(order => {
      const deptId = order.departmentId;
      const current = deptMap.get(deptId) || { totalAmount: 0, count: 0, name: order.departmentName };
      
      deptMap.set(deptId, {
        totalAmount: current.totalAmount + order.bentoPrice,
        count: current.count + 1,
        name: order.departmentName
      });
    });

    const deptTotals: DepartmentTotal[] = Array.from(deptMap.entries()).map(([deptId, data]) => ({
      departmentId: deptId,
      departmentName: data.name,
      totalAmount: data.totalAmount,
      count: data.count
    }));

    setDepartmentTotals(deptTotals);
  };

  const handleSelectBento = (bentoId: string) => {
    setSelectedBento(bentoId);
  };

  const handleAddOrder = () => {
    // Validate inputs
    if (!employeeId.trim()) {
      alert('社員番号を入力してください');
      return;
    }

    if (!selectedDepartment) {
      alert('部署を選択してください');
      return;
    }

    if (!selectedBento) {
      alert('お弁当を選択してください');
      return;
    }

    // Find selected bento and department
    const bento = bentoOptions.find(b => b.id === selectedBento);
    const department = departments.find(d => d.id === selectedDepartment);

    if (!bento || !department) return;

    // Create new order
    const newOrder: OrderItem = {
      id: Date.now().toString(),
      employeeId: employeeId.trim(),
      departmentId: department.id,
      departmentName: department.name,
      bentoId: bento.id,
      bentoName: bento.name,
      bentoPrice: bento.price
    };

    // Add to orders
    setOrders([...orders, newOrder]);

    // Reset selection (optional)
    // setEmployeeId('');
    // setSelectedDepartment('');
    setSelectedBento(null);
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrderToDelete(orderId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteOrder = () => {
    if (orderToDelete) {
      setOrders(orders.filter(order => order.id !== orderToDelete));
      setOrderToDelete(null);
    }
  };

  const handleDownloadCsv = () => {
    downloadOrdersAsCsv(orders, departmentTotals, totalAmount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">社員食堂 弁当注文システム</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <EmployeeForm
            employeeId={employeeId}
            setEmployeeId={setEmployeeId}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            departments={departments}
          />

          <BentoSelection
            bentoOptions={bentoOptions}
            selectedBento={selectedBento}
            onSelectBento={handleSelectBento}
          />

          <div className="flex justify-center">
            <button
              onClick={handleAddOrder}
              disabled={!employeeId || !selectedDepartment || !selectedBento}
              className={`
                px-6 py-3 rounded-lg font-medium text-white 
                ${!employeeId || !selectedDepartment || !selectedBento
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0'}
              `}
            >
              注文する
            </button>
          </div>
        </div>

        <OrderList
          orders={orders}
          onDeleteOrder={handleDeleteOrder}
          totalAmount={totalAmount}
          departmentTotals={departmentTotals}
        />

        {orders.length > 0 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleDownloadCsv}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
            >
              <Download size={18} className="mr-2" />
              CSVでダウンロード
            </button>
          </div>
        )}
      </main>

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteOrder}
      />
    </div>
  );
}

export default App;