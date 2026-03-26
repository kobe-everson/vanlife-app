import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="bg-white min-h-screen">
      <Outlet />
    </div>
  );
}
