interface FeatureCardProps {
  number: number;
  title: string;
  description: string;
  backgroundColor: string;
}

const FeatureCard = ({
  number,
  title,
  description,
  backgroundColor,
}: FeatureCardProps) => {
  return (
    <div
      className={`${backgroundColor} rounded-2xl p-6 md:p-8 text-white transition-all duration-300 hover:shadow-lg hover:scale-105 group`}
    >
      {/* Number Badge */}
      <div className="inline-flex items-center justify-center w-8 h-8 mb-6 rounded-full border-2 border-white/40 text-sm font-medium">
        {number}
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold mb-3 text-pretty">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm md:text-base leading-relaxed opacity-95">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
