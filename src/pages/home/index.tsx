import Navbar from "../../components/partials/navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="container py-16 md:py-20 min-h-screen flex flex-col justify-center items-center">
        <img src="/images/hero.png" alt="Hero Images" className="max-w-96" />
        
      </div>
    </div>
  );
};

export default HomePage;
