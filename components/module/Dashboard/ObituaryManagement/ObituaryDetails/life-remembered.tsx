interface LifeRememberedProps {
  biography: string[];
}

export function LifeRemembered({ biography }: LifeRememberedProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl text-neutral-900">Life Remembered</h2>
      <div className="space-y-4">
        {biography.map((paragraph, index) => (
          <p
            key={index}
            className="text-base leading-relaxed text-neutral-700 "
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
