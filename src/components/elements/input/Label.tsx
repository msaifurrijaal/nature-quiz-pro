type LabelProps = {
  htmlFor: string;
  children: string;
};

const Label = ({ htmlFor, children }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className="text-base font-bold">
      {children}
    </label>
  );
};

export default Label;
