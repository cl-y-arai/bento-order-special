export interface Bento {
  id: string;
  name: string;
  price: number;
  image: string;
  type: 'western' | 'japanese' | 'chinese' | 'thai';
}

export interface Department {
  id: string;
  name: string;
}

export interface OrderItem {
  id: string;
  employeeId: string;
  departmentId: string;
  departmentName: string;
  bentoId: string;
  bentoName: string;
  bentoPrice: number;
}

export interface DepartmentTotal {
  departmentId: string;
  departmentName: string;
  totalAmount: number;
  count: number;
}