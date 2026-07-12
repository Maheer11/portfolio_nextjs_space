"use client";

import { useMemo, useState } from "react";
import {
  FolderKanban,
  ExternalLink,
  Github,
  Images as ImagesIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import {
  projectsData,
  projectCategories,
  type Project,
  type ProjectImage,
} from "@/lib/portfolio-data";
import { Section } from "@/components/layouts/section";
import { Container } from "@/components/layouts/container";
import { FadeIn } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const cardImageSizes =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px";

// Placeholder projects still carry "#" links — treat those as absent.
function isRealUrl(url?: string): url is string {
  return !!url && url !== "#";
}

// Cover = first desktop-type shot if one exists, otherwise whatever comes first.
function coverImage(images: ProjectImage[]): ProjectImage {
  return images.find((img) => img.type === "desktop") ?? images[0];
}

// ============ Card ============
function ProjectCard({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);
  const [descOpen, setDescOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<ProjectImage | null>(null);

  const images = project.images;
  const cover = useMemo(() => coverImage(images), [images]);
  const showImage = !imgError && !!cover;
  const hasGallery = images.length > 1;
  const shown = activeImage ?? cover;

  return (
    <>
      <article
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card",
          "shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-primary/40",
          "transition-all duration-200 ease-out motion-safe:hover:-translate-y-1",
        )}
      >
        {/* Screenshot area — fixed 16:9, text never enters this zone */}
        <button
          type="button"
          onClick={() => {
            setActiveImage(cover);
            setGalleryOpen(true);
          }}
          aria-label={`View ${project.title} screenshots`}
          className="relative aspect-video w-full shrink-0 overflow-hidden bg-muted text-left"
        >
          {!showImage ? (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/50 text-muted-foreground">
              <FolderKanban className="h-12 w-12 opacity-50" />
            </div>
          ) : (
            <Image
              src={cover.src}
              alt={`${project.title} ${cover.type} screenshot`}
              fill
              sizes={cardImageSizes}
              className={cn(
                "object-cover object-top transition-transform duration-200 ease-out",
                cover.type === "mobile"
                  ? "motion-safe:group-hover:scale-[1.08]"
                  : "scale-[1.16] motion-safe:group-hover:scale-[1.28]",
              )}
              onError={() => setImgError(true)}
            />
          )}

          {hasGallery && (
            <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-zinc-950/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <ImagesIcon className="h-3.5 w-3.5" />
              {images.length}
            </span>
          )}
        </button>

        {/* Content area — contained below the image */}
        <div className="flex flex-1 flex-col p-5">
          <h3
            title={project.title}
            className="font-display text-lg font-bold tracking-tight text-card-foreground line-clamp-1"
          >
            {project.title}
          </h3>

          {project.description && (
            <Tooltip open={descOpen} onOpenChange={setDescOpen}>
              <TooltipTrigger asChild>
                <p
                  onClick={() => setDescOpen((o) => !o)}
                  className="mt-1.5 cursor-default text-sm leading-relaxed text-muted-foreground line-clamp-2"
                >
                  {project.description}
                </p>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                align="start"
                className="max-w-xs text-xs leading-relaxed"
              >
                {project.description}
              </TooltipContent>
            </Tooltip>
          )}

          {project.tags.length > 0 && (
            <div className="mt-3 flex max-h-7 flex-wrap gap-2 overflow-hidden">
              {project.tags.slice(0, 4).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs font-medium"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {(isRealUrl(project.liveUrl) || isRealUrl(project.githubUrl)) && (
            <div className="mt-auto flex gap-3 pt-4">
              {isRealUrl(project.liveUrl) && (
                <Button size="sm" asChild className="text-xs font-semibold">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Live Demo
                  </a>
                </Button>
              )}
              {isRealUrl(project.githubUrl) && (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-xs font-semibold"
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-1.5 h-3.5 w-3.5" /> Code
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </article>

      {/* Gallery lightbox — grouped Desktop shots first, then Mobile shots */}
      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent className="max-w-3xl gap-4 p-4 sm:p-6">
          <DialogTitle className="pr-6">
            {project.title}
            <span className="ml-2 font-normal text-sm text-muted-foreground">
              {shown.label}
            </span>
          </DialogTitle>

          <div className="relative flex h-[50vh] w-full items-center justify-center overflow-hidden rounded-lg bg-muted sm:h-[60vh]">
            <Image
              key={shown.src}
              src={shown.src}
              alt={`${project.title} ${shown.label}`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain"
            />
          </div>

          {hasGallery && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[
                ...images.filter((img) => img.type === "desktop"),
                ...images.filter((img) => img.type === "mobile"),
              ].map((img) => {
                const isActive = img.src === shown.src;
                return (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    aria-label={img.label}
                    className={cn(
                      "relative shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                      isActive
                        ? "border-primary"
                        : "border-transparent hover:border-border",
                      img.type === "mobile" ? "h-16 aspect-[9/19.5]" : "h-16 aspect-video",
                    )}
                  >
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      sizes="120px"
                      className="object-cover object-top"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

// ============ Section ============
export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const prefersReducedMotion = useReducedMotion();

  const filtered = projectsData.filter((p: Project) =>
    activeCategory === "All" ? true : p.category === activeCategory,
  );

  return (
    <Section id="projects" className="bg-muted/30">
      <Container size="lg">
        <FadeIn>
          <div className="flex items-center gap-3 mb-2">
            <FolderKanban className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              My portfolio
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Featured Projects
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            A selection of projects that showcase my skills in design,
            development, and problem-solving.
          </p>
        </FadeIn>

        {/* Category filter */}
        <FadeIn delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-fast",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-accent",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Card grid */}
        {filtered.length > 0 ? (
          <FadeIn>
            <TooltipProvider delayDuration={150}>
              <div className="mt-12 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout" initial={false}>
                  {filtered.map((project) => (
                    <motion.div
                      key={project.id}
                      layout={!prefersReducedMotion}
                      initial={{
                        opacity: 0,
                        scale: prefersReducedMotion ? 1 : 0.92,
                      }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: prefersReducedMotion ? 1 : 0.92,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="h-full"
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </TooltipProvider>
          </FadeIn>
        ) : (
          <div className="mt-12 text-center py-16">
            <p className="text-muted-foreground text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
