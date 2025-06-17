import Link from "next/link";
import Navbar from "@/components/navbar";
import { NavItem } from "@/components/navbar";

const dashboardNavItems: NavItem[] = [
  { label: "Messages", href: "/dashboard" },
  { label: "Contacts", href: "/dashboard/contacts" },
  { label: "Groups", href: "/dashboard/groups" },
  { label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        brandName={
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xs sm:text-sm">M</span>
            </div>
            <span className="text-sm sm:text-base font-medium">Messenger</span>
          </div>
        }
        navItems={dashboardNavItems}
        rightItems={
          <div className="flex items-center gap-2 sm:gap-4 flex-col sm:flex-row w-full sm:w-auto">
            <div className="flex items-center gap-2 order-2 sm:order-1">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-200 rounded-full flex items-center justify-center">
                <span className="text-blue-800 text-xs sm:text-sm font-medium">U</span>
              </div>
              <span className="text-xs sm:text-sm hidden sm:inline">User</span>
            </div>
            <Link
              href="/"
              className="bg-blue-500 hover:bg-blue-400 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-colors order-1 sm:order-2 w-full sm:w-auto text-center"
            >
              Logout
            </Link>
          </div>
        }
        className="bg-white shadow-sm border-b border-gray-200"
      />
      <main className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {children}
      </main>
    </div>
  );
}