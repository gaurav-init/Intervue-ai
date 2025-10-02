"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { use, useEffect, useState } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, MicIcon, Video } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const {interviewId}= use(params);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  // Timer for interview session
  useEffect(() => {
    if (mockInterviewQuestion && !loading) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [mockInterviewQuestion, loading]);

 
  const GetInterviewDetails = async () => {
    try {
      const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      if (result && result.length > 0) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
        setTotalTime(jsonMockResp.length * 300); // Assuming 5 min per question
      } else {
        console.error("Interview not found");
      }
    } catch (error) {
      console.error("Error fetching interview data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Calculate progress percentage
  const progressPercentage = mockInterviewQuestion ? 
    Math.floor(((activeQuestionIndex + 1) / mockInterviewQuestion.length) * 100) : 0;

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!mockInterviewQuestion) {
    return (
      <Alert variant="destructive" className="m-8">
        <AlertTitle>Interview not found</AlertTitle>
        <AlertDescription>
          The interview you're looking for couldn't be loaded. Please try again or return to the dashboard.
          <div className="mt-4">
            <Link href="/dashboard">
              <Button>Return to Dashboard</Button>
            </Link>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header with progress */}
      <div className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Live session</p>
            <h1 className="font-display mt-2 text-3xl text-foreground">
              {interviewData?.jobPosition || interviewData?.interviewTitle || 'Mock interview'}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Question <span className="nums">{activeQuestionIndex + 1}</span> of{' '}
              <span className="nums">{mockInterviewQuestion?.length}</span>
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="nums text-sm font-medium text-foreground">
              {formatTime(timeElapsed)}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="eyebrow">Progress</span>
            <span className="nums text-xs text-muted-foreground">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        {/* Questions */}
        <Card className="md:max-h-[100vh] ">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>The question</span>
              {mockInterviewQuestion[activeQuestionIndex]?.answered &&
                <CheckCircle className="h-4 w-4 text-primary" />
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QuestionsSection
              mockInterviewQuestion={mockInterviewQuestion}
              activeQuestionIndex={activeQuestionIndex}
              setActiveQuestionIndex={setActiveQuestionIndex}
            />
          </CardContent>
        </Card>

        {/* Video/Audio Recording */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MicIcon className="h-4 w-4" />
              <span>Record Your Answer</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecordAnswerSection
              mockInterviewQuestion={mockInterviewQuestion}
              activeQuestionIndex={activeQuestionIndex}
              interviewData={interviewData}
            />
          </CardContent>
        </Card>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center pt-4">
        <Button 
          variant="outline" 
          onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          disabled={activeQuestionIndex <= 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Previous
        </Button>
        
        <div className="text-center text-sm text-muted-foreground">
          {activeQuestionIndex + 1} of {mockInterviewQuestion?.length}
        </div>
        
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 ? (
          <Link href={'/dashboard/interview/' + interviewData?.mockId + "/feedback"}>
            <Button className="flex items-center gap-2">
              Complete Interview <CheckCircle className="h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <Button 
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
            className="flex items-center gap-2"
          >
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default StartInterview;