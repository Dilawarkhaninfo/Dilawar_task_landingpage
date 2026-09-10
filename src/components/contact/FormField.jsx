import React from "react";

const baseInput =
  "w-full rounded-2xl border bg-transparent px-4 py-3 text-white placeholder-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2";

const FormField = ({
  id,
  label,
  type = "text",
  as = "input",
  value,
  error,
  touched,
  onChange,
  onBlur,
  rows = 5,
  className = "",
}) => {
  const showError = Boolean(touched && error);
  const errorId = `${id}-error`;
  const Tag = as === "textarea" ? "textarea" : "input";

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-gray-300">
        {label} <span className="text-[#FC466B]">*</span>
      </label>
      <Tag
        id={id}
        name={id}
        type={as === "textarea" ? undefined : type}
        rows={as === "textarea" ? rows : undefined}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={showError}
        aria-describedby={showError ? errorId : undefined}
        placeholder={label}
        className={`${baseInput} ${
          showError
            ? "border-[#FC466B] focus:ring-[#FC466B]/40"
            : "border-white/20 hover:border-white/40 focus:border-[#3F5EFB] focus:ring-[#3F5EFB]/40"
        }`}
      />
      {showError && (
        <p id={errorId} role="alert" className="text-sm text-[#ff8aa1]">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
