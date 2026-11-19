"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return <main><h1>Sanity Studio 尚未設定</h1><p>請在環境變數設定 NEXT_PUBLIC_SANITY_PROJECT_ID，重新啟動網站後即可使用內容管理介面。</p></main>;
  }
  return <NextStudio config={config} />;
}
