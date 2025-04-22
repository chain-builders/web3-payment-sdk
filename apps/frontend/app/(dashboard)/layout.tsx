import DashboardNav from "@/components/dashboard/DashboardNav";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="w-full container mx-auto px-10 py-6">
      <DashboardNav />
      {children}
    </div>
  );
};

export default Layout;
