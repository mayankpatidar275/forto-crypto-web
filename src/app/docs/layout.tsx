import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { RootProvider } from "fumadocs-ui/provider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootProvider search={{ enabled: false }}>
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
    </RootProvider>
  );
}
