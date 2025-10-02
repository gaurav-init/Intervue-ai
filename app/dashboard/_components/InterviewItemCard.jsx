import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowRight, BarChart2, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => router.push('/dashboard/interview/' + interview?.mockId);
  const onFeedbackPress = () =>
    router.push('/dashboard/interview/' + interview.mockId + '/feedback');

  const technologies =
    interview?.jobDesc?.split(',').map((tech) => tech.trim()).filter(Boolean) || [];

  return (
    <div className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-all duration-200 hover:border-foreground/20 hover:shadow-sheet">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold leading-tight tracking-tight text-foreground">
            {interview?.jobPosition}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock size={14} />
            <span className="nums">{interview?.jobExperience}</span> yrs experience
          </p>
        </div>
        <span className="nums shrink-0 text-xs text-muted-foreground">
          {interview.createdAt}
        </span>
      </div>

      <div className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
        {technologies.slice(0, 4).map((tech, index) => (
          <Badge key={index} variant="secondary" className="font-medium">
            {tech}
          </Badge>
        ))}
        {technologies.length > 4 && (
          <Badge variant="outline" className="text-muted-foreground">
            +{technologies.length - 4}
          </Badge>
        )}
      </div>

      <div className="mt-5 flex gap-2 border-t border-border pt-4">
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={onFeedbackPress}
        >
          <BarChart2 size={15} />
          Feedback
        </Button>
        <Button size="sm" className="flex-1" onClick={onStart}>
          Start
          <ArrowRight size={15} />
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
