import { useField } from "formik";

export default function InputField({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="space-y-1">
      <label className="w-max font-medium text-blue-400">{label}</label>
      <input
        {...field}
        {...props}
        className={`${
          meta.touched && meta.error
            ? "border-2 border-red-400 focus:border-red-400"
            : ""
        } w-full rounded-md border border-gray-300 dark:border-white bg-transparent text-sm  placeholder:text-gray-400 focus:border-2 focus:ring-0 sm:text-base dark:text-white autofill:bg-transparent`}
      />
      {meta.touched && meta.error && (
        <div className="pt-1">
          <span className="text-red-400">{meta.error}</span>
        </div>
      )}
    </div>
  );
}
