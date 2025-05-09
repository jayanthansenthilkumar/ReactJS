
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import ModuleCards from '@/components/dashboard/ModuleCards';
import AISidebar from '@/components/dashboard/AISidebar';

const Dashboard = () => {
  return (
    <AppLayout showSidebar hideFooter>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WelcomeCard />
            <h2 className="text-xl font-heading font-semibold mt-8 mb-4">Your Modules</h2>
            <ModuleCards />
          </div>
          
          <div>
            <AISidebar />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
