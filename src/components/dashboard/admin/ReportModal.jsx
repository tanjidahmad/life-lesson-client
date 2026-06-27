

"use client";

export default function ReportModal({ reports, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-3 py-4 sm:px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-zinc-900 p-4 sm:p-6 max-h-[90vh] overflow-hidden">
        <div className="mb-4 flex items-center justify-between gap-3 sm:mb-6">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Reports
          </h2>

          <button
            onClick={onClose}
            className="shrink-0 rounded-md p-1 text-lg text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[calc(90vh-90px)] space-y-3 overflow-y-auto pr-1 sm:space-y-4">
          {reports?.length > 0 ? (
            reports.map((report) => (
              <div
                key={report._id}
                className="rounded-xl border border-zinc-800 p-4"
              >
                <p className="text-sm text-zinc-400">Reporter</p>

                <p className="mb-3 break-all text-sm text-white sm:text-base">
                  {report.userEmail}
                </p>

                <p className="text-sm text-zinc-400">Reason</p>

                <p className="break-words text-sm text-white sm:text-base">
                  {report.reason}
                </p>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-zinc-800 p-4 text-sm text-zinc-400">
              No reports found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}