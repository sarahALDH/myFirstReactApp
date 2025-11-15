import type { Feature } from "@/types";

interface FeaturesProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  className?: string;
}

export default function Features({
  title = "Features",
  subtitle,
  features,
  className = "",
}: FeaturesProps) {
  return (
    <section className={`py-20 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        {subtitle && (
          <p className="text-center text-lg text-gray-600 mb-4">{subtitle}</p>
        )}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {feature.icon && (
                <div className="text-4xl mb-4">{feature.icon}</div>
              )}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
