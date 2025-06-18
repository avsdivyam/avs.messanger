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
      {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-slate-900"></div>
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div> */}
      
      <div className="relative z-10">
      <Navbar
        brandName={
          <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xs sm:text-sm">M</span>
            </div>
              <span className="text-sm sm:text-base font-medium text-white">Messenger</span>
          </div>
        }
        navItems={dashboardNavItems}
        rightItems={
          <div className="flex items-center gap-2 sm:gap-4 flex-col sm:flex-row w-full sm:w-auto">
            <div className="flex items-center gap-2 order-2 sm:order-1">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                  <span className="text-white text-xs sm:text-sm font-medium">U</span>
              </div>
                <span className="text-xs sm:text-sm hidden sm:inline text-white/90">User</span>
            </div>
            <Link
              href="/"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all duration-300 order-1 sm:order-2 w-full sm:w-auto text-center text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Logout
            </Link>
          </div>
        }
          className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 backdrop-blur-md border-b border-white/10"
      />
      <main className="container-fluid mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {children}
      </main>
      </div>
    </div>
  );
}