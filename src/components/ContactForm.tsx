"use client";
import { useState } from "react";
import Script from "next/script";
import { z } from "zod";
import { track } from "./Analytics";
const needs = ["行銷策略", "社群及內容", "攝影／影音", "數位廣告", "AI／數位應用", "顧問／教育訓練", "其他"];
const clientSchema = z.object({ name: z.string({ required_error: "請填寫姓名", invalid_type_error: "請填寫姓名" }).trim().min(1, "請填寫姓名").max(100, "姓名不可超過 100 字"), email: z.string({ required_error: "請填寫電子郵件", invalid_type_error: "請填寫電子郵件" }).trim().min(1, "請填寫電子郵件").email("請填寫正確的電子郵件格式").max(254, "電子郵件不可超過 254 字"), phoneOrLine: z.string({ required_error: "請提供電話或 LINE 聯絡方式", invalid_type_error: "請提供電話或 LINE 聯絡方式" }).trim().min(1, "請提供電話或 LINE 聯絡方式").max(100, "電話或 LINE 不可超過 100 字") });
type FieldErrors = Partial<Record<"name" | "email" | "phoneOrLine" | "consent", string>>;
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [values, setValues] = useState<Record<string, string>>({name:"",company:"",email:"",phoneOrLine:"",budget:"",startTime:"",message:""});
  const [selected, setSelected] = useState<string[]>([]);
  const [optionalOpen, setOptionalOpen] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((old) => ({ ...old, [name]: value }));
    if (name === "name" || name === "email" || name === "phoneOrLine") setErrors((old) => ({ ...old, [name]: undefined }));
  };
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setMessage(""); const form = e.currentTarget;
    const parsed = clientSchema.safeParse(values);
    const fieldErrors: FieldErrors = {};
    if (!parsed.success) for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof FieldErrors;
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    if (!(form.elements.namedItem("consent") as HTMLInputElement).checked) fieldErrors.consent = "請閱讀並同意個資告知。";
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors); setStatus("error");
      setMessage(`請修正以下欄位：${Object.entries(fieldErrors).map(([field, error]) => `${field === "name" ? "姓名" : field === "email" ? "電子郵件" : field === "phoneOrLine" ? "電話或 LINE" : "個資告知"}：${error}`).join("；")}`);
      return;
    }
    setErrors({}); setStatus("sending");
    const data = { ...values, needs: selected, consent: true, turnstileToken: (form.elements.namedItem("cf-turnstile-response") as HTMLInputElement | null)?.value || "", website: (form.elements.namedItem("website") as HTMLInputElement).value };
    try { const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); const result = await res.json(); if (!res.ok) throw new Error(result.message || "送出失敗，請稍後再試。"); setStatus("success"); setMessage("已收到您的合作詢問，我們將儘快與您聯繫。"); setValues({}); setSelected([]); form.reset(); track("contact_form_submit"); }
    catch (err) { setStatus("error"); setMessage(err instanceof Error ? err.message : "送出失敗，內容仍保留在表單中，請稍後重試。"); }
  }
  return <form onSubmit={submit} noValidate><div className="form-grid">
    <div className="form-head"><span className="mono-label">Inquiry form</span><span className="mono-label">* 必填</span></div>
    <div className="field"><label htmlFor="name">姓名 <span className="req" aria-hidden="true">*</span></label><input id="name" name="name" placeholder="王小明" autoComplete="name" value={values.name ?? ""} onChange={update} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined}/>{errors.name&&<p className="field-error" id="name-error">{errors.name}</p>}</div>
    <button className="mobile-optional-toggle only-m" type="button" aria-expanded={optionalOpen} onClick={() => setOptionalOpen((open) => !open)}>{optionalOpen ? "− 收合選填欄位" : "＋ 補充公司名稱、預算與時程（選填）"}</button>
    <div className={`field optional-field ${optionalOpen ? "is-open" : ""}`}><label htmlFor="company">公司／品牌名稱</label><input id="company" name="company" placeholder="公司或品牌名稱" autoComplete="organization" value={values.company ?? ""} onChange={update}/></div>
    <div className="field"><label htmlFor="email">電子郵件 <span className="req" aria-hidden="true">*</span></label><input id="email" name="email" type="email" placeholder="name@company.com" autoComplete="email" value={values.email ?? ""} onChange={update} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined}/>{errors.email&&<p className="field-error" id="email-error">{errors.email}</p>}</div>
    <div className="field"><label htmlFor="phoneOrLine">電話或 LINE <span className="req" aria-hidden="true">*</span></label><input id="phoneOrLine" name="phoneOrLine" placeholder="至少提供一種聯絡方式" value={values.phoneOrLine ?? ""} onChange={update} aria-invalid={Boolean(errors.phoneOrLine)} aria-describedby={errors.phoneOrLine ? "phoneOrLine-error" : undefined}/>{errors.phoneOrLine&&<p className="field-error" id="phoneOrLine-error">{errors.phoneOrLine}</p>}</div>
    <fieldset className="field full" style={{border:0,padding:0,margin:0}}><legend className="legend">需求類型 <span className="opt">（可複選）</span></legend><div className="toggles">{needs.map((need) => <button className={`toggle ${selected.includes(need)?"on":""}`} type="button" key={need} aria-pressed={selected.includes(need)} onClick={() => setSelected(selected.includes(need) ? selected.filter((x) => x !== need) : [...selected, need])}><i aria-hidden="true"/>{need}</button>)}</div></fieldset>
    <div className={`field optional-field ${optionalOpen ? "is-open" : ""}`}><label htmlFor="budget">預算範圍（選填）</label><select id="budget" name="budget" value={values.budget || ""} onChange={update}><option value="">請選擇</option><option>尚未確定</option><option>NT$ 5 萬以下</option><option>NT$ 5–15 萬</option><option>NT$ 15–30 萬</option><option>NT$ 30 萬以上</option></select></div>
    <div className={`field optional-field ${optionalOpen ? "is-open" : ""}`}><label htmlFor="startTime">預計開始時間（選填）</label><select id="startTime" name="startTime" value={values.startTime || ""} onChange={update}><option value="">請選擇</option><option>立即／一個月內</option><option>一至三個月</option><option>三個月後</option><option>尚未確定</option></select></div>
    <div className="field full"><label htmlFor="message">需求說明</label><textarea id="message" name="message" placeholder="簡單描述目前狀況、想解決的問題或期待的合作方式" value={values.message ?? ""} onChange={update}/></div>
    <div aria-hidden="true" style={{position:"absolute",left:"-10000px"}}><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
    <div className="field full"><details className="privacy-notice"><summary><span>個人資料蒐集告知事項</span><span className="privacy-notice-cue" aria-hidden="true"><span className="privacy-notice-cue-closed">點擊展開</span><span className="privacy-notice-cue-open">點擊收合</span><i/></span></summary><div className="privacy-notice-content"><p><strong>蒐集者：</strong>畫策管理顧問有限公司（品牌名稱：畫策整合行銷）。如對個人資料有任何疑問或欲行使相關權利，請寄信至 chunk.huace@gmail.com。</p><p><strong>蒐集目的：</strong>處理及回覆您的合作詢問、了解需求、聯繫洽談與評估合作方式，以及維護網站安全、防止垃圾或不當提交。</p><p><strong>蒐集資料類別：</strong>您在表單提供的姓名、公司或品牌名稱、電子郵件、電話或 LINE 聯絡方式、需求類型、預算範圍、預計開始時間及需求說明；網站安全驗證服務為防止濫用所需處理的技術資料。</p><p><strong>利用期間、地區、對象及方式：</strong>資料於完成本次詢問及後續必要聯繫所需期間內保存，最長為 2 年；依法令或處理爭議另有保存必要者，保存至該必要性消失。資料可能於台灣及 Cloudflare、Google 提供網站代管、安全驗證與表單處理服務所使用的地區處理；利用對象為畫策負責洽詢的人員，以及前述受託服務供應商，僅在提供服務所需範圍內使用。資料以電子方式蒐集、傳輸及保存。</p><p><strong>您可行使的權利：</strong>您可以依法請求查詢、閱覽、取得複製本、補充或更正、停止蒐集／處理／利用或刪除個人資料。請寄信至 chunk.huace@gmail.com，並說明您的請求及相關聯絡資料，以便確認身分和處理。</p><p><strong>不提供資料的影響：</strong>姓名與電子郵件為必填資料；未提供時，您將無法送出表單或收到回覆。其他欄位可自由選填；未提供不會影響您聯絡我們，但可能使我們較難評估您的需求。</p></div></details><label className="consent"><input type="checkbox" name="consent" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined}/><span>我已閱讀並了解以上個人資料蒐集告知事項。<span aria-hidden="true">*</span></span></label>{errors.consent&&<p className="field-error" id="consent-error">{errors.consent}</p>}</div>
    <div className="field full">{process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} data-theme="light"/>}</div>
    <div className="field full"><div className="submit-row"><span className="hint">資料僅用於回覆本次詢問及評估需求。</span><button className="button button-fill button-lg" type="submit" disabled={status === "sending"}>{status === "sending" ? "送出中…" : <>送出詢問 <span aria-hidden="true">→</span></>}</button></div>{status !== "idle" && <p className={`form-alert ${status === "error" ? "error" : ""}`} role={status === "error" ? "alert" : "status"}>{message}</p>}</div>
  </div>{process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive"/>}</form>;
}
