import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";

type InputProps = {
  name: string;
  placeholder?: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputPassword = (props: InputProps) => {
  const { name, placeholder, onInputChange } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <div
      className={`flex border ${
        isActive ? "border-primary border-2" : "border-primaryDark"
      } focus:border-primary w-full mt-2`}
    >
      <input
        type={showPassword ? "text" : "password"}
        id={name}
        name={name}
        className="w-full border border-none p-3 text-dark focus:border-none focus:outline-none"
        placeholder={placeholder}
        onChange={onInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div
        className="flex justify-center items-center cursor-pointer me-1 "
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <FontAwesomeIcon icon={faEye} color="#000" />
        ) : (
          <FontAwesomeIcon icon={faEyeSlash} color="#000" />
        )}
      </div>
    </div>
  );
};

export default InputPassword;
