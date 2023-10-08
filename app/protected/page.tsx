import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ProtectedRoute from '../components/ProtectedRoute';

export default async function ProtectedRoutePage() {
  return (
    <>
      <ProtectedRoute>LOl</ProtectedRoute>
    </>
  );
}
