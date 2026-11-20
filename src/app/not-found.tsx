import Link from "next/link";
export default function NotFound(){return <section className="shell page-hero"><p className="eyebrow">404 / Page not found</p><h1 className="display" style={{marginTop:32}}>這個頁面<br/>目前不存在。</h1><p className="body-copy" style={{marginTop:28}}>您可以回到首頁，或前往服務頁面了解畫策整合行銷的合作方式。</p><Link className="button" href="/">回到首頁　↗</Link></section>}
