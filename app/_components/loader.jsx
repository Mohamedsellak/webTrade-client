export default function({ isLoading }){
  if (!isLoading) return null;

  return (
      <div className="flex items-center justify-center z-50 fixed inset-0 bg-black bg-opacity-80">
          <div>
                <div className="animate-spin rounded-full border-t-4 border-gray-200 h-20 w-20"></div>
                <p className="text-center text-white">Loading...</p>
            </div>
      </div>
  );
};
