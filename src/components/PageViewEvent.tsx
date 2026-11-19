"use client";
import { useEffect } from "react";
import { track } from "./Analytics";
export default function PageViewEvent({ event, params }: { event: string; params: Record<string,string> }) { useEffect(() => { track(event, params); }, [event, params]); return null; }
