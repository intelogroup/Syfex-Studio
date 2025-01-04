import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NewExpertiseCardProps {
  onCreate: () => void;
  onCancel: () => void;
}

export const NewExpertiseCard = ({ onCreate, onCancel }: NewExpertiseCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Expertise Card</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Button onClick={onCreate}>Create Card</Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};