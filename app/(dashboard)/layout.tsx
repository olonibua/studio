import { ReactNode } from 'react';

// Force dynamic rendering for all dashboard routes
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return children;
} 