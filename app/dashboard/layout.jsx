import React from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
