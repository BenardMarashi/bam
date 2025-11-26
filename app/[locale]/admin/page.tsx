import Dashboard from '@/components/admin/Dashboard';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';

export default function AdminDashboardPage() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </AuthProvider>
  );
}