type CardNotesProps = {
  title: string;
  desc: string;
};

const CardNotes = ({ title, desc }: CardNotesProps) => {
  return (
    <div className="w-full md:w-5/12 p-4 min-h-full rounded-lg border shadow-sm mt-4">
      <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
      <p className="mt-1">{desc}</p>
    </div>
  );
};

export default CardNotes;
