import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useState } from "react";

import api from "../../services/api";

export default function EmployeesPage() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    role: "",
    status: "Active",
  });

  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await api.get("/employees");

      return response.data;
    },
  });

  const addEmployeeMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(
        "/employees",
        formData
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });

      setFormData({
        name: "",
        department: "",
        role: "",
        status: "Active",
      });
    },
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/employees/${id}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Employee Management
      </h1>

      {/* Add Employee Form */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Add Employee
        </h2>

        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            placeholder="Department"
            value={formData.department}
            onChange={(e) =>
              setFormData({
                ...formData,
                department: e.target.value,
              })
            }
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            placeholder="Role"
            value={formData.role}
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value,
              })
            }
            className="border rounded-lg px-4 py-3"
          />

          <button
            onClick={() =>
              addEmployeeMutation.mutate()
            }
            className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Employee
          </button>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b text-gray-500">
              <th className="pb-4">Name</th>
              <th className="pb-4">Department</th>
              <th className="pb-4">Role</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee: any) => (
              <tr
                key={employee.id}
                className="border-b last:border-none"
              >
                <td className="py-5 font-medium">
                  {employee.name}
                </td>

                <td className="py-5">
                  {employee.department}
                </td>

                <td className="py-5">
                  {employee.role}
                </td>

                <td className="py-5">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    {employee.status}
                  </span>
                </td>

                <td className="py-5">
                  <button
                    onClick={() =>
                      deleteEmployeeMutation.mutate(
                        employee.id
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