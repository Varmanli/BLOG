"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import LetterGlitch from "./LetterGlitch";
import Prism from "./Prism";

export default function HeroTyping({
  lines = [
    "// NexPad → دنیای کد در بُعد آینده",
    "// آموزش الگوریتم‌ها به زبان ساده و خفن",
    "const stack = ['JavaScript', 'TypeScript', 'React'];",
    "for (let skill of stack) learn(skill);",
    "function dream() { return 'Code. Create. Conquer.' }",
  ],
  typeSpeed = 40,
  pauseBetweenLines = 900,
  loop = true,
}) {
  const [display, setDisplay] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!mountedRef.current) return;
    let timeoutId;
    const currentLine = lines[lineIndex] ?? "";

    if (isTyping) {
      if (charIndex <= currentLine.length) {
        timeoutId = setTimeout(() => {
          if (!mountedRef.current) return;
          setDisplay(currentLine.slice(0, charIndex));
          setCharIndex((c) => c + 1);
        }, typeSpeed);
      } else {
        timeoutId = setTimeout(() => {
          if (!mountedRef.current) return;
          setIsTyping(false);
        }, pauseBetweenLines);
      }
    } else {
      timeoutId = setTimeout(() => {
        if (!mountedRef.current) return;
        const nextIndex = lineIndex + 1;
        if (nextIndex >= lines.length) {
          if (loop) {
            setLineIndex(0);
            setCharIndex(0);
            setIsTyping(true);
          }
        } else {
          setLineIndex(nextIndex);
          setCharIndex(0);
          setIsTyping(true);
        }
      }, 300);
    }

    return () => clearTimeout(timeoutId);
  }, [
    charIndex,
    isTyping,
    lineIndex,
    lines,
    typeSpeed,
    pauseBetweenLines,
    loop,
  ]);

  return (
    <section
      className="relative w-full min-h-[100vh] flex items-center justify-center py-16 px-6 overflow-hidden mt-[-80px]"
      dir="rtl"
    >
      <div className="absolute inset-0">
        <Prism
          animationType="rotate"
          timeScale={0.2}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0.1}
          glow={1}
        />
      </div>
      <div className="max-w-4xl w-full text-center text-white relative z-10">
        <h1 className="text-3xl md:text-6xl font-mono font-bold leading-tight text-green-700 drop-shadow-[0_0_12px_rgba(34,197,94,0.8)] dark:text-green-400">
          $ welcome_to NexPad
        </h1>
        <p className="text-base md:text-xl font-mono text-green-800/90 mt-4 dark:text-green-300/80">
          [system] → پلتفرم آموزشی برای توسعه‌دهنده‌های آینده
        </p>

        <div className="mt-8 rounded-xl p-6 bg-black/60 border border-fuchsia-500/20 backdrop-blur-md shadow-2xl font-mono text-left max-w-2xl mx-auto">
          <pre
            className="m-0 whitespace-pre-wrap text-[14px] md:text-[15px] leading-snug"
            dir="ltr"
            aria-live="polite"
          >
            <code>
              <span className="text-green-300">{display}</span>
              <span className="inline-block w-[10px] align-middle ml-1">
                <span
                  className="blinking-caret inline-block h-5"
                  aria-hidden="true"
                >
                  &nbsp;
                </span>
              </span>
            </code>
          </pre>
        </div>
        {/* <Link href={"#blog"}>
          <button
            className="
    relative mt-10 px-6 py-3
    text-sm md:text-base font-bold font-mono
    rounded-xl shadow-lg transition-all duration-300
    bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500
    text-white dark:from-emerald-500 dark:via-teal-500 dark:to-cyan-400
    hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,200,0.7)]
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-400
    dark:focus:ring-emerald-400
  "
          >
            <span className="relative z-10">مشاهده مقالات</span>
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/30 to-cyan-400/30 blur-xl opacity-60 -z-10" />
          </button>
        </Link> */}
      </div>
    </section>
  );
}
