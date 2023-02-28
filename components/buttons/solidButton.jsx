export default function SolidButton({ label, isSubmitting, icon, ...props }) {
  return (
    <button
      {...props}
      className="flex w-full items-center justify-center rounded-full border-2 border-blue-400 bg-blue-400 px-6 py-2 font-medium text-white shadow hover:border-lipad-dark-blue hover:bg-lipad-dark-blue"
    >
      <svg
        className={`${
          isSubmitting ? "" : "hidden"
        } -ml-1 mr-3 h-5 w-5 animate-spin text-white`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <div className="flex items-center gap-2">
        <p className="whitespace-nowrap">{label}</p>
        {icon ?? null}
      </div>
    </button>
  );
}
