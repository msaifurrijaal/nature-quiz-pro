import { Link } from "react-router-dom";

const BannerSection = () => {
  return (
    <div className="hidden md:w-1/2 md:flex flex-col justify-center items-center p-5">
      <img
        src="/images/illustration_girl.png"
        alt="Illustration Girl"
        className="w-3/4"
        loading="lazy"
      />
      <div className="text-center mt-4">
        <Link to="/">
          <h1 className="text-3xl text-primary font-bold">
            Nature Science Pro
          </h1>
          <p className="mt-2 text-base font-medium">
            "Unleash Your Inner Naturalist with NatureQuiz Pro."
          </p>
        </Link>
      </div>
    </div>
  );
};

export default BannerSection;
