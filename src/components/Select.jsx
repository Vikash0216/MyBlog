import React, { useId, forwardRef } from "react";

const Select = forwardRef(({ label, options, className, ...props }, ref) => {
    const id = useId();
    return (
        <div className="flex flex-col space-y-2">
            {label && (
                <label htmlFor={id} className="text-gray-700 font-medium">
                    {label}
                </label>
            )}

            <select
                id={id}
                className={`border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 ${className}`}
                ref={ref}
                {...props}
            >
                <option value="" disabled>Select an option</option>
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;
