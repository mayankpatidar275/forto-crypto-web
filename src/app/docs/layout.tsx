import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="docs">
      <DocsLayout
        themeSwitch={{ enabled: false }}
        searchToggle={{ enabled: false }}
        nav={{ enabled: false }}
        tree={source.pageTree}
        {...baseOptions}
      >
        {children}
      </DocsLayout>
    </div>
  );
}
