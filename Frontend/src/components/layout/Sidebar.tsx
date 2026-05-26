import {
  LayoutDashboard,
  Receipt,
  Users,
  FileText,
} from "lucide-react";

import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Expenses",
    icon: Receipt,
    path: "/expenses",
  },
  {
    title: "Employees",
    icon: Users,
    path: "/employees",
  },
  {
    title: "Invoices",
    icon: FileText,
    path: "/invoices",
  },
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-10">
        FinanceFlow
      </h1>

      <div className="space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
          >
            <item.icon size={20} />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}