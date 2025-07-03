import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

function App() {
  return (
    <main className="w-9/12 mx-auto mt-2 min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow mt-5">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
}

export default App;
