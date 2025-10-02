"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({params}) {

    const [interviewData,setInterviewData]=useState();
    const [webCamEnabled,setWebCamEnabled]=useState();
    useEffect(()=>{
        console.log(params.interviewId)
        GetInterviewDetails();
    },[])

    /**
     * Used to Get Interview Details by MockId/Interview Id
     */
    const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))

        setInterviewData(result[0]);
    }
  const details = [
    { label: 'Role', value: interviewData?.jobPosition },
    { label: 'Stack', value: interviewData?.jobDesc },
    { label: 'Experience', value: interviewData ? `${interviewData.jobExperience} years` : null },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16">
      <p className="eyebrow">Pre-flight</p>
      <h1 className="font-display text-display mt-3 text-foreground">
        Before you begin
      </h1>
      <p className="measure mt-3 text-lg text-muted-foreground">
        A quick look at the session ahead. Set up your camera and mic, take a
        breath, and start when you&apos;re ready.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Details */}
        <div>
          <dl className="overflow-hidden rounded-lg border border-border bg-card">
            {details.map((d, i) => (
              <div
                key={d.label}
                className={`grid grid-cols-[110px_1fr] gap-4 p-5 ${
                  i > 0 ? 'border-t border-border' : ''
                }`}
              >
                <dt className="eyebrow pt-0.5">{d.label}</dt>
                <dd className="text-[0.95rem] font-medium leading-relaxed text-foreground">
                  {d.value || <span className="text-muted-foreground">—</span>}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex gap-3 rounded-lg border border-border bg-secondary/50 p-5">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Before you start
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {process.env.NEXT_PUBLIC_INFORMATION ||
                  'Enable your webcam and microphone. Answer each question out loud, just as you would in the real interview.'}
              </p>
            </div>
          </div>
        </div>

        {/* Camera */}
        <div className="flex flex-col">
          <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-secondary/40">
            {webCamEnabled ? (
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                mirrored={true}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <WebcamIcon className="h-16 w-16" strokeWidth={1.25} />
                <span className="text-sm">Camera is off</span>
              </div>
            )}
          </div>
          {!webCamEnabled && (
            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={() => setWebCamEnabled(true)}
            >
              <WebcamIcon className="h-4 w-4" />
              Enable camera &amp; microphone
            </Button>
          )}
        </div>
      </div>

      <div className="mt-12 flex justify-end border-t border-border pt-6">
        <Link href={'/dashboard/interview/' + params.interviewId + '/start'}>
          <Button size="lg">
            Start interview
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Interview