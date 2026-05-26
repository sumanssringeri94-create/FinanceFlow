import DashboardLayout from "../../components/layout/DashboardLayout";

import { useMemo, useState } from "react";

import AddExpenseModal from "./AddExpenseModal";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import api from "../../services/api";

export default function ExpensesPage() {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] =
    useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const queryClient = useQueryClient();

  const {
    data: expenses = [],
    isLoading,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await api.get("/expenses");

      return response.data;
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/expenses/${id}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense: any) => {
      const matchesSearch =
        expense.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        expense.employee
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All"
          ? true
          : expense.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [expenses, search, statusFilter]);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Expense Management
        </h1>

        <button
          onClick={() =>
            setIsAddExpenseModalOpen(true)
          }
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Expense
        </button>
      </div>

      {/* Modal */}
      <AddExpenseModal
        isOpen={isAddExpenseModalOpen}
        onClose={() =>
          setIsAddExpenseModalOpen(false)
        }
      />

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {/* Search + Filter */}
        <div className="flex items-center justify-between mb-5">
          <input
            type="text"
            placeholder="Search expenses..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border px-4 py-2 rounded-lg w-80 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>
        </div>

        {/* Loading */}
        {isLoading ? (
          <p className="text-center py-10">
            Loading expenses...
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left border-b text-gray-500">
                <th className="pb-4">Title</th>
                <th className="pb-4">Employee</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredExpenses.map(
                (expense: any) => (
                  <tr
                    key={expense.id}
                    className="border-b last:border-none"
                  >
                    <td className="py-5 font-medium">
                      {expense.title}
                    </td>

                    <td className="py-5">
                      {expense.employee}
                    </td>

                    <td className="py-5 font-semibold">
                      ₹
                      {Number(
                        expense.amount
                      ).toLocaleString()}
                    </td>

                    <td className="py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          expense.status ===
                          "Approved"
                            ? "bg-green-100 text-green-700"
                            : expense.status ===
                              "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {expense.status}
                      </span>
                    </td>

                    <td className="py-5">
                      <button
                        onClick={() =>
                          deleteExpenseMutation.mutate(
                            expense.id
                          )
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}