interface VitalStatsProps {
  born: {
    date: string;
    location: string;
  };
  passed: {
    date: string;
    age?: string;
  };
}

export function VitalStats({ born, passed }: VitalStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 rounded-lg overflow-hidden">
      {/* Born Section */}
      <div className="bg-white p-8">
        <h3 className="text-xs font-semibold text-neutral-600 tracking-widest uppercase mb-4">
          Born
        </h3>
        <p className="text-2xl text-neutral-900 mb-2">{born?.date}</p>
        <p className="text-sm text-neutral-600">{born?.location}</p>
      </div>

      {/* Passed Section */}
      <div className="bg-white p-8">
        <h3 className="text-xs font-semibold text-neutral-600 tracking-widest uppercase mb-4">
          Passed
        </h3>
        <p className="text-2xl text-neutral-900 mb-2">{passed?.date}</p>
        {passed?.age && (
          <p className="text-sm text-neutral-600">{passed?.age}</p>
        )}
      </div>
    </div>
  );
}
