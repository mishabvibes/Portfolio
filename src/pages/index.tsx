import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Frame,
  SearchCheck,
  MonitorSmartphone,
  Smartphone,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  ExternalLink,
  CheckCircle2,
  Database,
  Server,
  Layout,
  UsersRound,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";

const aboutStats = [
  { label: "Years of experience", value: "3+" },
  { label: "Technologies mastered", value: "10+" },
  { label: "Projects delivered", value: "20+" },
];

const techStack = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "Django", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "React Native", category: "Mobile" },
  { name: "Expo", category: "Mobile" },
  { name: "Docker", category: "DevOps" },
];

const experience = [
  {
    role: "Freelance Full-Stack Developer",
    company: "DigiBayt",
    period: "2023 – Present",
    desc: "Designed and developed full-stack web & mobile applications for clients across various industries. Delivered 20+ projects including e-commerce platforms, portals, and content apps.",
    icon: Briefcase,
  },
  {
    role: "Python Full Stack Developer Trainee",
    company: "Inmakes Infotech Pvt Ltd",
    period: "2022 – 2023",
    desc: "Intensive hands-on training in Python full-stack development covering Django, REST APIs, databases, and deployment workflows.",
    icon: GraduationCap,
  },
  {
    role: "Media Coordinator & Leadership Member",
    company: "Noorul Ulama — Jamia Nooriyya Arabiyya Pattikkad Students Union",
    period: "2024 – 2026",
    desc: "Contributed to institutional media management and coordination within the college students union. Led media initiatives, managed digital communications, and held a leadership role representing the student body.",
    icon: UsersRound,
  },
];

const projects = [
  {
    title: "AIC Amal",
    description: "Full-featured web & mobile platform",
    image: "/assets/aicamal.webm",
    href: "https://aicamal.app",
    badge: "Web + App",
  },
  {
    title: "MIC Online Admission",
    description: "Admission portal & management system",
    image: "/assets/micasas.webm",
    href: "https://admission.miconline.org",
    badge: "Web",
  },
  {
    title: "Al Naseem",
    description: "Mahirul Quran learning platform",
    image: "/assets/alnaseem.webm",
    href: "https://alnaseem.app",
    badge: "Web + App",
  },
  {
    title: "The Open Book Hira",
    description: "Digital reading & content platform",
    image: "/assets/theopenbook.webm",
    href: "https://www.theopenbookhira.com",
    badge: "Web",
  },
  {
    title: "Rahat Ayurvedic",
    description: "Brand website with product showcase",
    image: "/assets/rahathayurvedic.webm",
    href: "https://rahathayurvedic.vercel.app",
    badge: "Web",
  },
];

const services = [
  {
    service: "Frontend Development",
    description:
      "Pixel-perfect, performant UIs using React, Next.js and Tailwind CSS that delight users on every device.",
    icon: Layout,
  },
  {
    service: "Backend & APIs",
    description:
      "Scalable REST and real-time APIs with Node.js, Python/Django backed by SQL and NoSQL databases.",
    icon: Server,
  },
  {
    service: "Mobile Apps",
    description:
      "Cross-platform iOS & Android apps using React Native and Expo — from prototype to store listing.",
    icon: Smartphone,
  },
  {
    service: "Database Design",
    description:
      "Schema design, query optimisation, and migration strategies for PostgreSQL, MongoDB and Supabase.",
    icon: Database,
  },
  {
    service: "Responsive Design",
    description:
      "Mobile-first layouts that look and perform equally well across all screen sizes and devices.",
    icon: MonitorSmartphone,
  },
  {
    service: "SEO Optimisation",
    description:
      "Core Web Vitals, semantic HTML, and meta strategies to increase organic visibility and ranking.",
    icon: SearchCheck,
  },
];

const contactLinks = [
  {
    label: "Email",
    value: "md.mishab124@gmail.com",
    href: "mailto:md.mishab124@gmail.com",
    icon: Mail,
    primary: true,
  },
  {
    label: "WhatsApp",
    value: "+91 62386 61924",
    href: "https://wa.me/916238661924",
    icon: Smartphone,
    primary: false,
  },
  {
    label: "LinkedIn",
    value: "mishab-nk",
    href: "https://www.linkedin.com/in/mishab-nk",
    icon: Linkedin,
    primary: false,
  },
  {
    label: "GitHub",
    value: "mishabvibes",
    href: "https://github.com/mishabvibes",
    icon: Github,
    primary: false,
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");
        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* ── Hero ── */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            {/* Status + location badges */}
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-wrap items-center gap-2"
            >
              <span className="flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                Available for work
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> Kerala, India
              </span>
            </div>

            {/* Name */}
            <div className="mt-6">
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Mishab.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-3 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                Full-Stack Web & Mobile Developer — I build fast, scalable, and
                user-focused digital products using{" "}
                <span className="text-foreground">React</span>,{" "}
                <span className="text-foreground">Node.js</span>, and{" "}
                <span className="text-foreground">Python</span>.
              </p>
            </div>

            {/* Tech pills */}
            <div
              data-scroll
              data-scroll-speed=".06"
              className="mt-4 flex flex-wrap gap-2"
            >
              {["React", "Next.js", "Node.js", "Python", "React Native"].map(
                (t) => (
                  <span key={t} className={styles.pill}>
                    {t}
                  </span>
                ),
              )}
            </div>

            {/* CTAs */}
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="mt-6 flex flex-row items-center space-x-2"
            >
              <Link href="mailto:md.mishab124@gmail.com" passHref>
                <Button className="gap-2">
                  Get in touch <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#projects"))}
              >
                View projects
              </Button>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>

          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 h-full w-full xl:mt-0"
          >
            <Suspense fallback={<span>Loading...</span>}>
              <Spline scene="/assets/scene.splinecode" />
            </Suspense>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-10 flex max-w-6xl flex-col justify-start space-y-16"
          >
            {/* Headline + stats */}
            <div className="space-y-10">
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
                👤 About me
              </span>
              <h2 className="pt-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
                I&apos;m a{" "}
                <span className="text-gradient clash-grotesk font-semibold">
                  Full-Stack Developer
                </span>{" "}
                based in Kerala, India — passionate about building efficient,
                user-focused digital solutions that bridge technology and
                real-world needs.
              </h2>

              <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
                {aboutStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center text-center xl:items-start xl:text-start"
                  >
                    <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                      {stat.value}
                    </span>
                    <span className="tracking-tight text-muted-foreground xl:text-lg">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-foreground backdrop-blur transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience timeline */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                Experience
              </h3>
              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-primary/30 hover:bg-white/8"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <exp.icon size={18} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-foreground">
                          {exp.role}
                        </span>
                        <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {exp.company}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {exp.period}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {exp.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" data-scroll-section>
          {/* gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>

          <div data-scroll data-scroll-speed=".4" className="my-20">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              🚀 Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tighter xl:text-6xl">
              Work I&apos;m proud of.
            </h2>
            <p className="mt-2 max-w-xl text-base tracking-tight text-muted-foreground xl:text-lg">
              A selection of real-world products I&apos;ve shipped — from
              consumer apps on the Play Store to institutional web platforms.
            </p>

            {/* Carousel */}
            <div className="mt-14">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                  {projects.map((project) => (
                    <CarouselItem
                      key={project.title}
                      className="md:basis-1/2 lg:basis-1/2"
                    >
                      <Card id="tilt" className="group overflow-hidden">
                        <CardHeader className="p-0">
                          <Link
                            href={project.href}
                            target="_blank"
                            passHref
                            className="relative block"
                          >
                            {/* video */}
                            <video
                              src={project.image}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="aspect-video h-full w-full rounded-t-md bg-primary object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                            {/* badge overlay */}
                            <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                              {project.badge}
                            </span>
                            {/* visit link icon */}
                            <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs text-white/70 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                              <ExternalLink className="h-3 w-3" /> Visit
                            </span>
                          </Link>
                        </CardHeader>
                        <CardContent className="absolute bottom-0 w-full bg-background/70 backdrop-blur">
                          <CardTitle className="border-t border-white/10 px-4 py-3">
                            <span className="block text-base font-semibold tracking-tight text-foreground">
                              {project.title}
                            </span>
                            <span className="mt-0.5 block text-xs font-normal tracking-tight text-muted-foreground">
                              {project.description}
                            </span>
                          </CardTitle>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="py-3 text-center text-sm text-muted-foreground">
                <span className="font-semibold">{current}</span>
                {" / "}
                <span className="font-semibold">{count}</span> projects
              </div>
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-16 flex flex-col justify-start space-y-10"
          >
            <div className="space-y-3">
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
                🛠 Services
              </span>
              <h2 className="text-4xl font-medium tracking-tight">
                What I can do
                <br />
                <span className="text-gradient clash-grotesk tracking-normal">
                  for you.
                </span>
              </h2>
              <p className="max-w-md tracking-tighter text-muted-foreground">
                End-to-end development across web, mobile, and backend — every
                layer of the stack covered.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, staggerChildren: 0.5 }}
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
              {services.map((service, i) => (
                <motion.div
                  key={service.service}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group flex flex-col items-start rounded-xl border border-white/10 bg-white/5 p-8 shadow-md backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white/10 hover:shadow-primary/5"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary transition-colors group-hover:bg-primary/25">
                    <service.icon size={18} />
                  </div>
                  <span className="text-base font-semibold tracking-tight text-foreground">
                    {service.service}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed tracking-tight text-muted-foreground">
                    {service.description}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" data-scroll-section className="my-20">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/10 via-background to-white/5 px-8 py-16 text-center xl:py-24"
          >
            {/* subtle glow */}
            <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
              <div className="h-[400px] w-[600px] rounded-full bg-primary/10 blur-[120px]" />
            </div>

            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              📬 Contact
            </span>
            <h2 className="mt-3 text-4xl font-medium tracking-tighter xl:text-6xl">
              Let&apos;s work{" "}
              <span className="text-gradient clash-grotesk">together.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;m available for freelance projects and open to discussing
              new opportunities. Drop me a message — I usually reply within 24
              hours.
            </p>

            {/* contact cards grid */}
            <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {contactLinks.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("mailto") ? undefined : "_blank"}
                  passHref
                  className={cn(
                    "group flex flex-col items-center gap-2 rounded-xl border p-5 transition duration-300 hover:-translate-y-0.5",
                    c.primary
                      ? "border-primary/40 bg-primary/15 hover:bg-primary/25"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      c.primary ? "bg-primary/30 text-primary" : "bg-white/10 text-muted-foreground group-hover:text-foreground",
                    )}
                  >
                    <c.icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {c.label}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {c.value}
                  </span>
                </Link>
              ))}
            </div>

            {/* availability note */}
            <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              Currently accepting new freelance projects
            </p>
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
