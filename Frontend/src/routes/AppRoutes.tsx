import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardPage from "../features/dashboard/DashboardPage";
import ExpensesPage from "../features/expenses/ExpensesPage";
import EmployeesPage from "../features/employees/EmployeesPage";
import InvoicesPage from "../features/invoices/InvoicesPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />

        <Route
          path="/expenses"
          element={<ExpensesPage />}
        />
        <Route
  path="/employees"
  element={<EmployeesPage />}
/>

<Route
  path="/invoices"
  element={<InvoicesPage />}
/>
      </Routes>
    </BrowserRouter>
  );
}