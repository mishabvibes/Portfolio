import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn, scrollTo } from "@/lib/utils";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Preloader from "@/components/Preloader";
import styles from "@/styles/Container.module.css";

/* ─── Constants ─────────────────────────────────────────────────────── */
const SITE_URL = "https://mishab-dev.vercel.app";
const SITE_NAME = "Mishab | Full-Stack Web Developer — Kerala, India";

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammed Mishab Faizy",
  alternateName: "Mishab",
  url: SITE_URL,
  image: `${SITE_URL}/web-app-manifest-512x512.png`,
  jobTitle: "Senior Full-Stack Web Developer",
  worksFor: {
    "@type": "Organization",
    name: "DigiBayt",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Inmakes Infotech Pvt Ltd",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kerala",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/mishabvibes",
    "https://www.linkedin.com/in/mishab-nk",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "React Native",
    "TypeScript",
    "Full-Stack Development",
    "Mobile App Development",
  ],
  email: "md.mishab124@gmail.com",
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mishab — Full-Stack Developer Portfolio",
  url: SITE_URL,
  description:
    "Portfolio of Muhammed Mishab Faizy — Senior Full-Stack Web & Mobile Developer based in Kerala, India. Specialising in React, Next.js, Node.js, and Python.",
  author: {
    "@type": "Person",
    name: "Muhammed Mishab Faizy",
  },
};

/* ─── Types ─────────────────────────────────────────────────────────── */
type IconProps = {
  ["data-hide"]: boolean;
};

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

type NavProps = {
  text: string;
  href: string;
  i: number;
  className?: string;
};

/* ─── Nav ────────────────────────────────────────────────────────────── */
const variants = {
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.12 },
  }),
  hidden: { opacity: 0 },
};

const navLinks = [
  { href: "#home", text: "Home" },
  { href: "#about", text: "About" },
  { href: "#projects", text: "Projects" },
  { href: "#services", text: "Services" },
  { href: "#contact", text: "Contact" },
];

function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  const href = e.currentTarget.getAttribute("href");
  if (href && href.startsWith("#")) {
    e.preventDefault();
    const section = document.querySelector(href);
    scrollTo(section);
  }
}

function NavItem(props: NavProps) {
  return (
    <motion.li
      className={props.className}
      variants={variants}
      custom={props.i}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <a
        href={props.href}
        onClick={handleClick}
        className={cn(props.i === 0 && "nav-active", "nav-link")}
        aria-label={`Navigate to ${props.text} section`}
      >
        {props.text}
      </a>
    </motion.li>
  );
}

/* ─── Container ─────────────────────────────────────────────────────── */
export default function Container(props: ContainerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { children, ...customMeta } = props;
  const router = useRouter();

  const meta = {
    title: SITE_NAME,
    description:
      "Muhammed Mishab Faizy is a Senior Full-Stack Web & Mobile Developer based in Kerala, India. Specialising in React, Next.js, Node.js, Python, and React Native — delivering fast, scalable, and user-focused digital products.",
    image: `${SITE_URL}/web-app-manifest-512x512.png`,
    type: "website",
    ...customMeta,
  };

  // Scroll handler for nav style
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Preloader — capped at 1 s to avoid blocking content on slow connections
  useEffect(() => {
    const t = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  const canonicalUrl = `${SITE_URL}${router.asPath === "/" ? "" : router.asPath}`;

  return (
    <>
      <Head>
        {/* ── Primary ── */}
        <title>{meta.title}</title>
        <meta name="google-site-verification" content="FfzVsyaS2M5ojeVmNI3qwKlkP6yqjM7mHMN9lL-_twA" />
        <meta name="description" content={meta.description} />
        <meta
          name="keywords"
          content="Full-Stack Developer, Web Developer Kerala, React Developer India, Next.js Developer, Node.js Developer, Python Developer, React Native, Mobile App Developer, Mishab, Muhammed Mishab Faizy, DigiBayt"
        />
        <meta name="author" content="Muhammed Mishab Faizy" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="theme-color" content="#7B82FE" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* ── Canonical ── */}
        <link rel="canonical" href={canonicalUrl} />

        {/* ── Open Graph ── */}
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Mishab Dev" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="Mishab — Full-Stack Developer" />
        <meta property="og:locale" content="en_IN" />

        {/* ── Twitter / X Card ── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="twitter:image:alt" content="Mishab — Full-Stack Developer" />

        {/* ── Resource hints — speeds up font + site asset fetching ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://mishab-dev.vercel.app" />

        {/* ── Icons & Manifest ── */}
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* ── Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
      </Head>

      {/* ── Navigation ── */}
      <header role="banner">
        <nav
          aria-label="Main navigation"
          className={cn(
            styles.nav,
            isScrolled
              ? "bg-gradient-to-br from-background to-transparent shadow-md backdrop-blur transition"
              : "bg-transparent",
          )}
        >
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                styles.burger,
                "inline-flex transform items-center justify-center rounded-md p-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              )}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <MenuIcon data-hide={isOpen} />
              <CrossIcon data-hide={!isOpen} />
            </button>
          </div>

          <Link href="/" aria-label="Mishab — Home">
            <span className="text-lg font-semibold">Mishab</span>
          </Link>

          {/* Desktop nav */}
          <ul className={styles["desktop-nav"]} role="list">
            {navLinks.map((link, i) => (
              <NavItem
                key={link.href}
                href={link.href}
                text={link.text}
                i={i}
                className="text-base"
              />
            ))}
          </ul>

          {/* Mobile nav */}
          <AnimatePresence key="menu">
            {isOpen && (
              <motion.div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                className="fixed right-0 top-0 z-40 flex h-screen w-full flex-col justify-start overflow-y-hidden bg-background"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 1, type: "spring", bounce: 0.25 }}
              >
                <div className="flex h-20 max-h-20 min-h-[60px] w-full items-center justify-between border-b pl-[22px] pr-1">
                  <span className="text-base font-medium lowercase">Menu</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={styles.burger}
                    aria-label="Close navigation menu"
                  >
                    <span className="sr-only">Close main menu</span>
                    <CrossIcon data-hide={!isOpen} />
                  </button>
                </div>
                <div className="flex h-full flex-col items-start justify-between overflow-y-auto">
                  <ul
                    className="flex min-h-fit w-full flex-col items-start space-y-6 px-[22px] py-[58px]"
                    role="list"
                  >
                    {navLinks.map((link, i) => (
                      <button key={link.href} onClick={() => setIsOpen(false)}>
                        <NavItem
                          href={link.href}
                          text={link.text}
                          i={i}
                          className="text-xl"
                        />
                      </button>
                    ))}
                  </ul>
                  <div className="flex min-h-fit w-full flex-col space-y-8 px-[22px] py-10">
                    <span className="text-sm text-muted-foreground">
                      © {new Date().getFullYear()} Mishab. All rights reserved.
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <style jsx global>{`
            html,
            body {
              overflow-y: ${isOpen ? "hidden" : "initial"};
              scrollbar-width: ${isOpen ? "none" : "unset"};
              -ms-overflow-style: ${isOpen ? "none" : "unset"};
              touch-action: ${isOpen ? "none" : "unset"};
              -ms-touch-action: ${isOpen ? "none" : "unset"};
            }
          `}</style>
        </nav>
      </header>

      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* Main content */}
      <main id="main-content" className={cn("container", props.className)}>
        {children}
      </main>

      <Footer />
    </>
  );
}

/* ─── Icons ─────────────────────────────────────────────────────────── */
function MenuIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute h-5 w-5 text-neutral-100"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path d="M2.5 2.5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 7.5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 12.5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon(props: IconProps) {
  return (
    <svg
      className="absolute h-5 w-5 text-neutral-100"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
