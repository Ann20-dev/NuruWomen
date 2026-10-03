import { useSeoMeta } from "@unhead/react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { NotFoundArt } from "@/components/nuru/art/NotFoundArt";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useSeoMeta({
    title: "Page not found — NuruWomen",
    description: "The page you are looking for could not be found. Return home or browse community health questions.",
  });

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center space-y-6 max-w-md">
        <NotFoundArt className="mx-auto w-64" />
        <div className="space-y-2">
          <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
            This page wandered off
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            The link may be old or mistyped. Let’s get you back to safer ground.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild className="rounded-full">
            <Link to="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/questions">Browse questions</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
