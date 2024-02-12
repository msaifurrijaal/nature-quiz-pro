import { ChangeEvent, Ref, forwardRef } from "react";
import Label from "./Label";
import Input from "./Input";
import InputPassword from "./InputPassword";

type InputFormProps = {
  type: string;
  name: string;
  placeholder: string;
  label: string;
  classname: string;
  errorMessage: string | undefined;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputForm = forwardRef(
  (props: InputFormProps, ref: Ref<HTMLInputElement>) => {
    const {
      classname,
      name,
      label,
      type,
      placeholder,
      onInputChange,
      errorMessage,
    } = props;
    return (
      <div className={`w-full ${classname}`}>
        <Label htmlFor={name}>{label}</Label>
        {type === "password" ? (
          <InputPassword
            name={name}
            placeholder={placeholder}
            onInputChange={onInputChange}
          />
        ) : (
          <Input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            onInputChange={onInputChange}
          />
        )}

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);

export default InputForm;
