import Navbar from './components/navbar';
import HeroSection from './components/hero-section';
import AboutSection from './components/about-section';
import SkillsSection from './components/skills-section';
import ProjectsSection from './components/projects-section';
import CaseStudySection from './components/case-study-section';
import PrinciplesSection from './components/principles-section';
import CoreStrengthsSection from './components/core-strengths-section';
import NowSection from './components/now-section';
import ExperienceSection from './components/experience-section';
import ResumeSection from './components/resume-section';
import ContactSection from './components/contact-section';
import Footer from './components/footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <CaseStudySection />
      <PrinciplesSection />
      <CoreStrengthsSection />
      <SkillsSection />
      <ExperienceSection />
      <NowSection />
      <ResumeSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
