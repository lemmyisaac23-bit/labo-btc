import { ReactNode } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

type AppTopBarProps = {
  onSignOut?: () => void;
  language?: string;
  onLanguageChange?: (lang: string) => void;
  showLanguage?: boolean;
  extra?: ReactNode;
};

export const AppTopBar = ({
  onSignOut,
  language = "en",
  onLanguageChange,
  showLanguage = false,
  extra,
}: AppTopBarProps) => {
  return (
    <header className="app-topbar sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Logo />
        <div className="flex items-center gap-2 lg:gap-4">
          {extra}
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
          {onSignOut && (
            <Button variant="outline" className="app-logout-btn" onClick={onSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
