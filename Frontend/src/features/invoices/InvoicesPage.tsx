import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useState } from "react";

import api from "../../services/api";

export default function InvoicesPage() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    client: "",
    amount: "",
    status: "Pending",
  });

  const { data: invoices = [] } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const response = await api.get("/invoices");

      return response.data;
    },
  });

  const addInvoiceMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(
        "/invoices",
        formData
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });

      setFormData({
        client: "",
        amount: "",
        status: "Pending",
      });
    },
  });

  const deleteInvoiceMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/invoices/${id}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });
    },
  });

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Invoice Management
      </h1>

      {/* Add Invoice Form */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Create Invoice
        </h2>

        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Client Name"
            value={formData.client}
            onChange={(e) =>
              setFormData({
                ...formData,
                client: e.target.value,
              })
            }
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({
                ...formData,
                amount: e.target.value,
              })
            }
            className="border rounded-lg px-4 py-3"
          />

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
            className="border rounded-lg px-4 py-3"
          >
            <option>Pending</option>
            <option>Paid</option>
            <option>Overdue</option>
          </select>

          <button
            onClick={() =>
              addInvoiceMutation.mutate()
            }
            className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Invoice
          </button>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b text-gray-500">
              <th className="pb-4">Client</th>
              <th className="pb-4">Amount</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice: any) => (
              <tr
                key={invoice.id}
                className="border-b last:border-none"
              >
                <td className="py-5 font-medium">
                  {invoice.client}
                </td>

                <td className="py-5 font-semibold">
                  ₹
                  {Number(
                    invoice.amount
                  ).toLocaleString()}
                </td>

                <td className="py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      invoice.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : invoice.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>

                <td className="py-5">
                  <button
                    onClick={() =>
                      deleteInvoiceMutation.mutate(
                        invoice.id
                      )
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}