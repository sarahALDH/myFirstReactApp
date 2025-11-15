import type { Section } from "@/types";

interface SectionProps extends Section {
  children?: React.ReactNode;
}

export default function Section({
  id,
  title,
  subtitle,
  content,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`py-24 lg:py-32 ${className}`}>
      <div className="container mx-auto px-[5%]">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {subtitle && (
              <p className="text-lg text-gray-600 mb-4">{subtitle}</p>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {title}
              </h2>
            )}
          </div>
        )}
        {content || children}
      </div>
    </section>
  );
}
