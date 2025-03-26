import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export function ControlLayout() {
  return (
    <div className="flex min-h-screen bg-green-900">
      <Navbar />

        <Outlet />
    </div>
  );
};