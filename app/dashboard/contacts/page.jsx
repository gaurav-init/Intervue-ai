"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Mail, MapPin, Phone, MessageSquare, HelpCircle, LifeBuoy, Check, Briefcase } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  department: z.string(),
  priority: z.enum(["low", "medium", "high"], { required_error: "Please select a priority level." }),
});

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState("contact-form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", department: "support", priority: "medium" },
  });

  function onSubmit(values) {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      console.log(values);
      toast.success("Message sent", {
        description: "We've received your message and will get back to you soon.",
      });
    }, 1500);
  }

  const contactInfo = [
    { icon: Mail, title: "Email", details: "support@mockinterview.com", description: "We reply within 24 hours" },
    { icon: Phone, title: "Phone", details: "+1 (555) 123-4567", description: "Mon–Fri, 9am–5pm EST" },
    { icon: MapPin, title: "Office", details: "123 Tech Lane, San Francisco", description: "By appointment only" },
  ];

  const faqs = [
    { question: "How do I schedule a mock interview?", answer: "Log in, open the dashboard, and use Schedule a session. Pick a time and you’re set." },
    { question: "What payment methods do you accept?", answer: "All major credit cards, PayPal, and Apple Pay. Enterprise customers can pay by invoice." },
    { question: "Can I cancel my subscription?", answer: "Anytime, from account settings. You keep access until the end of the billing period." },
    { question: "How do I prepare for a session?", answer: "Have the job description and your resume handy. We’ll send prep materials 24 hours ahead." },
  ];

  const businessPerks = ["Bulk license discounts", "Custom interview scenarios", "Analytics and reporting", "Dedicated account manager"];

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
      {/* Masthead */}
      <div className="max-w-2xl">
        <p className="eyebrow">Contact</p>
        <h1 className="font-display text-display mt-3 text-foreground">
          How can we help?
        </h1>
        <p className="measure mt-4 text-lg text-muted-foreground">
          Questions about a plan, a snag in a session, or a partnership idea —
          we’re glad to hear from you.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-10">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="contact-form" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> <span className="hidden sm:inline">Message</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" /> <span className="hidden sm:inline">Support</span>
          </TabsTrigger>
          <TabsTrigger value="business" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" /> <span className="hidden sm:inline">Business</span>
          </TabsTrigger>
        </TabsList>

        {/* MESSAGE */}
        <TabsContent value="contact-form" className="mt-10">
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <div>
              {isSuccess ? (
                <div className="rounded-lg border border-border bg-card px-6 py-16 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display mt-5 text-2xl text-foreground">Message sent</h3>
                  <p className="measure mx-auto mt-2 text-muted-foreground">
                    Thanks for reaching out — we’ll get back to you as soon as we can.
                  </p>
                  <Button className="mt-6" onClick={() => { form.reset(); setIsSuccess(false); }}>
                    Send another
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl><Input placeholder="Your name" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl><Input placeholder="you@email.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField control={form.control} name="department" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="support">Technical Support</SelectItem>
                              <SelectItem value="billing">Billing & Accounts</SelectItem>
                              <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                              <SelectItem value="partnerships">Business Partnerships</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="priority" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Priority</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 pt-1">
                              {["low", "medium", "high"].map((p) => (
                                <FormItem key={p} className="flex items-center space-x-2 space-y-0">
                                  <FormControl><RadioGroupItem value={p} /></FormControl>
                                  <FormLabel className="font-normal capitalize">{p}</FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="subject" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl><Input placeholder="What's this about?" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl><Textarea placeholder="How can we help?" className="min-h-32" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <Button type="submit" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? "Sending…" : "Send message"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>

            {/* Aside */}
            <div className="space-y-8">
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                {contactInfo.map((item, i) => (
                  <div key={item.title} className={`flex items-start gap-3 p-5 ${i > 0 ? "border-t border-border" : ""}`}>
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <span className="eyebrow">{item.title}</span>
                      <p className="mt-1 font-semibold text-foreground">{item.details}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-border bg-secondary/50 p-5">
                <div className="flex items-center gap-2">
                  <LifeBuoy className="h-5 w-5 text-primary" />
                  <span className="eyebrow">Need it fast?</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Premium members get a priority support line for immediate help.
                </p>
                <Button variant="outline" className="mt-4 w-full">View support options</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* SUPPORT */}
        <TabsContent value="support" className="mt-10">
          <div className="max-w-3xl">
            <span className="eyebrow">FAQ</span>
            <h2 className="font-display mt-2 text-2xl text-foreground">Common questions</h2>
            <div className="mt-8 border-t border-border">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-border py-6">
                  <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                  <p className="measure mt-2 text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h3 className="font-semibold text-foreground">Still stuck?</h3>
              <p className="measure mt-1 text-sm text-muted-foreground">
                Our team is here to help. Send a note and we’ll get back to you quickly.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => setActiveTab("contact-form")}>
                  <MessageSquare className="h-4 w-4" /> Send a message
                </Button>
                <Button variant="outline">Knowledge base</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* BUSINESS */}
        <TabsContent value="business" className="mt-10">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow">For teams</span>
              <h2 className="font-display mt-2 text-2xl text-foreground">Business solutions</h2>
              <p className="measure mt-4 text-muted-foreground">
                Equip your team or cohort with interview practice. Enterprise plans
                scale to organizations of any size.
              </p>
              <ul className="mt-6 space-y-3">
                {businessPerks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-foreground">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button>Request a demo</Button>
                <Button variant="outline" onClick={() => setActiveTab("contact-form")}>Contact sales</Button>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-secondary/40 p-6 md:p-8">
              <h3 className="font-display text-xl text-foreground">Partner with us</h3>
              <p className="measure mt-2 text-sm text-muted-foreground">
                We work with coaching services, schools, and recruiting firms to
                provide integrated interview prep.
              </p>
              <form className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Company</label>
                    <Input placeholder="Your company" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Industry</label>
                    <Select defaultValue="education">
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="recruiting">Recruiting</SelectItem>
                        <SelectItem value="coaching">Career Coaching</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input placeholder="business@email.com" />
                </div>
                <Button className="w-full">Join the partner program</Button>
              </form>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContactPage;
