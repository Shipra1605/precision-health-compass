
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProfileSetup from "./pages/ProfileSetup"; // Import ProfileSetup
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import HealthFacts from "./pages/HealthFacts";
import Team from "./pages/Team";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  // isAuthenticated state is managed by ProtectedRoute now, this local state might be redundant
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // useEffect(() => {
  //   const currentUser = localStorage.getItem('currentUser');
  //   setIsAuthenticated(!!currentUser);
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/health-facts" element={<HealthFacts />} />
            <Route path="/team" element={<Team />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile-setup" element={<ProfileSetup />} /> {/* Add ProfileSetup route */}
            
            {/* Protected routes - only accessible when logged in */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            {/* It's good practice to protect other user-specific routes too if they exist */}
            {/* For example, if profile setup should only be accessed after initial signup step and not directly */}
            {/* <Route 
              path="/profile-setup" 
              element={
                <ProtectedRouteLogicForProfileSetup> // Custom logic might be needed here
                  <ProfileSetup />
                </ProtectedRouteLogicForProfileSetup>
              } 
            /> */}

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
