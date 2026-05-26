export default function Navbar() {
  return (
    <div className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold">
        Finance Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-slate-300" />

        <div>
          <p className="font-medium">Admin User</p>
          <p className="text-sm text-gray-500">
            Finance Admin
          </p>
        </div>
      </div>
    </div>
  );
}