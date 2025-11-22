"use client";

import React, { useState } from "react";
import { ModuleError, ComponentError } from "@/components/error-boundary";

const BuggyComponent = ({ label = "Trigger Error" }) => {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error(`Test Error: ${label}`);
  }

  return <button onClick={() => setShouldError(true)}>{label}</button>;
};

export default function TestErrorPage() {
  const [globalError, setGlobalError] = useState(false);

  if (globalError) {
    throw new Error("Global Test Error");
  }

  return (
    <div className="container mx-auto space-y-12 p-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Error Boundary Tests</h1>
        <p className="text-neutral-400">
          Use this page to verify the behavior of different error boundary
          variants.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          1. Component Error (Inline)
        </h2>
        <p className="text-sm text-neutral-500">
          Used for small UI elements. Should show a minimal inline error
          message.
        </p>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6">
          <ComponentError message="Inline component failed">
            <BuggyComponent label="Trigger Component Error" />
          </ComponentError>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          2. Module Error (Card)
        </h2>
        <p className="text-sm text-neutral-500">
          Used for major features or widgets. Should show a card-style error
          with "Retry" option.
        </p>
        <div className="h-[400px] rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 relative">
          <ModuleError name="Test Module">
            <div className="flex h-full w-full items-center justify-center flex-col gap-4">
              <div className="text-neutral-400">Module Content Area</div>
              <BuggyComponent label="Trigger Module Error" />
            </div>
          </ModuleError>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          3. Global Error (Full Screen)
        </h2>
        <p className="text-sm text-neutral-500">
          Wraps the entire application. Should show a full-screen "System
          Failure" overlay.
        </p>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6">
          <div className="flex items-center justify-between">
            <p className="text-neutral-400">
              This will crash the entire page. You will need to use the "Retry
              System" button in the error UI to recover.
            </p>
            <button
              onClick={() => setGlobalError(true)}
              className="rounded bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700 transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
            >
              Trigger Global Error
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
