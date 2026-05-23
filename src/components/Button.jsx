export default function Button({ variant = "primary", children, ...props }) {
  const base =
    "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500";

  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500",
    outline: "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white",
  };

  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}
