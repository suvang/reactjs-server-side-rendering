import pkg from "react-router-dom";
const { Route, Routes } = pkg;
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { MetadataProvider } from "./contexts/MetadataContext";

export default function App() {
  return (
    <MetadataProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MetadataProvider>
  );
}
