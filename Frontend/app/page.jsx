import Link from "next/link";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import {
  CheckCircle,
  BrainCircuit,
  FileSearch,
  BarChart,
  Users,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white -z-10" />
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
              <div>
                <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-600 mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                  New: Enhanced AI Candidate Matching
                </div>
                <h1 className="text-5xl md:text-6xl font-bold font-poppins text-text-dark leading-tight tracking-tight">
                  Hire Smarter with <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    AI-Powered
                  </span>{" "}
                  Resume Analysis
                </h1>
                <p className="mt-6 text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
                  Automatically analyze, match, and rank candidates against your
                  job requirements in seconds. Focus on the best talent, not
                  reading PDFs.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-8">
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full h-12 px-8 text-base shadow-lg shadow-blue-500/20"
                  >
                    Analyze Resumes
                  </Button>
                </Link>
                <Link href="#demo" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full h-12 px-8 text-base"
                  >
                    View Demo
                  </Button>
                </Link>
              </div>

              <div className="w-full max-w-5xl mt-16 relative rounded-2xl overflow-hidden border border-border shadow-2xl bg-white">
                <div className="bg-gray-100 border-b border-border h-8 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                  alt="Dashboard Mockup"
                  className="w-full h-auto object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-12 border-y border-border bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-8">
              Trusted by modern hiring teams
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale">
              <span className="font-poppins text-2xl font-bold">Acme</span>
              <span className="font-poppins text-2xl font-bold">TechNova</span>
              <span className="font-poppins text-2xl font-bold">CloudCore</span>
              <span className="font-poppins text-2xl font-bold">InnovateX</span>
              <span className="font-poppins text-2xl font-bold">Vertex</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-text-dark mb-4">
                Everything you need to hire faster
              </h2>
              <p className="text-lg text-text-muted">
                Our AI-powered platform automates the most time-consuming parts
                of recruitment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: BrainCircuit,
                  title: "AI Resume Screening",
                  desc: "Instantly extract skills, experience, and education from any resume format.",
                },
                {
                  icon: Users,
                  title: "Candidate Matching",
                  desc: "Automatically match candidates against your specific job descriptions.",
                },
                {
                  icon: FileSearch,
                  title: "Skill Extraction",
                  desc: "Identify core competencies and detect missing required skills.",
                },
                {
                  icon: BarChart,
                  title: "Intelligent Scoring",
                  desc: "Get a clear 0-100 match score for every applicant.",
                },
                {
                  icon: CheckCircle,
                  title: "Candidate Ranking",
                  desc: "Sort hundreds of resumes to find the top 5% instantly.",
                },
                {
                  icon: BarChart,
                  title: "Hiring Analytics",
                  desc: "Track your hiring pipeline and analyze recruitment metrics.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-border bg-white hover:shadow-lg transition-shadow"
                >
                  <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold font-poppins text-text-dark mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-muted">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section
          id="how-it-works"
          className="py-24 bg-gray-50 border-t border-border"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-text-dark mb-4">
                How it works
              </h2>
              <p className="text-lg text-text-muted">
                Four simple steps to find your perfect candidate.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Upload Resumes",
                  desc: "Drop individual PDFs or batch upload hundreds of applications.",
                },
                {
                  step: "02",
                  title: "Add Job Requirements",
                  desc: "Paste your job description or let AI generate one.",
                },
                {
                  step: "03",
                  title: "AI Analyzes Candidates",
                  desc: "Our models extract data and score each applicant in seconds.",
                },
                {
                  step: "04",
                  title: "Review Ranked Results",
                  desc: "Focus your time interviewing only the strongest matches.",
                },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="text-5xl font-bold text-gray-200 font-poppins mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold font-poppins text-text-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-sm">{item.desc}</p>
                  {i !== 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-border -z-10 ml-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto bg-blue-600 rounded-3xl p-12 text-white shadow-xl shadow-blue-600/20">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
                Start analyzing resumes today
              </h2>
              <p className="text-blue-100 mb-8 text-lg">
                Join thousands of modern hiring teams using ResumeAI to
                streamline their recruitment.
              </p>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-50 h-12 px-8 text-base"
                >
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border bg-gray-50 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BrainCircuit className="h-6 w-6 text-blue-600" />
          <span className="font-poppins text-xl font-bold text-text-dark">
            ResumeAI
          </span>
        </div>
        <p className="text-text-muted text-sm">
          © 2026 ResumeAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
