"use client";
import { useState } from "react";
import Script from "next/script";
import { z } from "zod";
import { track } from "./Analytics";
const needs = ["行銷策略", "社群及內容", "攝影／影音", "數位廣告", "AI／數位應用", "顧問／教育訓練", "其他"];
const clientSchema = z.object({ name: z.string().trim().min(1, "請填寫姓名").max(100), email: z.string().trim().email("請填寫正確 Email").max(254), phoneOrLine: z.string().trim().min(1, "請提供電話或 LINE 聯絡方式").max(100) });
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string[]>([]);
  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setValues((old) => ({ ...old, [e.target.name]: e.target.value }));
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setMessage(""); const form = e.currentTarget;
    const valid = clientSchema.safeParse(values);
    if (!valid.success) { setStatus("error"); setMessage(valid.error.issues[0]?.message || "請檢查必填欄位。"); return; }
    if (!(form.elements.namedItem("consent") as HTMLInputElement).checked) { setStatus("error"); setMessage("請閱讀並同意個資告知。"); return; }
    setStatus("sending");
    const data = { ...values, needs: selected, consent: true, turnstileToken: (form.elements.namedItem("cf-turnstile-response") as HTMLInputElement | null)?.value || "", website: (form.elements.namedItem("website") as HTMLInputElement).value };
    try { const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); const result = await res.json(); if (!res.ok) throw new Error(result.message || "送出失敗，請稍後再試。"); setStatus("success"); setMessage("已收到您的合作詢問，我們將儘快與您聯繫。"); setValues({}); setSelected([]); form.reset(); track("contact_form_submit"); }
    catch (err) { setStatus("error"); setMessage(err instanceof Error ? err.message : "送出失敗，內容仍保留在表單中，請稍後重試。"); }
  }
  return <form onSubmit={submit}><div className="form-grid">
    <div className="field"><label htmlFor="name">姓名 <span aria-hidden="true">*</span></label><input id="name" name="name" required autoComplete="name" value={values.name || ""} onChange={update}/></div>
    <div className="field"><label htmlFor="company">公司／品牌名稱</label><input id="company" name="company" autoComplete="organization" value={values.company || ""} onChange={update}/></div>
    <div className="field"><label htmlFor="email">電子郵件 <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" required autoComplete="email" value={values.email || ""} onChange={update}/></div>
    <div className="field"><label htmlFor="phoneOrLine">電話或 LINE（至少提供一種）</label><input id="phoneOrLine" name="phoneOrLine" value={values.phoneOrLine || ""} onChange={update}/></div>
    <fieldset className="field full" style={{border:0,padding:0,margin:0}}><legend className="legend">需求類型（可複選）</legend><div className="checks">{needs.map((need) => <label key={need}><input type="checkbox" checked={selected.includes(need)} onChange={(e) => setSelected(e.target.checked ? [...selected, need] : selected.filter((x) => x !== need))}/>{need}</label>)}</div></fieldset>
    <div className="field"><label htmlFor="budget">預算範圍（選填）</label><select id="budget" name="budget" value={values.budget || ""} onChange={update}><option value="">請選擇</option><option>尚未確定</option><option>NT$ 5 萬以下</option><option>NT$ 5–15 萬</option><option>NT$ 15–30 萬</option><option>NT$ 30 萬以上</option></select></div>
    <div className="field"><label htmlFor="startTime">預計開始時間（選填）</label><select id="startTime" name="startTime" value={values.startTime || ""} onChange={update}><option value="">請選擇</option><option>立即／一個月內</option><option>一至三個月</option><option>三個月後</option><option>尚未確定</option></select></div>
    <div className="field full"><label htmlFor="message">需求說明</label><textarea id="message" name="message" value={values.message || ""} onChange={update}/></div>
    <div aria-hidden="true" style={{position:"absolute",left:"-10000px"}}><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
    <div className="field full"><label className="consent"><input type="checkbox" name="consent" required/><span>我已閱讀並同意畫策為回覆本次詢問而蒐集及使用上述資料。資料將用於聯絡及需求評估；如需查詢或要求刪除，請透過正式聯絡管道提出。<span aria-hidden="true">*</span></span></label></div>
    <div className="field full">{process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} data-theme="light"/>}</div>
    <div className="field full"><button className="button button-fill" type="submit" disabled={status === "sending"}>{status === "sending" ? "送出中…" : "送出詢問　↗"}</button>{status !== "idle" && <p className={`form-alert ${status === "error" ? "error" : ""}`} role="status">{message}</p>}</div>
  </div>{process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive"/>}</form>;
}
