export default function XenditBadge(): React.ReactNode {
  return (
    <div className="inline-flex items-center border border-blue-400 rounded-md px-3 py-1.5 bg-white space-x-2 select-none">
      <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
        Powered by
      </span>

      <svg
        viewBox="0 0 24 24"
        className="h-5 w-auto text-blue-500"
        fill="currentColor"
      >
        <path d="M11.781 2.743H7.965l-5.341 9.264l5.341 9.263l-1.312 2.266L0 12.007L6.653.464h6.454zm-5.128 2.28l1.312-2.28L9.873 6.03L8.561 8.296zm9.382-2.28l1.312 2.28L7.965 21.27l-1.312-2.279zm-5.128 20.793l1.298-2.279h3.83L14.1 17.931l1.312-2.267l1.926 3.337l4.038-6.994l-5.341-9.264L17.347.464L24 12.007l-6.653 11.529z" />
      </svg>
      <span className="text-base  text-blue-500 tracking-widest">xendit</span>
    </div>
  );
}
