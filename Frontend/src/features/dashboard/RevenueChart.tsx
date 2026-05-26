import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useQuery } from "@tanstack/react-query";

import api from "../../services/api";

export default function RevenueChart() {
  const { data: invoices = [] } = useQuery({
    queryKey: ["invoices"],

    queryFn: async () => {
      const response = await api.get("/invoices");

      return response.data;
    },
  });

  const chartData = invoices.map(
    (invoice: any, index: number) => ({
      month: `Inv ${index + 1}`,
      revenue: Number(invoice.amount),
    })
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6">
        Revenue Analytics
      </h2>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={chartData}>
            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}