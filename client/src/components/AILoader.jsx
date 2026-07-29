function AILoader() {
  return (
    <div className="fixed inset-0 bg-slate-900/95 flex flex-col items-center justify-center z-[9999]">

      <div className="w-20 h-20 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>

      <h2 className="text-white text-3xl font-bold mt-8">
        AI is Preparing Your Interview...
      </h2>

      <p className="text-slate-400 mt-3">
        Please wait while we generate unique questions.
      </p>

    </div>
  );
}

export default AILoader;