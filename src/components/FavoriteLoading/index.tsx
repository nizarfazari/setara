import { Skeleton } from "antd";

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
          <Skeleton active paragraph={{ rows: 2 }}></Skeleton>
        </div>
      ))}
    </div>
  );
};

export default FavoriteLoading;
