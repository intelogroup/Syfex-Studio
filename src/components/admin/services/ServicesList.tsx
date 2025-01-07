import { useState } from "react";
import { ServiceForm } from "./ServiceForm";
import { Card } from "@/components/ui/card";

interface ServicesListProps {
  content: any[];
  onSave: (id: string, data: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const ServicesList = ({ content, onSave, onDelete, isLoading }: ServicesListProps) => {
  return (
    <div className="space-y-4">
      {Array.isArray(content) && content.map((item) => (
        <Card key={item.id} className="p-6">
          <ServiceForm
            item={item}
            onSave={onSave}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        </Card>
      ))}
    </div>
  );
};