/* Fyscal Website — Banking Modernisation page sections.
   Recreation of fyscaltech.com/banking-fyscals using the Fyscal design system.
   Depends on (loaded before this file): SiteIcons.jsx (SIcons, FyscalLogo),
   Nav.jsx (WBtn, Footer). All color/type/spacing tokens from colors_and_type.css. */

const { useState: useBState, useRef: useBRef, useEffect: useBEffect } = React;

/* ── Shared full country list (used by every contact form across the site) ── */
const COUNTRIES = ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czechia","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];
if (typeof window !== 'undefined') window.COUNTRIES = COUNTRIES;

/* ── Local section helpers (squared, max-1200 column) ─────────────────────── */
const BSection = ({ children, bg = 'var(--surface)', pad = '96px 32px', id, style }) => (
  <section id={id} className="sec" style={{ background: bg, padding: pad, ...style }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>{children}</div>
  </section>
);

const BEyebrow = ({ children, light }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', color: light ? 'rgba(255,255,255,.7)' : 'var(--primary)', marginBottom: 18 }}>
    <span style={{ width: 24, height: 2, background: light ? 'rgba(255,255,255,.5)' : 'var(--primary)' }} />{children}
  </div>
);

/* Cross-page links — the two Industry pages in this design set */
const PAGE_LINKS = { 'Banks': 'Banking Modernisation.html', 'Fintech': 'Fintech Solutions.html', 'Who We Are': 'Who We Are.html', 'Blogs': 'Blog.html', 'Catalyst X': 'FT Catalyst X.html', 'VisionCraft': 'VisionCraft.html', 'InnovateEdge': 'InnovateEdge.html', 'RunSync': 'RunSync.html', 'Privacy Policy': 'Privacy Policy.html', 'Terms of Use': 'Terms of Use.html', 'Contact': 'Contact Us.html', 'Contact Us': 'Contact Us.html', 'Biller Management': 'Biller Management.html', 'Consent Orchestration': 'Consent Orchestration.html', 'Wallet Solution': 'Wallet Solution.html' };

/* ════════════════════════════════════════════════════════════════════════
   NAV — Solution / Services / Industries mega-menus + Who We Are / Blogs
   ════════════════════════════════════════════════════════════════════════ */
const BANK_MENUS = [
  { label: 'Solution', promo: { tag: 'Featured', title: 'Lending AI Suite', d: 'Six agentic AI modules orchestrating the full loan lifecycle — from origination to collections.', cta: 'Explore Lending AI', href: 'Lending AI Solution.html', img: 'assets/catalystx/pre-built-modules.svg' }, groups: [
    { cat: 'Lending AI Solutions', items: [
      { t: 'Lending AI Suite', d: 'Agentic AI for the full loan lifecycle', icon: SIcons.bolt, href: 'Lending AI Solution.html' },
    ] },
    { cat: 'Billing & Compliance', items: [
      { t: 'Biller Management', d: 'Unified bill & payment rails', icon: SIcons.globe, href: 'Biller Management.html' },
      { t: 'AML Solution', d: 'Real-time screening & case management', icon: SIcons.lock, href: 'FT AML Solution.html' },
    ] },
    { cat: 'Money Movement', side: 'right', items: [
      { t: 'Digital Banking', d: 'Cloud-native core & channels', icon: SIcons.card, href: 'Digital Banking.html' },
      { t: 'Single Window Banking', d: 'Conversational banking infrastructure', icon: SIcons.mail, href: 'Bank X.html' },
      { t: 'Wallet Solutions', d: 'Stored value, payouts, settlement', icon: SIcons.swap, href: 'Wallet Solution.html' },
    ] },
    { cat: 'Identity & Privacy', side: 'right', items: [
      { t: 'KYC', d: 'Identity verification at scale', icon: SIcons.users, href: 'KYC Solution.html' },
      { t: 'Consent Orchestration', d: 'Privacy & DPDP compliance', icon: SIcons.shield, href: 'Consent Orchestration.html' },
    ] },
  ] },
  { label: 'Services', promo: { tag: 'Framework', title: 'Catalyst X', d: 'Enterprise-grade modular middleware — accelerate transformation 40% faster.', cta: 'Discover Catalyst X', href: 'FT Catalyst X.html', img: 'assets/catalystx/api-backbone.svg' }, menu: [
    { t: 'Catalyst X', d: 'Middleware hub & pre-built connectors', icon: SIcons.api, href: 'FT Catalyst X.html' },
    { t: 'VisionCraft', d: 'Transformation consulting & enablement', icon: SIcons.chart, href: 'VisionCraft.html' },
    { t: 'RunSync', d: 'Managed services, compliance & upgrades', icon: SIcons.refresh, href: 'RunSync.html' },
    { t: 'InnovateEdge', d: 'New product development', icon: SIcons.bolt, href: 'InnovateEdge.html' },
  ] },
  { label: 'Industries', promo: { tag: 'Case study', title: 'Meridian Bank', d: 'Unified a legacy core with a real-time digital layer — live in 5 months.', cta: 'Read the story', href: 'Case Study.html', img: 'assets/digitalbanking/hero.svg' }, menu: [
    { t: 'Banks', d: 'Modernise legacy cores with confidence', icon: SIcons.home, href: PAGE_LINKS['Banks'] },
    { t: 'Fintech', d: 'Scale faster from MVP to unicorn', icon: SIcons.chart, href: PAGE_LINKS['Fintech'] },
  ] },
  { label: 'Insights', promo: { tag: 'New', title: 'The Composable Finance Blueprint', d: 'A practical framework for replacing legacy cores without multi-year risk.', cta: 'Read whitepaper', href: 'Whitepaper.html', img: 'assets/whitepapers/wp-cover-1.svg' }, menu: [
    { t: 'Blogs', d: 'Ideas, guides, and engineering deep-dives', icon: SIcons.doc, href: 'Blog.html' },
    { t: 'Whitepapers', d: 'In-depth research and frameworks', icon: SIcons.doc, href: 'Whitepapers.html' },
    { t: 'Podcast', d: 'Conversations on the future of finance', icon: SIcons.play, href: 'Podcast.html' },
    { t: 'Case Studies', d: 'Real results from real engagements', icon: SIcons.chart, href: 'Case Studies.html' },
  ] },
  { label: 'Company', promo: { tag: 'Careers', title: 'Build the future of finance', d: 'Join the team modernising banking across Southeast Asia and beyond.', cta: 'View open roles', href: '#', img: 'assets/innovateedge/collaborative-co-creation.svg' }, menu: [
    { t: 'Who We Are', d: 'Our mission, values, and story', icon: SIcons.users, href: 'Who We Are.html' },
    { t: 'Careers', d: 'Build the future of finance with us', icon: SIcons.bolt },
    { t: 'Contact Us', d: 'Talk to our team', icon: SIcons.mail, href: 'Contact Us.html' },
    { t: 'Partners', d: 'Our ecosystem and alliances', icon: SIcons.swap, href: 'Partners.html' },
  ] },
];
const BANK_PLAIN = [];

const BCaret = () => (
  <svg className="nav-caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
);

const NavRow = ({ m, i }) => (
  <a href={m.href || '#'} className="nav-link-row" role="menuitem" style={{ transitionDelay: (i * 40) + 'ms' }}>
    <span className="nav-link-ic">{React.createElement(m.icon, { size: 18, stroke: 'var(--primary)' })}</span>
    <span className="nav-link-tx">
      <span className="nav-link-t">{m.t}</span>
      <span className="nav-link-d">{m.d}</span>
    </span>
  </a>
);

const NavGroup = ({ group }) => (
  <div className="nav-cat">
    <span className="nav-cat-h">{group.cat}</span>
    {group.items.map((m, i) => <NavRow key={m.t} m={m} i={i} />)}
  </div>
);

function BankingNav({ onCta }) {
  const [open, setOpen] = useBState(null);
  const [menu, setMenu] = useBState(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
      <div className="nav-row" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', gap: 24 }}>
        <a href="Home.html" style={{ display: 'inline-flex', alignItems: 'center' }} aria-label="FyscalTech home"><FyscalLogo height={20} /></a>
        <nav className="nav-links" style={{ display: 'flex', gap: 6, flex: 1 }}>
          {BANK_MENUS.map(it => (
            <div key={it.label} className={'nav-item' + (open === it.label ? ' open' : '')}
              onMouseEnter={() => setOpen(it.label)} onMouseLeave={() => setOpen(null)}>
              <button className="nav-trigger" onFocus={() => setOpen(it.label)} aria-haspopup="true" aria-expanded={open === it.label}>
                {it.label}<BCaret />
              </button>
              <div className={'nav-panel' + (it.promo ? ' has-promo' : '')} role="menu">
                {it.groups ? (
                  <div className="nav-panel-items nav-sol">
                    <div className="nav-sol-col">
                      {it.groups.filter(g => g.side !== 'right').map(g => <NavGroup key={g.cat} group={g} />)}
                    </div>
                    <div className="nav-sol-col">
                      {it.groups.filter(g => g.side === 'right').map(g => <NavGroup key={g.cat} group={g} />)}
                    </div>
                  </div>
                ) : (
                  <div className="nav-panel-items">
                    {it.menu.map((m, i) => <NavRow key={m.t} m={m} i={i} />)}
                  </div>
                )}
                {it.promo && (
                  <a href={it.promo.href} className="nav-promo">
                    <span className="nav-promo-tag">{it.promo.tag}</span>
                    <span className="nav-promo-art" aria-hidden="true" style={it.promo.img ? { backgroundImage: 'url(' + it.promo.img + ')', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' } : undefined}></span>
                    <span className="nav-promo-title">{it.promo.title}</span>
                    <span className="nav-promo-d">{it.promo.d}</span>
                    <span className="nav-promo-cta">{it.promo.cta} <BCaret /></span>
                  </a>
                )}
              </div>
            </div>
          ))}
          {BANK_PLAIN.map(l => <a key={l} href={PAGE_LINKS[l] || '#'} className="nav-plain">{l}</a>)}
        </nav>
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <WBtn size="sm" onClick={onCta}>Get Started <SIcons.arrowR size={15} /></WBtn>
        </div>
        <button className="nav-burger" onClick={() => setMenu(m => !m)} aria-label="Menu"
          style={{ display: 'none', width: 42, height: 42, placeItems: 'center', border: '1px solid var(--border-input)', background: 'var(--surface)', cursor: 'pointer', marginLeft: 'auto' }}>
          {menu ? <SIcons.x size={20} stroke="var(--fg)" /> : <SIcons.menu size={20} stroke="var(--fg)" />}
        </button>
      </div>
      {menu && (
        <div className="nav-mobile" style={{ borderTop: '1px solid var(--border)', padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 4, background: 'var(--surface)' }}>
          {BANK_MENUS.map(grp => (
            <div key={grp.label} style={{ borderBottom: '1px solid var(--surface-soft)', padding: '12px 4px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--mono-400)', marginBottom: 8 }}>{grp.label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {grp.menu.map(m => (
                  <a key={m.t} href={m.href || '#'} onClick={() => setMenu(false)} style={{ fontSize: 15.5, fontWeight: 500, color: 'var(--fg)', textDecoration: 'none', padding: '8px 8px' }}>{m.t}</a>
                ))}
              </div>
            </div>
          ))}
          <div style={{ marginTop: 12 }}><WBtn full onClick={onCta}>Get Started</WBtn></div>
        </div>
      )}
    </header>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   HERO — animated fluted-glass background + B2B integration glass cards
   ════════════════════════════════════════════════════════════════════════ */
const BANK_GLASS_OPTS = Object.assign({
  colorOne: '#352EFF', colorTwo: '#6B8CFF', bgColor: '#ffffff',
  columns: 9, noise: 0.42, gloss: 0.4, widthVariation: 1.7,
  hover: true, hoverIntensity: 2.0, mode: 'columns'
}, (typeof window !== 'undefined' && window.__HERO_OPTS) || {});

function BankGlassCards() {
  return (
    <div className="glass-stack">
      {/* Core integration card — gradient */}
      <div className="glass-card balance">
        <div className="gc-label">Core integration status</div>
        <div className="gc-amount" style={{ fontSize: 26 }}>4 systems<span style={{ fontSize: 16 }}> unified</span></div>
        <div className="gc-row">
          <span className="gc-chip up">▲ real-time sync</span>
          <span className="gc-sub">bidirectional</span>
        </div>
        <div className="gc-actions">
          {[['API', SIcons.api], ['Adapters', SIcons.swap], ['Events', SIcons.bolt]].map(([l, I], i) => (
            <div key={i} className="gc-act"><I size={16} stroke="#fff" />{l}</div>
          ))}
        </div>
      </div>
      {/* Deployment card */}
      <div className="glass-card txn">
        <div className="gc-txn">
          <div className="gc-ico"><SIcons.bolt size={16} stroke="var(--primary)" /></div>
          <div className="gc-txn-body">
            <div className="gc-txn-name">Release v2.4 deploying</div>
            <div className="gc-txn-meta">CI/CD pipeline · just now</div>
          </div>
          <div className="gc-txn-amt">98%</div>
        </div>
        <div className="gc-progress"><span style={{ width: '98%' }}></span></div>
        <div className="gc-txn-foot">Compliance <strong>DPDP · PCI-DSS · AML</strong> ✓ passed</div>
      </div>
    </div>
  );
}

function BankingHero({ onCta }) {
  const features = [
    ['Seamless integration', SIcons.api],
    ['Rapid deployment', SIcons.bolt],
    ['Continuous compliance', SIcons.shield],
    ['Cloud-native scale', SIcons.globe],
  ];
  const canvasRef = useBRef(null);
  useBEffect(() => {
    let h, t;
    const start = () => { if (window.FlutedGlass && canvasRef.current) { h = window.FlutedGlass.mount(canvasRef.current, BANK_GLASS_OPTS); return true; } return false; };
    if (!start()) { t = setInterval(() => { if (start()) clearInterval(t); }, 60); setTimeout(() => clearInterval(t), 4000); }
    return () => { if (h) h.destroy(); if (t) clearInterval(t); };
  }, []);
  return (
    <section className="herob">
      <div className="hero-bg" aria-hidden="true">
        <canvas ref={canvasRef} className="fluted-glass-canvas"></canvas>
        <div className="hero-scrim"></div>
      </div>
      <BankingNav onCta={onCta} />
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-badge"><span className="dot"></span>Banking Modernisation &amp; Core Integration</div>
          <h1 className="hero-h1">Accelerate Change.<br /><span className="grad">Elevate Banking.</span></h1>
          <p className="hero-sub">Unlock the future of banking with seamless modernisation, digital-first innovation, and compliance built for tomorrow — so your institution adapts faster, launches smarter, and leads.</p>
          <div className="hero-ctas">
            <button className="hbtn light" onClick={onCta}>Book a Strategy Call <SIcons.arrowR size={17} /></button>
            <button className="hbtn ghost" onClick={onCta}>Explore solutions</button>
          </div>
          <div className="hero-feats">
            {features.map(([label, I], i) => (
              <div key={i} className="hfeat"><I size={17} stroke="var(--primary)" />{label}</div>
            ))}
          </div>
        </div>
        <BankGlassCards />
      </div>
    </section>
  );
}

/* ── Logo strip ──────────────────────────────────────────────────────────── */
function BankLogoStrip() {
  const logos = ['CORE BANK', 'NEOBANK', 'PAYRAIL', 'LEDGERX', 'TRUSTPAY', 'OPENFI'];
  return (
    <BSection bg="var(--surface)" pad="46px 32px">
      <div style={{ textAlign: 'center', fontSize: 12.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--mono-300)', marginBottom: 28 }}>Trusted by teams at the world's leading firms</div>
      <div className="ls-marquee">
        <div className="ls-track">
          {[...logos, ...logos].map((l, i) => <span key={i} className="ls-logo">{l}</span>)}
        </div>
      </div>
    </BSection>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   The 4 pillars — shared data used by both the grid and the zig-zag
   ════════════════════════════════════════════════════════════════════════ */
const PILLARS = [
  { icon: SIcons.api, title: 'Seamless Core Integration',
    body: 'Utilise API-driven middleware and secure adapters to unify legacy cores, digital platforms, and partner ecosystems — ensuring real-time, bidirectional data flow.',
    service: 'Catalyst X' },
  { icon: SIcons.bolt, title: 'Rapid Product Deployment',
    body: 'Automate feature rollouts with CI/CD pipelines, modular microservices, and reusable code components for faster, lower-risk releases.',
    service: 'VisionCraft' },
  { icon: SIcons.shield, title: 'Continuous Compliance',
    body: 'Integrate DPDP, PCI-DSS, AML, and regulatory checks directly into development and deployment cycles, enabling automated audit trails and policy enforcement.',
    service: 'RunSync' },
  { icon: SIcons.globe, title: 'Scalable, Resilient Architecture',
    body: 'Leverage cloud-native infrastructure and containerised microservices for elastic scaling, high availability, and robust fault tolerance across banking workloads.',
    service: 'InnovateEdge' },
];

/* Impact — heading + 4-up feature grid (hairline grid like the system Features) */
function ImpactSection() {
  return (
    <BSection bg="var(--surface-soft)">
      <div className="rv-head" style={{ maxWidth: 640, marginBottom: 52 }}>
        <BEyebrow>Why modernise with Fyscal</BEyebrow>
        <h2 className="sec-title" style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1.1, color: 'var(--fg)' }}>Modernisation engineered for impact</h2>
        <p style={{ fontSize: 16.5, color: 'var(--mono-500)', lineHeight: 1.6, marginTop: 16 }}>Unlock seamless integration, rapid launches, built-in compliance, and future-ready scale — so your bank can lead with agility and confidence.</p>
      </div>
      <div className="feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: '1px solid var(--border)', background: 'var(--border)' }}>
        {PILLARS.map((f, i) => {
          const I = f.icon;
          return (
            <div key={i} style={{ background: 'var(--surface)', padding: 30 }}>
              <div style={{ width: 48, height: 48, background: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}><I size={24} /></div>
              <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-.01em', marginBottom: 8, lineHeight: 1.25 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--mono-500)', lineHeight: 1.6 }}>{f.body}</p>
            </div>
          );
        })}
      </div>
    </BSection>
  );
}

/* Zig-zag — alternating rows with tinted icon panel + "Claim Your Edge →" */
function PillarZigZag() {
  return (
    <BSection bg="var(--surface)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {PILLARS.map((p, i) => {
          const I = p.icon;
          const flip = i % 2 === 1;
          const tint = i % 2 === 0 ? 'var(--primary-soft)' : 'var(--bg-tertiary)';
          return (
            <div key={p.title} style={{ border: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }} className="zig-row">
              <div style={{ padding: '44px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14, order: flip ? 2 : 1 }} className="zig-copy">
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--mono-400)' }}>0{i + 1}</div>
                <h3 style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.15, color: 'var(--fg)' }}>{p.title}</h3>
                <p style={{ fontSize: 15.5, color: 'var(--mono-500)', lineHeight: 1.65, maxWidth: 460 }}>{p.body}</p>
                <a href="#" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 14.5, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 4 }}>
                  Claim your edge <SIcons.arrowR size={16} />
                </a>
              </div>
              <div style={{ background: tint, minHeight: 320, order: flip ? 1 : 2, display: 'grid', placeItems: 'center', position: 'relative' }} className="zig-vis">
                <div style={{ width: 110, height: 110, background: 'var(--surface)', boxShadow: 'var(--shadow-sm)', display: 'grid', placeItems: 'center' }}>
                  <I size={48} stroke="var(--primary)" />
                </div>
                <div style={{ position: 'absolute', top: 18, left: 18, fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '.04em', color: 'var(--mono-400)' }}>{p.service.toUpperCase()}</div>
              </div>
            </div>
          );
        })}
      </div>
    </BSection>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PARTNER — "Your Strategic Partner for Growth": copy + CTA / 4 value props
   ════════════════════════════════════════════════════════════════════════ */
function PartnerSection({ onCta }) {
  const props = [
    { t: 'Dedicated Fintech Expertise', d: 'Work side-by-side with proven product leaders, engineers, and compliance experts.', icon: SIcons.users },
    { t: 'Early Access to Innovation', d: 'Test new modules, features, and fintech stacks before they hit the mainstream.', icon: SIcons.bolt },
    { t: 'Growth Enablement', d: 'Tap into frameworks and insights to fuel expansion, partnerships, and new models.', icon: SIcons.chart },
    { t: 'Always-On Support', d: 'Benefit from continuous optimisation, troubleshooting, and market-driven upgrades.', icon: SIcons.refresh },
  ];
  return (
    <BSection bg="var(--ink)" style={{ color: '#fff' }}>
      <div className="split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center' }}>
        <div className="rv-head">
          <BEyebrow light>Your strategic partner</BEyebrow>
          <h2 className="sec-title" style={{ fontSize: 38, fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1.12, marginBottom: 18 }}>Your strategic partner for growth</h2>
          <p style={{ fontSize: 16.5, color: 'rgba(255,255,255,.6)', lineHeight: 1.65, marginBottom: 30 }}>From MVP to unicorn scale, Fyscal partners with fintechs and payment innovators to navigate technical complexity, accelerate time-to-market, and build lasting value through every stage of your journey.</p>
          <WBtn size="lg" variant="light" onClick={onCta}>Book a Strategy Call <SIcons.arrowR size={18} /></WBtn>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid rgba(255,255,255,.14)', background: 'rgba(255,255,255,.14)' }} className="partner-grid">
          {props.map((p, i) => {
            const I = p.icon;
            return (
              <div key={i} style={{ background: 'var(--ink)', padding: 28 }}>
                <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.14)', display: 'grid', placeItems: 'center', marginBottom: 16 }}><I size={22} stroke="#fff" /></div>
                <div style={{ fontSize: 15.5, fontWeight: 700, letterSpacing: '-.01em', marginBottom: 7 }}>{p.t}</div>
                <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.55)', lineHeight: 1.6 }}>{p.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </BSection>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   OUTCOMES — "Outpace. Outshine. Outlast. ↗" — 4 outcome cards
   ════════════════════════════════════════════════════════════════════════ */
function OutcomesSection() {
  const outcomes = [
    { t: 'Accelerated Digital Transformation', d: 'Modernise core systems and launch new products faster — gaining competitive advantage and adapting to market change.', icon: SIcons.bolt },
    { t: 'Enhanced Customer Experience', d: 'Deliver seamless, digital-first journeys that improve satisfaction, retention, and cross-sell opportunities.', icon: SIcons.users },
    { t: 'Regulatory Peace of Mind', d: 'Achieve and maintain compliance (DPDP, PCI-DSS, AML, and more) with automated, audit-ready controls in every workflow.', icon: SIcons.shield },
    { t: 'Scalable Growth Potential', d: 'Expand services, integrate new partners, and handle increasing volume with cloud-native, future-ready architectures.', icon: SIcons.chart },
  ];
  return (
    <BSection bg="var(--surface-soft)">
      <div className="rv-head" style={{ maxWidth: 680, marginBottom: 52 }}>
        <BEyebrow>The outcomes</BEyebrow>
        <h2 className="sec-title" style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1.1, color: 'var(--fg)' }}>
          Outpace. Outshine. Outlast.<span style={{ display: 'inline-flex', verticalAlign: 'middle', marginLeft: 12, color: 'var(--primary)' }}><SIcons.arrowR size={32} sw={2} style={{ transform: 'rotate(-45deg)' }} /></span>
        </h2>
        <p style={{ fontSize: 16.5, color: 'var(--mono-500)', lineHeight: 1.6, marginTop: 16 }}>Achieve faster transformation, deliver stand-out digital experiences, master compliance, and build growth that endures — so your bank always leads, never follows.</p>
      </div>
      <div className="out-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
        {outcomes.map((o, i) => {
          const I = o.icon;
          return (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '34px 32px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ width: 52, height: 52, background: 'var(--primary)', display: 'grid', placeItems: 'center', flexShrink: 0 }}><I size={24} stroke="#fff" /></div>
              <div>
                <h3 style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-.01em', marginBottom: 9, color: 'var(--fg)' }}>{o.t}</h3>
                <p style={{ fontSize: 14.5, color: 'var(--mono-500)', lineHeight: 1.6 }}>{o.d}</p>
              </div>
            </div>
          );
        })}
      </div>
    </BSection>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STRATEGY CTA — "Let's Turn Strategy Into Results" — contact split (gradient)
   ════════════════════════════════════════════════════════════════════════ */
function StrategyCTA({ onCta }) {
  const [open, setOpen] = useBState(null); // 'message' | 'call'
  const [sent, setSent] = useBState(false);
  const openModal = (kind) => { setOpen(kind); setSent(false); };
  const cards = [
    { t: 'Get in Touch', d: 'Have a question or need more details? Our team is here to help you explore the right solutions for your business.', cta: 'Send a Message', icon: SIcons.mail, kind: 'message' },
    { t: 'Book a Strategy Call', d: 'From design to deployment, we connect you with certified partners who get finance — ensuring every build, migration, or integration meets the highest standards.', cta: 'Schedule Now', icon: SIcons.calendar, kind: 'call' },
  ];
  const isCall = open === 'call';
  return (
    <section id="strategy" style={{ background: 'var(--gradient-brand)', padding: '96px 32px', color: '#fff' }} className="sec cta-sheen">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="strat-head rv-head" style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 48, alignItems: 'center', marginBottom: 48 }}>
          <h2 className="cta-title" style={{ fontSize: 46, fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1.06 }}>Let's turn strategy into results</h2>
          <div>
            <p style={{ fontSize: 17, opacity: .82, lineHeight: 1.6, marginBottom: 22 }}>Connect with Fyscal to move from ambition to execution — securely, rapidly, and with zero guesswork.</p>
            <button className="hbtn" style={{ background: '#fff', color: 'var(--primary)', borderColor: '#fff', cursor: 'pointer' }} onClick={() => openModal('call')}>Book a Strategy Call <SIcons.arrowR size={17} /></button>
          </div>
        </div>
        <div className="strat-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {cards.map((c, i) => {
            const I = c.icon;
            return (
              <div key={i} style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)', padding: 34, backdropFilter: 'blur(6px)' }}>
                <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.22)', display: 'grid', placeItems: 'center', marginBottom: 20 }}><I size={22} stroke="#fff" /></div>
                <h3 style={{ fontSize: 21, fontWeight: 700, letterSpacing: '-.01em', marginBottom: 10 }}>{c.t}</h3>
                <p style={{ fontSize: 14.5, opacity: .78, lineHeight: 1.65, marginBottom: 22 }}>{c.d}</p>
                <button className="nudge" onClick={() => openModal(c.kind)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontWeight: 600, fontSize: 14.5, display: 'inline-flex', alignItems: 'center', gap: 7, borderBottom: '1px solid rgba(255,255,255,.4)', paddingBottom: 3, padding: '0 0 3px' }}>
                  {c.cta} <SIcons.arrowR size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {open && (
        <div className="scta-scrim" onClick={() => setOpen(null)}>
          <div className="scta-modal" onClick={(e) => e.stopPropagation()}>
            <button className="scta-x" onClick={() => setOpen(null)} aria-label="Close"><SIcons.x size={20} stroke="var(--fg)" /></button>
            {!sent ? (
              <React.Fragment>
                <div className="scta-eyebrow">{isCall ? 'Book a strategy call' : 'Get in touch'}</div>
                <h3 className="scta-h">{isCall ? "Let's find a time to talk" : 'Send us a message'}</h3>
                <p className="scta-p">{isCall ? 'Share a few details and our team will reach out to schedule your 30-minute strategy call.' : "Tell us what you're working on and we'll get back to you within one business day."}</p>
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <div className="scta-grid">
                    <div className="scta-field"><label className="scta-label">Full Name <span>*</span></label><input className="scta-input" type="text" required placeholder="Jane Mathews" /></div>
                    <div className="scta-field"><label className="scta-label">Work Email <span>*</span></label><input className="scta-input" type="email" required placeholder="jane@company.com" /></div>
                    <div className="scta-field"><label className="scta-label">Company <span>*</span></label><input className="scta-input" type="text" required placeholder="Company name" /></div>
                    <div className="scta-field"><label className="scta-label">Phone</label><input className="scta-input" type="tel" placeholder="Optional" /></div>
                    <div className="scta-field"><label className="scta-label">Country <span>*</span></label><select className="scta-input" required defaultValue=""><option value="" disabled>Select country</option>{COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                    <div className="scta-field scta-full"><label className="scta-label">{isCall ? 'What would you like to discuss?' : 'Message'}</label><textarea className="scta-input scta-textarea" placeholder={isCall ? 'A line on your goals helps us prepare.' : 'How can we help?'}></textarea></div>
                  </div>
                  <button type="submit" className="hbtn light" style={{ background: 'var(--primary)', color: '#fff', border: '1.5px solid var(--primary)', fontWeight: 600, fontSize: 15, padding: '14px 26px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', width: '100%', marginTop: 8 }}>{isCall ? 'Request my call' : 'Send message'} <SIcons.arrowR size={16} stroke="#fff" /></button>
                  <p className="scta-legal">By submitting, you agree Fyscal may contact you in line with our Privacy Policy.</p>
                </form>
              </React.Fragment>
            ) : (
              <div className="scta-done">
                <div className="scta-done-ic"><SIcons.check size={30} stroke="#fff" /></div>
                <h3 className="scta-h" style={{ marginBottom: 10 }}>{isCall ? 'Request received' : 'Message sent'}</h3>
                <p className="scta-p" style={{ margin: '0 auto' }}>{isCall ? "Thanks — we'll reach out within one business day to schedule your call." : "Thanks for reaching out — we'll get back to you within one business day."}</p>
                <button className="hbtn" onClick={() => setOpen(null)} style={{ background: 'var(--surface)', color: 'var(--fg)', border: '1.5px solid var(--border-input)', fontWeight: 600, fontSize: 14, padding: '12px 22px', cursor: 'pointer', marginTop: 22 }}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   FOOTER — Solutions / Framework / Industries / Insights / Get Help
   ════════════════════════════════════════════════════════════════════════ */
function BankingFooter() {
  const cols = [
    { h: 'Solutions', items: ['Consent Orchestration', 'Wallet Solution', 'Ledger Solution', 'Treasury Solution', 'Biller Management', 'Payment Orchestration'] },
    { h: 'Framework', items: ['Catalyst X', 'RunSync', 'VisionCraft', 'InnovateEdge'] },
    { h: 'Industries', items: ['Banks', 'Fintech'] },
    { h: 'Insights', items: ['Blogs', 'Whitepaper'] },
    { h: 'Get Help', items: ['Contact Us', 'Privacy Policy', 'Terms of Use'] },
  ];
  return (
    <footer style={{ background: 'var(--ink)', color: '#fff', padding: '64px 32px 36px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr repeat(5, 1fr)', gap: 36, paddingBottom: 44, borderBottom: '1px solid rgba(255,255,255,.12)' }}>
          <div>
            <FyscalLogo height={22} variant="white" />
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', lineHeight: 1.6, marginTop: 18, maxWidth: 240 }}>Accelerate banking transformation with seamless core integration, rapid deployment, and continuous compliance.</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {['in', '𝕏', '▶', 'f'].map(s => (
                <div key={s} style={{ width: 34, height: 34, border: '1px solid rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'rgba(255,255,255,.7)', cursor: 'pointer' }}>{s}</div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24 }}>
              <div style={{ background: '#fff', borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center' }}>
                <img src="assets/cert-soc2.png" alt="SOC 2 Type 2" style={{ height: 52, width: 'auto', display: 'block' }} />
              </div>
              <div style={{ background: '#fff', borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center' }}>
                <img src="assets/cert-iso.png" alt="ISO 27001:2013" style={{ height: 52, width: 'auto', display: 'block' }} />
              </div>
            </div>
          </div>
          {cols.map(c => (
            <div key={c.h}>
              <div style={{ fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'rgba(255,255,255,.45)', marginBottom: 16 }}>{c.h}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {c.items.map(i => <a key={i} href={PAGE_LINKS[i] || '#'} style={{ fontSize: 13, color: 'rgba(255,255,255,.75)', textDecoration: 'none' }}>{i}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 26, flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.45)' }}>© 2025 Fyscal Technologies PTE LTD. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 22 }}>
            {['Privacy Policy', 'Terms of Use', 'Contact'].map(l => <a key={l} href={PAGE_LINKS[l] || '#'} style={{ fontSize: 12.5, color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>{l}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { BSection, BEyebrow, BankingNav, BankingHero, BankLogoStrip, ImpactSection, PillarZigZag, PartnerSection, OutcomesSection, StrategyCTA, BankingFooter });
