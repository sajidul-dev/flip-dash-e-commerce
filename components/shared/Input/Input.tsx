import React, { InputHTMLAttributes, ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  register?: UseFormRegisterReturn;
}

const Input: React.FC<InputProps> = ({ label, icon, register, ...props }) => {
  return (
    <div className="">
      {label && (
        <label className="block text-gray-600 text-sm font-bold mb-2">
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
      </div>
    </div>
  );
};

export default Input;
