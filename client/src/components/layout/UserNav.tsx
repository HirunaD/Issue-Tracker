import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/useAuthStore";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";

export const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully");
    navigate("/login");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLogout}
      className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10 gap-2"
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Logout</span>
    </Button>
  );
};
