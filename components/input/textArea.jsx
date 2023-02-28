import { useField } from "formik";

export default function TextArea({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={label} className="font-medium text-blue-400">
          {label}
        </label>
      )}
      <textarea
        {...field}
        {...props}
        className={`${
          meta.touched && meta.error
            ? "border-2 border-red-400 focus:border-red-400"
            : ""
        } w-full rounded-md border border-gray-300 p-2  ring-0 placeholder:font-medium placeholder:text-[#CACACA] focus:border-2 focus:ring-0`}
      />
      <div className="text-red-400">
        {meta.touched && meta.error ? <span>{meta.error}</span> : null}
      </div>
    </div>
  );
}
