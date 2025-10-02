'use client'

import React, { useState } from 'react';
import {
  ArrowLeft, ArrowRight, Clock, Code2, Cpu, Laptop, Server, Lock, Braces, Database, Play, PauseCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';

const QuickPractice = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [activeTab, setActiveTab] = useState("category");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isInterviewReady, setIsInterviewReady] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const categories = [
    { id: "frontend", name: "Frontend Development", icon: Laptop, description: "Frameworks, UI patterns, and the browser.", topics: ["React", "Vue", "Angular", "CSS", "JavaScript"] },
    { id: "backend", name: "Backend Development", icon: Server, description: "Server-side logic, APIs, and data.", topics: ["Node.js", "Python", "Java", "Go", "REST APIs"] },
    { id: "fullstack", name: "Full Stack Development", icon: Code2, description: "End-to-end application architecture.", topics: ["MERN Stack", "LAMP Stack", "Django", "Ruby on Rails", "Next.js"] },
    { id: "algorithms", name: "Algorithms & Data Structures", icon: Braces, description: "The classic problem-solving rounds.", topics: ["Arrays", "Linked Lists", "Trees", "Dynamic Programming", "Graphs"] },
    { id: "database", name: "Database Systems", icon: Database, description: "Design, optimization, and administration.", topics: ["SQL", "MongoDB", "Redis", "Postgres", "Database Design"] },
    { id: "system", name: "System Design", icon: Cpu, description: "Scalable, distributed architecture.", topics: ["Microservices", "Distributed Systems", "Cloud Architecture", "Load Balancing", "Caching"] },
  ];

  const sampleQuestions = [
    "What is the virtual DOM and how does it improve performance in React?",
    "Explain closures in JavaScript and give an example.",
    "How would you optimize a React app that's experiencing performance issues?",
    "Describe the difference between useEffect and useLayoutEffect.",
    "What are best practices for writing reusable React components?",
  ];

  const handleCategorySelect = (category) => { setSelectedCategory(category); setActiveTab("topic"); };
  const handleTopicSelect = (topic) => { setSelectedTopic(topic); setActiveTab("configure"); };

  const startPreparation = () => {
    setIsStarted(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setLoadingProgress(progress);
      if (progress >= 100) { clearInterval(interval); setIsInterviewReady(true); }
    }, 150);
  };

  const startInterview = () => { setInterviewStarted(true); router.push('/dashboard'); };

  const goBack = () => {
    if (isInterviewReady) { setIsInterviewReady(false); setIsStarted(false); setLoadingProgress(0); }
    else if (activeTab === "configure") { setActiveTab("topic"); setSelectedTopic(null); }
    else if (activeTab === "topic") { setActiveTab("category"); setSelectedCategory(null); }
    else { router.push('/dashboard'); }
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16">
      {!interviewStarted && (
        <Button variant="ghost" className="mb-6 -ml-2" onClick={goBack}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
      )}

      <div className="mb-10">
        <p className="eyebrow">Quick practice</p>
        <h1 className="font-display text-display mt-3 text-foreground">Warm up, right now.</h1>
        <p className="measure mt-3 text-lg text-muted-foreground">
          Pick a focus and jump straight into a session — no setup, no waiting.
        </p>
      </div>

      {!isStarted ? (
        <Tabs value={activeTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="category">Focus</TabsTrigger>
            <TabsTrigger value="topic" disabled={!selectedCategory}>Topic</TabsTrigger>
            <TabsTrigger value="configure" disabled={!selectedTopic}>Configure</TabsTrigger>
          </TabsList>

          {/* Category — editorial rows */}
          <TabsContent value="category">
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              {categories.map((category, i) => {
                const Icon = category.icon;
                const active = selectedCategory?.id === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className={`group flex w-full items-center gap-5 p-5 text-left transition-colors ${i > 0 ? 'border-t border-border' : ''} ${active ? 'bg-accent/40' : 'hover:bg-accent/30'}`}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold tracking-tight text-foreground">{category.name}</span>
                      <span className="block text-sm text-muted-foreground">{category.description}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </button>
                );
              })}
            </div>
          </TabsContent>

          {/* Topic */}
          <TabsContent value="topic">
            {selectedCategory && (
              <div>
                <p className="eyebrow">{selectedCategory.name}</p>
                <h2 className="font-display mt-2 text-2xl text-foreground">Pick a topic</h2>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {selectedCategory.topics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => handleTopicSelect(topic)}
                      className={`rounded-lg border p-4 text-center font-medium transition-all ${selectedTopic === topic ? 'border-primary bg-accent/40' : 'border-border hover:border-foreground/30'}`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Configure */}
          <TabsContent value="configure">
            {selectedTopic && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow">Configure</p>
                    <h2 className="font-display mt-2 text-2xl text-foreground">Set up your {selectedTopic} session</h2>
                  </div>
                  <Badge variant="outline">{selectedCategory.name} · {selectedTopic}</Badge>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-semibold text-foreground">Session length</h4>
                        <p className="text-sm text-muted-foreground">How long should it run?</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">15 min</Button>
                      <Button size="sm">30 min</Button>
                      <Button variant="outline" size="sm">45 min</Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-semibold text-foreground">Difficulty</h4>
                        <p className="text-sm text-muted-foreground">How hard should the questions be?</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Beginner</Button>
                      <Button size="sm">Intermediate</Button>
                      <Button variant="outline" size="sm">Advanced</Button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button size="lg" onClick={startPreparation}>
                    Start session <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      ) : isInterviewReady && !interviewStarted ? (
        <div className="max-w-2xl">
          <p className="eyebrow">Ready</p>
          <h2 className="font-display mt-2 text-2xl text-foreground">
            Your session is ready
          </h2>
          <p className="mt-1 text-muted-foreground">{selectedCategory.name} · {selectedTopic} · Intermediate</p>

          <div className="mt-8 rounded-lg border border-border bg-secondary/40 p-5">
            <span className="eyebrow">Session details</span>
            <ul className="mt-3 space-y-2 text-sm text-foreground">
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> 30 minutes</li>
              <li className="flex items-center gap-2"><Code2 className="h-4 w-4 text-primary" /> 5 technical questions with follow-ups</li>
              <li className="flex items-center gap-2"><Lock className="h-4 w-4 text-primary" /> Intermediate difficulty</li>
            </ul>
          </div>

          <div className="mt-6">
            <span className="eyebrow">Sample questions</span>
            <ul className="mt-3 space-y-2">
              {sampleQuestions.slice(0, 3).map((q, i) => (
                <li key={i} className="rounded-md border border-border bg-card p-3 text-sm text-foreground">{q}</li>
              ))}
              <li className="rounded-md border border-dashed border-border p-3 text-sm text-muted-foreground">+ 2 more questions</li>
            </ul>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Button variant="outline" onClick={goBack}>Change settings</Button>
            <Button size="lg" onClick={startInterview}>Begin <Play className="h-4 w-4" /></Button>
          </div>
        </div>
      ) : isInterviewReady && interviewStarted ? (
        <div className="rounded-lg border border-border bg-card p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">In progress</p>
              <h2 className="font-display mt-2 text-2xl text-foreground">{selectedTopic} session</h2>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> 28:45 left
              </Badge>
              <Button variant="outline" size="sm"><PauseCircle className="h-4 w-4" /> Pause</Button>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="nums flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                {currentQuestion + 1}
              </span>
              <span className="text-sm text-muted-foreground">Question {currentQuestion + 1} of 5</span>
            </div>
            <Progress value={(currentQuestion + 1) * 20} className="w-32" />
          </div>

          <div className="mt-6">
            <h3 className="font-display text-xl leading-snug text-foreground">{sampleQuestions[currentQuestion]}</h3>
            <div className="mt-4 rounded-lg border border-border bg-secondary/40 p-4">
              <div className="mb-3 flex items-center gap-3">
                <Avatar><AvatarFallback>AI</AvatarFallback></Avatar>
                <span className="font-semibold text-foreground">Interviewer</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Can you go deeper? I’m especially interested in how React’s rendering optimization works in practice.
              </p>
            </div>
            <Textarea placeholder="Type your answer here…" className="mt-4 min-h-32" />
          </div>

          <div className="mt-6 flex justify-between">
            <Button variant="outline" disabled={currentQuestion === 0} onClick={() => setCurrentQuestion((c) => c - 1)}>
              Previous
            </Button>
            <Button onClick={() => setCurrentQuestion((c) => Math.min(c + 1, 4))}>
              {currentQuestion < 4 ? 'Next question' : 'Complete'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-w-xl rounded-lg border border-border bg-card p-6 md:p-8">
          <p className="eyebrow">Preparing</p>
          <h2 className="font-display mt-2 text-2xl text-foreground">Building your session</h2>
          <p className="mt-1 text-sm text-muted-foreground">Generating tailored questions for {selectedTopic}…</p>
          <Progress value={loadingProgress} className="mt-6" />
          <p className="nums mt-3 text-center text-sm text-muted-foreground">{loadingProgress}%</p>
        </div>
      )}
    </div>
  );
};

export default QuickPractice;
