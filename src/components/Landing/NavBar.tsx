import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import logo from "../../assets/logo.svg";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

const NavBar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="absolute top-0 w-full bg-gradient-to-b from-black/40 to-transparent backdrop-opacity-50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="SereneScribe" width={35} />
              <span className="text-xl font-semibold text-white">
                SereneScribe
              </span>
            </div>
          </Link>
          <div className="md:hidden">
          <Drawer direction="top">
            <DrawerTrigger>
              <Menu className="w-7 h-7 invert-20" />
            </DrawerTrigger>
            <DialogTitle className="hidden">Welcome back!</DialogTitle>
            <DialogDescription className="hidden">Navbar</DialogDescription>
            <DrawerContent>
              <div className="*:cursor-pointer flex flex-row  mx-auto gap-x-10 py-3 ">
                {user ? (
                  <>
                    <Button
                      className="font-semibold"
                      asChild
                      variant="link"
                    >
                      <Link to="/dashboard">Dashboard</Link>
                    </Button>
                    <Button
                      onClick={() => {
                        logout()
                        window.location.reload(); 
                      }}
                      className="bg-red-500 text-white font-semibold"
                    
                    >
                      Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="font-semibold"
                      asChild
                      variant="link"
                    >
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button
                      className="bg-blue-500/70 text-white  font-semibold"
                      asChild
                    >
                      <Link to="/register">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </DrawerContent>
          </Drawer>
          </div>
          <div className="*:cursor-pointer hidden md:flex gap-6">
            {user ? (
              <>
                <Button
                  className="text-white font-semibold"
                  asChild
                  variant="link"
                >
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  onClick={() => {
                        logout()
                        window.location.reload(); 
                      }}
                  className="hover:bg-red-500 hover:text-white text-white font-semibold"
                  variant="ghost"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="text-white font-semibold"
                  asChild
                  variant="link"
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  className="bg-white/20 hover:bg-blue-500/70 text-white font-semibold"
                  asChild
                >
                  <Link to="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
