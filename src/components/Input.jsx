import React,{useId , forwardRef} from "react"

const Input = forwardRef(function Input({
    label,
    type="text",
    classname="",
    ...props
},ref){
    const id = useId()
    return(
        <div className="flex flex-col space-y-2">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
      
        <input
          type={type}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${classname}`}
          {...props}
          ref={ref}
        />
      </div>
      
    )
}
)

export default Input