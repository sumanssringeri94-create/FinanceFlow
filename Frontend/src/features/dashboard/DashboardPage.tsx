import DashboardLayout from "../../components/layout/DashboardLayout";

import RevenueChart from "./RevenueChart";

import RecentTransactions from "./RecentTransactions";

import { useQuery } from "@tanstack/react-query";

import api from "../../services/api";

export default function DashboardPage() {
  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses"],

    queryFn: async () => {
      const response = await api.get("/expenses");

      return response.data;
    },
  });

  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],

    queryFn: async () => {
      const response = await api.get("/employees");

      return response.data;
    },
  });

  const { data: invoices = [] } = useQuery({
    queryKey: ["invoices"],

    queryFn: async () => {
      const response = await api.get("/invoices");

      return response.data;
    },
  });

  const totalExpenses = expenses.reduce(
    (sum: number, expense: any) =>
      sum + Number(expense.amount),
    0
  );

  const totalRevenue = invoices.reduce(
    (sum: number, invoice: any) =>
      sum + Number(invoice.amount),
    0
  );

  const pendingApprovals = expenses.filter(
    (expense: any) =>
      expense.status === "Pending"
  ).length;

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">
          Dashboard Overview
        </h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="text-gray-500">
              Total Revenue
            </h3>

            <p className="text-2xl font-bold mt-2">
              ₹
              {totalRevenue.toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="text-gray-500">
              Expenses
            </h3>

            <p className="text-2xl font-bold mt-2">
              ₹
              {totalExpenses.toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="text-gray-500">
              Employees
            </h3>

            <p className="text-2xl font-bold mt-2">
              {employees.length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="text-gray-500">
              Pending Approvals
            </h3>

            <p className="text-2xl font-bold mt-2">
              {pendingApprovals}
            </p>
          </div>
        </div>

        {/* Chart + Transactions */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="col-span-2">
            <RevenueChart />
          </div>

          <div>
            <RecentTransactions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}