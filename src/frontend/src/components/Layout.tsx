import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { Facebook, Instagram, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Начало" },
    { path: "/about", label: "За нас" },
    { path: "/gallery", label: "Галерия" },
    { path: "/contact", label: "Контакти" },
  ];

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button
              type="button"
              onClick={() => handleNavigation("/")}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="/assets/Untitled-2.png"
                alt="Colibri Logo"
                className="h-10 w-10"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-cwp-yellow via-cwp-magenta to-cwp-cyan bg-clip-text text-transparent">
                CWP
              </span>
            </button>

            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  type="button"
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    currentPath === item.path
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              <a
                href="https://www.facebook.com/colibriwallprint"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-muted-foreground hover:text-cwp-cyan hover:bg-accent transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/colibri_wallprint/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-muted-foreground hover:text-cwp-magenta hover:bg-accent transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-accent transition-colors ml-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`md:hidden border-t border-border/40 bg-background/95 backdrop-blur overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`px-4 py-3 rounded-md text-left font-medium transition-all duration-200 ${
                  currentPath === item.path
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/40 bg-card mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <img
                src="/assets/Untitled-2.png"
                alt="Colibri Logo"
                className="h-8 w-8"
              />
              <span className="text-sm text-muted-foreground">
                Професионален печат на стени
              </span>
            </div>
            <div className="text-sm text-muted-foreground text-center md:text-right">
              © 2025. Създадено с <span className="text-cwp-magenta">♥</span>{" "}
              чрез{" "}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cwp-cyan hover:text-cwp-blue transition-colors underline"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
