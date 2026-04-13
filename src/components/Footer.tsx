import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MailIcon, Linkedin, Github, Smartphone } from "lucide-react";

export default function Footer() {
  // get the current time in UTC+1 time zone
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setTime(
        date.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        }),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-gradient-to-t from-primary/[1%] to-transparent">
      <div className="container mx-auto flex flex-row items-center justify-between py-6">
        <span className="flex flex-row items-center space-x-4">
          {/* <p className="text-xs text-muted-foreground">
            Made with ❤️ by{" "}
            <Link
              href="https://github.com/mishabvibes"
              target="_blank"
              passHref
              className="text-foreground transition hover:text-primary"
            >
              Mishab
            </Link>
          </p> */}

          <span className="flex hidden flex-row items-center space-x-2 md:flex">
            <p className="text-xs text-muted-foreground">Local time:</p>
            <p className="text-sm font-semibold">{time} UTC+5:30</p>
          </span>
                    <hr className="hidden h-6 border-l border-muted md:flex" />
        </span>
        <span className="flex flex-row items-center space-x-2">
          <Link
            href="https://www.linkedin.com/in/mishab-nk"
            target="_blank"
            passHref
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <Button variant="ghost" size="icon">
              <Linkedin className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href="https://github.com/mishabvibes"
            target="_blank"
            passHref
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href="https://wa.me/916238661924"
            target="_blank"
            passHref
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <Button variant="ghost" size="icon">
              <Smartphone className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href="mailto:md.mishab124@gmail.com"
            passHref
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <Button variant={"outline"}>
              <MailIcon className="h-4 w-4 md:mr-2" />
              <span className="hidden md:flex">md.mishab124@gmail.com</span>
            </Button>
          </Link>
        </span>
      </div>
      <div className="h-1 bg-[radial-gradient(closest-side,#8486ff,#42357d,#5d83ff,transparent)] opacity-50" />
    </footer>
  );
}
