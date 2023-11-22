import clsx from "clsx";
import { FaSpinner } from "react-icons/fa";

const Loading = ({ loading = false, backdrop = true, className = "" }) => {
  return (
    <div
      className={clsx([
        "flex items-center justify-center",
        {
          "w-screen h-screen fixed z-[9999] top-0 left-0 bg-[#000000a0]":
            loading && backdrop,
        },
        className,
      ])}>
      {loading && (
        <div className="text-4xl animate-spin">
          <FaSpinner />
        </div>
      )}
    </div>
  );
};

export default Loading;
