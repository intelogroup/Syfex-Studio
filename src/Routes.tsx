import { Route, Routes as RouterRoutes } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/auth" element={<Auth />} />
    </RouterRoutes>
  );
};