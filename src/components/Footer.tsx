import { Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="w-full py-6 mt-20 border-t border-border/10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © 2024 Syfex Studio. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Github className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Twitter className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Linkedin className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
};