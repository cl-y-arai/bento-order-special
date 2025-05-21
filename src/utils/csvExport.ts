import { OrderItem, DepartmentTotal } from '../types/types';

export const downloadOrdersAsCsv = (
  orders: OrderItem[],
  departmentTotals: DepartmentTotal[],
  totalAmount: number
): void => {
  // CSV header
  let csvContent = "社員番号,部署,お弁当,価格\n";

  // Add orders to CSV
  orders.forEach(order => {
    csvContent += `${order.employeeId},${order.departmentName},${order.bentoName},${order.bentoPrice}\n`;
  });

  // Add empty row as separator
  csvContent += "\n";

  // Add department totals
  csvContent += "部署別集計\n";
  departmentTotals.forEach(dept => {
    csvContent += `${dept.departmentName},,${dept.count}個,${dept.totalAmount}円\n`;
  });

  // Add total amount
  csvContent += "\n";
  csvContent += `合計金額,,,${totalAmount}円\n`;

  // Create a Blob with the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create a link element to download the CSV
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  // Set filename and click the link to download
  const now = new Date();
  const filename = `弁当注文_${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}.csv`;
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};