import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles, getSettings } from "@/lib/sanity";
import { Breadcrumb } from "@/components/Sections";
export const metadata:Metadata={title:"Insights｜觀點與知識",description:"畫策分享品牌策略、內容、成效行銷及 AI 數位應用觀點。",alternates:{canonical:"/insights"}};
export default async function InsightsPage(){const settings=await getSettings();if(!settings.insightsEnabled)notFound();const articles=await getArticles();return <><Breadcrumb items={[{label:"Home",href:"/"},{label:"Insights",href:"/insights"}]}/><section className="shell page-hero"><p className="eyebrow">Insights / Knowledge</p><h1 className="display" style={{marginTop:32}}>觀點，讓下一步<br/>更清楚。</h1></section><section className="shell content-section rule">{articles.length?articles.map((article)=><Link className="article-row" href={`/insights/${article.slug}`} key={article.slug}><span className="eyebrow">{article.category||"畫策觀點"}　·　{article.publishedAt}</span><span><strong style={{fontSize:"1.4rem",fontWeight:500}}>{article.title}</strong><span className="body-copy" style={{display:"block"}}>{article.excerpt}</span></span><span>↗</span></Link>):<p className="body-copy">文章內容準備中。</p>}</section></>}
