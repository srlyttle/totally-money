export const PageWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {title && (
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-4">
            <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {children}
      </div>
    </div>
  );
};
