import React, { InputHTMLAttributes, ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  register?: UseFormRegisterReturn;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  icon,
  register,
  error,
  ...props
}) => {
  return (
    <div className="">
      {label && (
        <label className="block text-gray text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          {...props}
          {...register}
          className={`block px-4 py-2 border border-[#86868b] rounded-md focus:outline-none focus:ring focus:border-[#0071e3] placeholder-gray-400 ${props.className}`}
        />
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
};

export interface ICommonTextAreaProps
  extends React.HTMLProps<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  register?: UseFormRegisterReturn;
}
export const CommonTextArea: React.FC<ICommonTextAreaProps> = (props) => {
  const { type, label, error, register } = props;
  return (
    <div className="mb-5">
      {label && (
        <label className="block text-gray text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <textarea
        {...props}
        {...register}
        className={`block px-4 py-2 border border-[#86868b] rounded-md focus:outline-none focus:ring focus:border-[#0071e3] placeholder-gray-400 ${props.className}`}></textarea>
      <p className="text-danger">{error}</p>
    </div>
  );
};

export default Input;
