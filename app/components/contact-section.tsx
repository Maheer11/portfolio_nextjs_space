'use client';

import { useState, type FormEvent } from 'react';
import { Send, Mail, MapPin, Github, Linkedin } from 'lucide-react';
import { siteConfig } from '@/lib/portfolio-data';
import { Section } from '@/components/layouts/section';
import { Container } from '@/components/layouts/container';
import { FadeIn, SlideIn } from '@/components/ui/animate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData?.name?.trim() || !formData?.email?.trim() || !formData?.message?.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSending(true);
    try {
      // Web3Forms delivers submissions to the inbox tied to this access key.
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'eccb43fc-ed49-4bde-9699-15d80cd60621',
          ...formData,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res?.ok && data?.success) {
        toast.success('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Failed to send. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  const socialLinks = [
    { icon: Github, href: siteConfig?.github ?? '#', label: 'GitHub' },
    { icon: Linkedin, href: siteConfig?.linkedin ?? '#', label: 'LinkedIn' },
  ];

  return (
    <Section id="contact" className="bg-muted/30">
      <Container size="lg">
        <FadeIn>
          <div className="flex items-center gap-3 mb-2">
            <Send className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Let&apos;s connect
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Get In Touch
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Have a project in mind or want to chat? Feel free to reach out — I&apos;m always open to new opportunities and collaborations.
          </p>
        </FadeIn>

        <div className="mt-10 grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <SlideIn from="left" className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5 rounded-xl bg-card p-6 shadow-md">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e: any) =>
                      setFormData((prev: any) => ({ ...(prev ?? {}), name: e?.target?.value ?? '' }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e: any) =>
                      setFormData((prev: any) => ({ ...(prev ?? {}), email: e?.target?.value ?? '' }))
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={(e: any) =>
                    setFormData((prev: any) => ({ ...(prev ?? {}), subject: e?.target?.value ?? '' }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project or just say hi..."
                  rows={5}
                  value={formData.message}
                  onChange={(e: any) =>
                    setFormData((prev: any) => ({ ...(prev ?? {}), message: e?.target?.value ?? '' }))
                  }
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto" loading={sending}>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              <p className="text-xs text-muted-foreground">
                Your information will be stored securely and used only to respond to your inquiry.
              </p>
            </form>
          </SlideIn>

          {/* Contact info */}
          <SlideIn from="right" className="lg:col-span-2">
            <div className="space-y-6">
              <div className="rounded-xl bg-card p-6 shadow-md space-y-4">
                <h3 className="font-display text-lg font-semibold text-foreground">Contact Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    {siteConfig?.email ?? ''}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    {siteConfig?.location ?? ''}
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-card p-6 shadow-md">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">Follow Me</h3>
                <div className="flex gap-3">
                  {socialLinks.map((link: any) => (
                    <a
                      key={link?.label}
                      href={link?.href ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={link?.label ?? ''}
                    >
                      {link?.icon && <link.icon className="h-5 w-5" />}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </Container>
    </Section>
  );
}
