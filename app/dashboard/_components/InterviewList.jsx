"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import InterviewItemCard from './InterviewItemCard';
import { Search, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  useEffect(() => {
    if (interviewList.length > 0) {
      applyFilters();
    }
  }, [searchQuery, sortOrder, interviewList]);

  const GetInterviewList = async () => {
    setLoading(true);
    try {
      const result = await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id));

      console.log(result);
      setInterviewList(result);
      setFilteredList(result);
    } catch (error) {
      console.error("Failed to fetch interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...interviewList];
    
    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.jobPosition.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.jobDesc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOrder === "experience-high") {
      filtered.sort((a, b) => b.jobExperience - a.jobExperience);
    } else if (sortOrder === "experience-low") {
      filtered.sort((a, b) => a.jobExperience - b.jobExperience);
    }
    
    setFilteredList(filtered);
  };

  const hasInterviews = !loading && filteredList.length > 0;

  return (
    <div className="space-y-7">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Your history</p>
          <h2 className="font-display mt-2 text-3xl text-foreground">
            Past sessions
          </h2>
        </div>
        <div className="flex w-full gap-3 md:w-auto">
          <div className="relative flex-grow md:w-72">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={17}
            />
            <Input
              placeholder="Search position or stack…"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[170px] shrink-0">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="experience-high">Most experience</SelectItem>
              <SelectItem value="experience-low">Least experience</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasInterviews ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredList.map((interview, index) => (
            <InterviewItemCard interview={interview} key={index} />
          ))}
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-card p-5"
              >
                <div className="h-6 w-2/3 animate-pulse rounded bg-muted" />
                <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-muted" />
                <div className="mt-5 flex gap-2">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="h-6 w-16 animate-pulse rounded-full bg-muted"
                      />
                    ))}
                </div>
                <div className="mt-5 flex gap-2 border-t border-border pt-4">
                  <div className="h-8 flex-1 animate-pulse rounded bg-muted" />
                  <div className="h-8 flex-1 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border bg-secondary/30 px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card">
            <FileText size={24} className="text-muted-foreground" />
          </div>
          <h3 className="font-display mt-5 text-xl text-foreground">
            {searchQuery ? 'Nothing matches that search' : 'No sessions yet'}
          </h3>
          <p className="measure mx-auto mt-2 text-sm text-muted-foreground">
            {searchQuery
              ? 'Try a different position or technology, or clear the search to see everything.'
              : 'Create your first interview above. Describe the role, answer on camera, and get coached on every answer.'}
          </p>
        </div>
      )}
    </div>
  );
}

export default InterviewList;