import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  err: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, err, ...props }, ref) => (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{name}</span>
        {err && (
          <span className="label-text-alt text-red-500 font-bold">{err}</span>
        )}
      </label>
      <input
        type="text"
        placeholder="Type here"
        className={
          err
            ? "input bg-secondary w-full input-error"
            : "input bg-secondary w-full "
        }
        ref={ref}
        {...props}
      />
    </div>
  )
);

export default Input;
