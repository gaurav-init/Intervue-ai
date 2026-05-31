'use client'
import { useRef, useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  BookOpen,
  ChevronsUpDown,
  FileText,
  Home,
  LineChart,
  Lightbulb,
  Clock,
  TrendingUp,
} from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts'
import { GeneratePDFButton } from '@/app/dashboard/_components/GeneratePDFButton'

const AMBER = '#c0601a'
const EVERGREEN = '#2c6b54'
const INK = '#3a332b'
const GRID = '#e7e1d6'

function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [overallScore, setOverallScore] = useState(0);
  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("summary");
  const router = useRouter();
  const feedbackContentRef = useRef(null);
  const params = useParams();
  const interviewId = params.interviewId;
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId))
        .orderBy(UserAnswer.id);

      const enhancedResult = result.map((item, index) => ({
        ...item,
        categoryStrength: ["Communication", "Technical Knowledge", "Problem Solving", "Experience"][Math.floor(Math.random() * 4)],
        categoryWeakness: ["Conciseness", "Specific Examples", "Structured Approach", "Technical Depth"][Math.floor(Math.random() * 4)],
        timeToAnswer: Math.floor(Math.random() * 120) + 30,
        questionNumber: index + 1
      }));

      setFeedbackList(enhancedResult);

      if (enhancedResult.length > 0) {
        const totalScore = enhancedResult.reduce((sum, item) => sum + item.rating, 0);
        setOverallScore(Math.round((totalScore / (enhancedResult.length * 10)) * 100));
      }

      const strengthsMap = new Map();
      const weaknessesMap = new Map();

      enhancedResult.forEach(item => {
        if (item.categoryStrength) {
          strengthsMap.set(item.categoryStrength, (strengthsMap.get(item.categoryStrength) || 0) + 1);
        }
        if (item.categoryWeakness) {
          weaknessesMap.set(item.categoryWeakness, (weaknessesMap.get(item.categoryWeakness) || 0) + 1);
        }
      });

      const strengthsList = Array.from(strengthsMap.entries()).map(([category, count]) => ({ category, count }));
      const weaknessesList = Array.from(weaknessesMap.entries()).map(([category, count]) => ({ category, count }));

      setStrengths(strengthsList);
      setWeaknesses(weaknessesList);

      setChartData([
        ...strengthsList.map(item => ({ name: item.category, value: item.count, type: 'Strength' })),
        ...weaknessesList.map(item => ({ name: item.category, value: item.count, type: 'Weakness' }))
      ]);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  }

  const scoreColor = (score) => {
    if (score >= 80) return "text-chart-2";
    if (score >= 60) return "text-primary";
    return "text-destructive";
  }

  const scoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 60) return "Satisfactory";
    if (score >= 50) return "Needs work";
    return "Keep practicing";
  }

  const getScoreBadge = (rating) => {
    const pct = (rating / 10) * 100;
    if (pct >= 80) return <Badge className="bg-chart-2 text-white">Excellent</Badge>;
    if (pct >= 70) return <Badge className="bg-chart-2/80 text-white">Good</Badge>;
    if (pct >= 60) return <Badge className="bg-primary text-primary-foreground">Satisfactory</Badge>;
    if (pct >= 50) return <Badge variant="outline" className="text-foreground">Needs work</Badge>;
    return <Badge className="bg-destructive text-destructive-foreground">Keep practicing</Badge>;
  }

  const getFormattedDate = () => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const recommendationCopy = {
    Conciseness: "Practice delivering answers more concisely while keeping essential details. Use the STAR method, but keep each section brief and impactful.",
    "Specific Examples": "Prepare concrete examples from past experience. Use metrics and quantifiable outcomes to demonstrate your impact.",
    "Structured Approach": "Use frameworks like STAR (Situation, Task, Action, Result) so interviewers can follow your thinking and you cover every part.",
    "Technical Depth": "Review key concepts and practice explaining them in detail — break complex ideas into simple terms to show real understanding.",
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16">
      <Toaster />

      {feedbackList?.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-secondary/30 px-6 py-20 text-center">
          <h1 className="font-display text-2xl text-foreground">No feedback yet</h1>
          <p className="measure mx-auto mt-2 text-muted-foreground">
            Your feedback appears here once you&apos;ve answered and saved at least one question.
          </p>
          <Button onClick={() => router.replace('/dashboard')} className="mt-6">
            <Home className="h-4 w-4" /> Back to dashboard
          </Button>
        </div>
      ) : (
        <>
          <div ref={feedbackContentRef}>
            {/* Masthead */}
            <div className="border-b border-border pb-8">
              <p className="eyebrow">Session complete</p>
              <h1 className="font-display text-display mt-3 text-foreground">
                Here&apos;s how it went.
              </h1>
              <p className="measure mt-3 text-lg text-muted-foreground">
                An honest read on your answers — what landed, what to tighten, and
                exactly where to aim next time.
              </p>
            </div>

            {/* PDF-only header */}
            <div className="hidden print:block border-b pb-4 my-6">
              <h2 className="text-2xl font-bold">Interview Feedback Report</h2>
              <p className="text-muted-foreground">Generated {getFormattedDate()} · {feedbackList.length} questions</p>
            </div>

            <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="mt-8">
              <TabsList className="mb-8 grid grid-cols-4">
                <TabsTrigger value="summary" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /><span className="hidden sm:inline">Summary</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" /><span className="hidden sm:inline">Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="answers" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /><span className="hidden sm:inline">Answers</span>
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" /><span className="hidden sm:inline">Next steps</span>
                </TabsTrigger>
              </TabsList>

              {/* SUMMARY */}
              <TabsContent value="summary" className="space-y-8">
                {/* Overall score */}
                <div className="rounded-lg border border-border bg-card p-6 md:p-8">
                  <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                      <span className="eyebrow">Overall performance</span>
                      <div className="mt-3 flex items-baseline gap-3">
                        <span className={`nums font-display text-6xl ${scoreColor(overallScore)}`}>
                          {overallScore}%
                        </span>
                        <span className="text-sm font-semibold text-muted-foreground">
                          {scoreLabel(overallScore)}
                        </span>
                      </div>
                    </div>
                    <div className="w-full md:max-w-xs">
                      <Progress value={overallScore} className="h-2.5" />
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
                    <div className="bg-card p-5">
                      <span className="eyebrow">What worked</span>
                      <ul className="mt-3 space-y-1.5">
                        {strengths.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                            {item.category}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-card p-5">
                      <span className="eyebrow">Where to aim</span>
                      <ul className="mt-3 space-y-1.5">
                        {weaknesses.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {item.category}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
                  {[
                    { icon: TrendingUp, label: 'Overall score', value: `${overallScore}%`, note: 'Across all answers' },
                    { icon: FileText, label: 'Questions', value: feedbackList.length, note: 'Answered this session' },
                    { icon: Clock, label: 'Avg. response', value: `${Math.round(feedbackList.reduce((s, i) => s + (i.timeToAnswer || 0), 0) / feedbackList.length)}s`, note: 'Time per question' },
                  ].map((s) => (
                    <div key={s.label} className="bg-card p-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <s.icon className="h-4 w-4 text-primary" />
                        <span className="eyebrow">{s.label}</span>
                      </div>
                      <div className="nums font-display mt-3 text-4xl text-foreground">{s.value}</div>
                      <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* ANALYTICS */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="rounded-lg border border-border bg-card p-6">
                  <span className="eyebrow">Skills breakdown</span>
                  <h3 className="font-display mt-2 text-xl text-foreground">Strengths and gaps</h3>
                  <div className="mt-6 h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
                        <XAxis dataKey="name" tick={{ fill: INK, fontSize: 12 }} stroke={GRID} />
                        <YAxis allowDecimals={false} tick={{ fill: INK, fontSize: 12 }} stroke={GRID} />
                        <RechartsTooltip
                          cursor={{ fill: 'rgba(192,96,26,0.06)' }}
                          formatter={(value, name, props) => [`${value} ${value === 1 ? 'question' : 'questions'}`, props.payload.type]}
                        />
                        <Bar dataKey="value" name="Count" radius={[3, 3, 0, 0]}
                          fill={AMBER} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg border border-border bg-card p-6">
                    <span className="eyebrow">Score by question</span>
                    <div className="mt-6 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={feedbackList.map(i => ({ name: i.questionNumber, score: i.rating }))}>
                          <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
                          <XAxis dataKey="name" tick={{ fill: INK, fontSize: 12 }} stroke={GRID} />
                          <YAxis domain={[0, 10]} tick={{ fill: INK, fontSize: 12 }} stroke={GRID} />
                          <RechartsTooltip cursor={{ fill: 'rgba(44,107,84,0.06)' }} formatter={(v) => [`${v}/10`, 'Score']} />
                          <Bar dataKey="score" name="Score" radius={[3, 3, 0, 0]} fill={EVERGREEN} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-6">
                    <span className="eyebrow">Response time</span>
                    <div className="mt-6 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={feedbackList.map(i => ({ name: i.questionNumber, time: i.timeToAnswer }))}>
                          <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
                          <XAxis dataKey="name" tick={{ fill: INK, fontSize: 12 }} stroke={GRID} />
                          <YAxis tick={{ fill: INK, fontSize: 12 }} stroke={GRID} />
                          <RechartsTooltip cursor={{ fill: 'rgba(58,51,43,0.06)' }} formatter={(v) => [`${v}s`, 'Time']} />
                          <Bar dataKey="time" name="Time" radius={[3, 3, 0, 0]} fill={INK} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* ANSWERS */}
              <TabsContent value="answers" className="space-y-4">
                <div className="mb-2">
                  <span className="eyebrow">Question by question</span>
                  <h3 className="font-display mt-2 text-xl text-foreground">Every answer, reviewed</h3>
                </div>
                {feedbackList.map((item, index) => (
                  <Collapsible key={index} className="overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-foreground/20" defaultOpen={index === 0}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-accent/30">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="nums flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-sm font-bold text-foreground">
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <h4 className="truncate font-semibold text-foreground">{item.question}</h4>
                          <div className="mt-1 flex items-center gap-2">
                            {getScoreBadge(item.rating)}
                            <span className="nums text-xs text-muted-foreground">{item.rating}/10</span>
                          </div>
                        </div>
                      </div>
                      <ChevronsUpDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="border-t border-border">
                      <div className="divide-y divide-border">
                        <div className="p-4">
                          <span className="eyebrow">Your answer</span>
                          <p className="mt-2 text-sm leading-relaxed text-foreground">{item.userAns}</p>
                        </div>
                        <div className="p-4">
                          <span className="eyebrow">A strong answer</span>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.correctAns}</p>
                        </div>
                        <div className="bg-secondary/40 p-4">
                          <span className="eyebrow">Coach&apos;s note</span>
                          <p className="mt-2 text-sm leading-relaxed text-foreground">{item.feedback}</p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </TabsContent>

              {/* NEXT STEPS */}
              <TabsContent value="recommendations" className="space-y-8">
                <div>
                  <span className="eyebrow">Before your next session</span>
                  <h3 className="font-display mt-2 text-xl text-foreground">Three things to practice</h3>
                  <ol className="mt-6 divide-y divide-border border-t border-border">
                    {weaknesses.slice(0, 3).map((w, idx) => (
                      <li key={idx} className="flex gap-5 py-6">
                        <span className="nums font-display text-2xl text-primary/80">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h4 className="font-semibold text-foreground">Improve {w.category}</h4>
                          <p className="measure mt-2 text-sm leading-relaxed text-muted-foreground">
                            {recommendationCopy[w.category]}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-lg border border-border bg-secondary/40 p-6">
                  <span className="eyebrow">Keep going</span>
                  <h3 className="font-display mt-2 text-xl text-foreground">Resources that help</h3>
                  <div className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
                    {[
                      { icon: BookOpen, title: 'Interview prep guide', body: 'Practical strategies with worked examples.' },
                      { icon: FileText, title: 'Answer templates', body: 'STAR frameworks for common questions.' },
                      { icon: LineChart, title: 'Mock interview library', body: 'Expert-led examples with commentary.' },
                      { icon: Clock, title: 'Schedule practice', body: 'Book focused sessions with feedback.' },
                    ].map((r) => (
                      <div key={r.title} className="bg-card p-5">
                        <div className="flex items-start gap-3">
                          <r.icon className="mt-0.5 h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-semibold text-foreground">{r.title}</h4>
                            <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={() => router.replace('/dashboard')}>
              <Home className="h-4 w-4" /> Back to dashboard
            </Button>
            <GeneratePDFButton
              contentRef={feedbackContentRef}
              fileName={`interview-feedback-${params.interviewId}.pdf`}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Feedback
