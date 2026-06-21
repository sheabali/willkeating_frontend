interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-12">
      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${
                  index < currentStep
                    ? "bg-green-400 text-green-900"
                    : index === currentStep
                    ? "bg-gray-600 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {index < currentStep ? "✓" : index + 1}
              </div>
              <span
                className={`ml-3 font-medium ${
                  index <= currentStep ? "text-white" : "text-gray-300"
                }`}
              >
                {step}
              </span>
              {index < steps.length - 1 && (
                <div className="mx-4 flex-1 max-w-sm h-1 bg-gray-600 rounded"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
