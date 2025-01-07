import { ServiceCard } from "./ServiceCard";

interface ServicesGridProps {
  services: any[];
  expandedCard: number | null;
  setExpandedCard: (index: number | null) => void;
}

export const ServicesGrid = ({ services, expandedCard, setExpandedCard }: ServicesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {services?.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          index={index}
          isExpanded={expandedCard === index}
          onToggle={() => setExpandedCard(expandedCard === index ? null : index)}
        />
      ))}
    </div>
  );
};