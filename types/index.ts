export type TAppUser = {
  id: string;
};

export type TAppUserState = {
  token: string;
  user: TAppUser;
};

interface MenuItem {
  mealImage: string;
  name: string;
  quantity: number;
  price: number;
}

interface AssignedTo {
  staffImage: string;
  name: string;
}

export type Invoice = {
  OrderID: number;
  Customer: string;
  TableNo: string;
  MenuItems: MenuItem[];
  AssignedTo?: AssignedTo[];
  Price: number;
  Discount: number;
  amountPaid: number;
  TimeofOrder: string;
  Status: string;
};

export type Menus = {
  value?: string;
  MenuId: number;
  Price: number;
  Category: string;
  Description: string;
  mealImage: string;
  Name: string;
  Discount: string;
  Department: string;
};

export type User = {
  UserId: number;
  Name: string;
  Email: string;
  userImage: string;
  Type: string;
  Phone: string;
  Department: string;
  Date: string;
  Status: string;
  Requests: number;
  Completed: number;
  Sales: number;
};

export type AdminTable = {
  children?: any;
  view?: any;
  grid?: any;
  invoiceData?: any;
  setIsOpen?: any;
  setSelectedInvoice?: any;
  selectedInvoice?: any;
  tabHeaders?: {};
  tableHeaders?: any;
  currentPage?: number;
  setCurrentPage?: any;
  total_pages?: number;
  items_per_page?: number;
  getPageNumbers?: any;
  handlePageChange?: any;
  className?: any;
};

export type OrderMenuItem = {
  MenuId: string;
  Name: string;
  quantity: number;
  Price: number;
};

export type OrderItems = {
  fname: string;
  lname: string;
  phone: string;
  orderType: string;
  location?: string;
  orderTime?: string;
  tableNumber?: string;
  handlingDepartment: string[];
  orderItems: OrderMenuItem[];
};
