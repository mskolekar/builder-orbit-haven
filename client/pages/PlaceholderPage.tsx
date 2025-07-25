import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="flex-1 bg-light-gray/30 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="text-center py-12">
          <CardHeader>
            <Construction size={64} className="mx-auto mb-4 text-brand-blue" />
            <CardTitle className="text-2xl">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-medium-gray mb-4">
              {description || "This page is currently under development."}
            </p>
            <p className="text-sm text-medium-gray">
              Continue prompting to fill in this page content when you're ready.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
