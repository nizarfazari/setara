

const FavoriteLoading = () => {
  return (
    <div
      className="flex space-x-4 justify-center w-full"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          className="border border-primary-300 shadow-lg rounded-lg xl:p-7 p-4 w-full max-w-7xl"
          aria-label="Memuat konten"
        >
          <div
            className="animate-pulse flex flex-col space-y-3 w-full"
            aria-hidden="true"
          >
            <div className="flex gap-2 items-center py-1 px-2 w-20 h-5 bg-gray-400 rounded-3xl text-white text-caption-large"></div>
            <div className="bg-gray-400 h-5 rounded w-3/4"></div>
            <div className="bg-gray-400 h-5 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteLoading;
