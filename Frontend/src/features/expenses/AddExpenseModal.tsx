import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../services/api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const expenseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  employee: z
    .string()
    .min(3, "Employee name is required"),

  amount: z
    .string()
    .min(1, "Amount is required"),

  status: z.string(),
});

type ExpenseFormData = z.infer<
  typeof expenseSchema
>;

export default function AddExpenseModal({
  isOpen,
  onClose,
}: Props) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
  });

  const addExpenseMutation = useMutation({
    mutationFn: async (
      data: ExpenseFormData
    ) => {
      const response = await api.post(
        "/expenses",
        data
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });

      alert("Expense Added Successfully!");

      reset();

      onClose();
    },
  });

  const onSubmit = (
    data: ExpenseFormData
  ) => {
    addExpenseMutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[500px] shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">
            Add Expense
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 text-xl"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">
              Expense Title
            </label>

            <input
              type="text"
              placeholder="Enter title"
              {...register("title")}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Employee */}
          <div>
            <label className="block mb-2 font-medium">
              Employee Name
            </label>

            <input
              type="text"
              placeholder="Enter employee name"
              {...register("employee")}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.employee && (
              <p className="text-red-500 text-sm mt-1">
                {errors.employee.message}
              </p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-2 font-medium">
              Amount
            </label>

            <input
              type="number"
              placeholder="Enter amount"
              {...register("amount")}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 font-medium">
              Status
            </label>

            <select
              {...register("status")}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Save Expense
          </button>
        </form>
      </div>
    </div>
  );
}