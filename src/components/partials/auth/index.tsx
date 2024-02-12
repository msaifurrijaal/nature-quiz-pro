import LoginForm from "../../fragments/login/LoginForm";
import BannerSection from "../../fragments/login/BannerSection";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-wrap">
      <BannerSection />
      <div className="w-full md:w-1/2 md:bg-slate-100 flex flex-col justify-center items-center">
        <LoginForm />
        <p className="text-sm mt-4">
          Don't have an account?{" "}
          <span className="font-semibold text-primary cursor-pointer">
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
