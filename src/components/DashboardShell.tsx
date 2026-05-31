import { ReactNode } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { UserSidebar } from "@/components/UserSidebar";

type DashboardShellProps = {
  children: ReactNode;
  title: string;
  activeView?: string;
  onViewChange?: (view: string) => void;
  onSignOut: () => void;
  language?: string;
  onLanguageChange?: (lang: string) => void;
  showLanguage?: boolean;
  headerExtra?: ReactNode;
};

export const DashboardShell = ({
  children,
  title,
  activeView,
  onViewChange,
  onSignOut,
  language = "en",
  onLanguageChange,
  showLanguage = true,
  headerExtra,
}: DashboardShellProps) => {
  return (
    <div className="app-page">
      <header className="app-topbar sticky top-0 z-30">
        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Logo />
          <div className="flex items-center gap-2 lg:gap-4">
            {headerExtra}
            {showLanguage && onLanguageChange && (
              <select
                className="app-select hidden sm:block"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            )}
            <Button variant="outline" className="app-logout-btn" onClick={onSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <UserSidebar
          activeView={activeView}
          onViewChange={onViewChange}
          onSignOut={onSignOut}
        />
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6">
          <div className="mb-4 sm:mb-6 flex items-center justify-between gap-4">
            <h1 className="font-serif text-xl font-semibold text-gray-900 sm:text-2xl">{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};
