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

export type Invoice = {
  OrderID: number;
  Customer: string;
  TableNo: string;
  MenuItems: MenuItem[];
  Price: number;
  Discount: number,
  amountPaid: number,
  TimeofOrder: string;
  Status: string;
}

export type Menus = {
  MenuId: number;
  Price: number,
  Category: string;
  Description: string;
  mealImage: string;
  Name: string;
  Discount: string;
  Department: string;
}

export type User = {
  UserId: number;
  Name: string;
  Email: string,
  userImage: string;
  Type: string;
  Phone: string;
  Department: string;
  Date: string;
  Status: string;
  Requests: number;
  Completed: number;
  Sales: number;
}

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
  className?: any;
}
