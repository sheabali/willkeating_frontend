interface SubmissionDetailsProps {
  submittedBy: string;
  submissionDate: string;
}

export function SubmissionDetails({
  submittedBy,
  submissionDate,
}: SubmissionDetailsProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-xs font-semibold text-neutral-600 tracking-widest uppercase">
        Submission Details
      </h3>
      <div className="space-y-3 border-t border-neutral-200 pt-4">
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-neutral-600">
            Submitted By
          </span>
          <span className="text-sm text-neutral-900">{submittedBy}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-neutral-600">
            Submission Date
          </span>
          <span className="text-sm text-neutral-900">{submissionDate}</span>
        </div>
      </div>
    </section>
  );
}
