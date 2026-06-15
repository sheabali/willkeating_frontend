// export interface User {
//   id: string;
//   name: string;
//   phone: string;
//   email: string;
//   role: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
// }

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  memberSince: string | Date;
  totalManaged: number;
}

export interface Obituary {
  id: string;
  deceasedName: string;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  createdDate: string | Date;
}

export interface Payment {
  id: string;
  description: string;
  amount: number;
  invoiceNumber: string;
  date: string | Date;
  status: "SUCCESSFUL" | "PENDING" | "FAILED";
}

export interface UserDashboardData {
  user: User;
  obituaries: Obituary[];
  payments: Payment[];
}
