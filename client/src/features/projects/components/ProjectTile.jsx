export default function ProjectTile({ title, tasksCount, status, onClick }) {
  const tileColor =
    status === "completed"
      ? "bg-gray-300 hover:bg-gray-400"
      : "bg-green-200 hover:bg-green-300";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl p-5 text-left shadow-sm transition ${tileColor} hover:shadow-lg cursor-pointer`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 capitalize">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-700">
            {status === "completed" ? "Completed project" : "Active project"}
          </p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-800 shadow-sm">
          {tasksCount} task{tasksCount === 1 ? "" : "s"}
        </span>
      </div>
    </button>
  );
}
