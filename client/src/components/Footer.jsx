import Footer from "./components/Footer";
function LayoutWrapper() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      
      <Routes>
      </Routes>
      
      {location.pathname !== "/" && <Footer />}
    </>
  );
}
