const EditLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-zinc-200 mb-6">
        Edit Sound Banks
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">{children}</div>
    </div>
  );
};

export default EditLayout;
