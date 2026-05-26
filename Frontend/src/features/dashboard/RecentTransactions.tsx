import { useQuery } from "@tanstack/react-query";

import api from "../../services/api";

export default function RecentTransactions() {
  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses"],

    queryFn: async () => {
      const response = await api.get("/expenses");

      return response.data;
    },
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Recent Transactions
        </h2>

        <button className="text-blue-600 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-5">
        {expenses.slice(0, 5).map((expense: any) => (
          <div
            key={expense.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <p className="font-semibold">
                {expense.employee}
              </p>

              <p className="text-gray-500 text-sm">
                {expense.title}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">
                ₹
                {Number(
                  expense.amount
                ).toLocaleString()}
              </p>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium
                ${
                  expense.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : expense.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {expense.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}