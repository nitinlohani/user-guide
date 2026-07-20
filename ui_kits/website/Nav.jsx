/* Fyscal Website UI Kit — navigation, buttons, footer */
const { useState } = React;

function WBtn({ children, variant = 'primary', size = 'md', onClick, full }) {
  const [h, setH] = useState(false);
  const pad = size === 'lg' ? '15px 28px' : size === 'sm' ? '8px 16px' : '12px 22px';
  const fs = size === 'lg' ? 15 : size === 'sm' ? 13 : 14;
  const variants = {
    primary: { background: h ? 'var(--tertiary-2)' : 'var(--primary)', color: '#fff', border: '1.5px solid var(--primary)' },
    dark:    { background: h ? '#000' : 'var(--ink)', color: '#fff', border: '1.5px solid var(--mono-900)' },
    ghost:   { background: h ? 'var(--mono-100)' : 'transparent', color: 'var(--fg)', border: '1.5px solid var(--border-input)' },
    light:   { background: h ? 'rgba(255,255,255,.85)' : '#fff', color: 'var(--primary)', border: '1.5px solid #fff' },
    outlineLight: { background: h ? 'rgba(255,255,255,.12)' : 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,.5)' },
  };
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ padding: pad, fontSize: fs, fontWeight: 600, fontFamily: 'var(--font-body)', borderRadius: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: '.15s', width: full ? '100%' : 'auto', letterSpacing: '-.01em', ...variants[variant] }}>
      {children}
    </button>
  );
}

const NAV_LINKS = ['Personal', 'Business', 'Developers', 'Company', 'Pricing'];

const NAV_ITEMS = [
  { label: 'Personal', menu: [
    { t: 'Send money', d: 'Instant transfers, anywhere', icon: SIcons.swap },
    { t: 'Pay bills', d: 'Airtime, data, electricity, TV', icon: SIcons.card },
    { t: 'Cards', d: 'Virtual & physical, global spend', icon: SIcons.bolt },
    { t: 'Savings', d: 'Goals that lock and earn', icon: SIcons.chart },
  ] },
  { label: 'Business', menu: [
    { t: 'Payments API', d: 'Accept and send at scale', icon: SIcons.api },
    { t: 'Payroll', d: 'Bulk payouts in minutes', icon: SIcons.users },
    { t: 'Invoicing', d: 'Bill clients, get paid faster', icon: SIcons.card },
    { t: 'Treasury', d: 'Multi-currency balances', icon: SIcons.globe },
  ] },
  { label: 'Developers', menu: [
    { t: 'Documentation', d: 'Guides and quickstarts', icon: SIcons.api },
    { t: 'API reference', d: 'Every endpoint, with examples', icon: SIcons.lock },
    { t: 'Status', d: 'Live uptime and incidents', icon: SIcons.bolt },
    { t: 'Changelog', d: "What's new this week", icon: SIcons.globe },
  ] },
  { label: 'Company' },
  { label: 'Pricing' },
];

const Caret = () => (
  <svg className="nav-caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
);

function NavBar({ onCta }) {
  const [open, setOpen] = useState(null);
  const [menu, setMenu] = useState(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
      <div className="nav-row" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', gap: 24 }}>
        <FyscalLogo height={20} />
        <nav className="nav-links" style={{ display: 'flex', gap: 6, flex: 1 }}>
          {NAV_ITEMS.map(it => it.menu ? (
            <div key={it.label} className={'nav-item' + (open === it.label ? ' open' : '')}
              onMouseEnter={() => setOpen(it.label)} onMouseLeave={() => setOpen(null)}>
              <button className="nav-trigger" onFocus={() => setOpen(it.label)} aria-haspopup="true" aria-expanded={open === it.label}>
                {it.label}<Caret />
              </button>
              <div className="nav-panel" role="menu">
                {it.menu.map((m, i) => (
                  <a key={m.t} href="#" className="nav-link-row" role="menuitem" style={{ transitionDelay: (i * 45) + 'ms' }}>
                    <span className="nav-link-ic">{React.createElement(m.icon, { size: 18, stroke: 'var(--primary)' })}</span>
                    <span className="nav-link-tx">
                      <span className="nav-link-t">{m.t}</span>
                      <span className="nav-link-d">{m.d}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a key={it.label} href="#" className="nav-plain">{it.label}</a>
          ))}
        </nav>
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <a href="#" style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', textDecoration: 'none' }}>Sign in</a>
          <WBtn size="sm" onClick={onCta}>Open account</WBtn>
        </div>
        <button className="nav-burger" onClick={() => setMenu(m => !m)} aria-label="Menu"
          style={{ display: 'none', width: 42, height: 42, placeItems: 'center', border: '1px solid var(--border-input)', background: 'var(--surface)', cursor: 'pointer', marginLeft: 'auto' }}>
          {menu ? <SIcons.x size={20} stroke="var(--fg)" /> : <SIcons.menu size={20} stroke="var(--fg)" />}
        </button>
      </div>
      {menu && (
        <div className="nav-mobile" style={{ borderTop: '1px solid var(--border)', padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 4, background: 'var(--surface)' }}>
          {NAV_LINKS.map(l => (
            <a key={l} href="#" onClick={() => setMenu(false)} style={{ fontSize: 16, fontWeight: 500, color: 'var(--fg)', textDecoration: 'none', padding: '12px 4px', borderBottom: '1px solid var(--surface-soft)' }}>{l}</a>
          ))}
          <a href="#" style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg)', textDecoration: 'none', padding: '14px 4px 8px' }}>Sign in</a>
          <WBtn full onClick={onCta}>Open account</WBtn>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const cols = [
    { h: 'Personal', items: ['Send money', 'Pay bills', 'Cards', 'Savings', 'Rewards'] },
    { h: 'Business', items: ['Payments API', 'Payroll', 'Invoicing', 'Treasury'] },
    { h: 'Developers', items: ['Documentation', 'API reference', 'Status', 'Changelog'] },
    { h: 'Company', items: ['About', 'Careers', 'Press', 'Contact'] },
  ];
  return (
    <footer style={{ background: 'var(--ink)', color: '#fff', padding: '64px 32px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr repeat(4, 1fr)', gap: 40, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,.12)' }}>
          <div>
            <FyscalLogo height={22} variant="white" />
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', lineHeight: 1.6, marginTop: 18, maxWidth: 240 }}>The modern money platform for Africa — send, spend, and grow in one place.</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {['𝕏', 'in', 'f', '◎'].map(s => (
                <div key={s} style={{ width: 34, height: 34, border: '1px solid rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'rgba(255,255,255,.7)', cursor: 'pointer' }}>{s}</div>
              ))}
            </div>
          </div>
          {cols.map(c => (
            <div key={c.h}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'rgba(255,255,255,.45)', marginBottom: 16 }}>{c.h}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {c.items.map(i => <a key={i} href="#" style={{ fontSize: 13.5, color: 'rgba(255,255,255,.75)', textDecoration: 'none' }}>{i}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 28, flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.45)' }}>© 2026 Fyscal Technologies. Licensed by the Central Bank of Nigeria.</span>
          <div style={{ display: 'flex', gap: 22 }}>
            {['Privacy', 'Terms', 'Security', 'Cookies'].map(l => <a key={l} href="#" style={{ fontSize: 12.5, color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>{l}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { WBtn, NavBar, Footer, NAV_LINKS });
