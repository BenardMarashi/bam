import LoginForm from '@/components/admin/LoginForm'; 
import { AuthProvider } from '@/contexts/AuthContext';

export default function AdminLoginPage() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}