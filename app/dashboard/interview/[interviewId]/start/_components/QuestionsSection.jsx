"use client";
import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function QuestionsSection({ mockInterviewQuestion = [], activeQuestionIndex, setActiveQuestionIndex }) {
  // Ensure mockInterviewQuestion is always an array
  const questions = Array.isArray(mockInterviewQuestion) ? mockInterviewQuestion : [];

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  if (questions.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">No questions available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Question Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {questions.map((question, index) => (
          <Badge
            key={index}
            variant={activeQuestionIndex === index ? "default" : "outline"}
            className={`py-1.5 cursor-pointer hover:opacity-90 transition-all ${
              activeQuestionIndex === index ? "bg-primary text-primary-foreground" : ""
            }`}
            onClick={() => setActiveQuestionIndex && setActiveQuestionIndex(index)}
          >
            Question {index + 1}
          </Badge>
        ))}
      </div>

      {/* Current Question Display */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <span className="eyebrow pt-1">Question {activeQuestionIndex + 1}</span>
          <button
            onClick={() => {
              const questionText =
                questions[activeQuestionIndex]?.question ||
                questions[activeQuestionIndex]?.Question ||
                "No question available";
              textToSpeech(questionText);
            }}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Volume2 className="h-4 w-4" />
            <span className="hidden sm:inline">Listen</span>
          </button>
        </div>

        <p className="font-display text-2xl leading-snug text-foreground">
          {questions[activeQuestionIndex]?.question ||
           questions[activeQuestionIndex]?.Question ||
           "No question available"}
        </p>
      </div>

      {/* Note Section */}
      <div className="flex gap-3 rounded-lg border border-border bg-secondary/50 p-4">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <div>
          <span className="eyebrow">Note</span>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE ||
             "Take your time to formulate a comprehensive answer. Speak clearly and confidently."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default QuestionsSection;
