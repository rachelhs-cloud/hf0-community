import React, { useState, useEffect, useRef } from 'react';

const PRODUCTS = [
  {
    id: 'pulse',
    name: 'The Pulse',
    number: '01',
    tagline: 'A corkboard and a walk.',
    category: 'During Residency',
    description: 'Sunday: every founder writes down what they\'re stuck on. Monday morning it goes up on a corkboard in the kitchen. Tuesday: two people get paired for a 20-minute walk based on who might actually be useful to each other.',
    whyItWorks: 'Walking side-by-side changes how people talk. Less formal than sitting across a table. Alumni can opt in to see the board remotely and do a phone walk with a current founder once a week.',
  },
  {
    id: 'campfire',
    name: 'Campfire Dinners',
    number: '02',
    tagline: 'Wednesday dinner. One question on the table.',
    category: 'During Residency',
    description: 'A small group from the cohort, rotating weekly to keep it intimate. One card with a question. No phones, no pitching.',
    whyItWorks: 'The questions jump around on purpose. Week 2: "When did you last feel like a fraud?" Week 3: "What would you build to make your mom proud?" Week 6: "What\'s the honest answer to how\'s it going?" If the questions get heavier every week, people brace for it. Mixing it up keeps people off-script.',
  },
  {
    id: 'signal',
    name: 'Signal Board',
    number: '03',
    tagline: 'Time-boxed asks. 72 hours and gone.',
    category: 'Alumni Network',
    description: 'Post a single ask or offer. It disappears after 72 hours. "I need an intro to Stripe\'s head of partnerships." "Free for 2 hours to review a pitch deck." One tap to respond. That\'s it.',
    whyItWorks: 'Alumni networks go quiet because everyone gets busy and the Slack becomes a graveyard. The expiration keeps things moving. There\'s always something fresh on the board, and nothing lingers long enough to feel stale. One monthly email: "The network made X connections this month." Nothing else.',
  },
  {
    id: 'return',
    name: 'The Return',
    number: '04',
    tagline: 'Come back to the house for 48 hours.',
    category: 'Alumni Network',
    description: 'Every quarter, six alumni come back to the house with a specific problem: a pivot, a stalled fundraise, a co-founder situation. The current batch works on it with them. Friday night: war stories dinner.',
    whyItWorks: 'Most programs can\'t do this because they don\'t have a physical space. For alumni, it\'s focused help in the place where they did their best work. For the current batch, it\'s a look at what happens after Demo Day. You apply with a "48-hour goal." If you can\'t name what you need to solve, you\'re not ready to come back.',
  },
  {
    id: 'mirror',
    name: 'Mirror Sessions',
    number: '05',
    tagline: 'You listen. You don\'t fix.',
    category: 'Deep Practice',
    description: 'An HF0 alum paired with a founder in the current cohort. Biweekly 45-minute calls. The alum doesn\'t give advice. They just reflect back what they hear. "You said you were excited about enterprise, but your voice changed when you talked about the consumer product."',
    whyItWorks: 'This isn\'t mentorship. Nobody is dispensing wisdom. The alum just notices patterns and says them out loud. Both people journal after. Pairs reset with each new cohort so it stays about the practice, not the relationship.',
  },
];

const NEXTGEN = {
  name: 'HF0 Next Gen',
  tagline: 'Programming for the children of HF0 founders.',
  intro: 'Many HF0 founders are parents. Their kids grow up in houses where building companies is dinner conversation. They\'ve seen fundraises, pivots, and failures up close. Next Gen gives that exposure some structure.',
  whyNow: 'The alumni network keeps growing, and so does the number of founder-parents with teenagers and young adults watching them build. These kids have unusual context. Next Gen turns it into something intentional.',
  programs: [
    {
      name: 'Builder Pods',
      age: '13–17',
      description: 'Groups of 4-5 kids from different HF0 families. Meet biweekly for 8 weeks. Each pod ships one real project. Their advisor is an HF0 alum from a different family who asks questions, doesn\'t direct.',
      details: [
        'Cross-family and cross-batch. The kids build relationships with each other, not just within families.',
        'Real problems, not simulations. They ship something by week 8.',
        'Pod Demo Day: kids present to HF0 families. Celebratory, not competitive.',
      ],
    },
    {
      name: 'Shadow Weeks',
      age: '16–22',
      description: 'One week embedded at an HF0 alum\'s company. Not an internship. A shadow. You sit in on standups, investor calls, hard conversations. Evening debrief with the host founder each night.',
      details: [
        'No sanitized version of the job. You see everything.',
        'Matched on curiosity, not career track. A music kid might shadow a biotech founder.',
        'Post-shadow reflection shared with the community.',
      ],
    },
    {
      name: 'Summer Institute',
      age: '15–20',
      description: 'One week at the actual house between batches. 15-20 kids. Build in the morning, test in the afternoon, dinner with an alumni speaker each night. Speakers tell their worst-week story, not a polished talk.',
      details: [
        'Same house, same intensity. The physical space works on teenagers too.',
        'Final day: demos for parents and the HF0 community.',
        'Radical honesty from speakers, age-appropriate.',
      ],
    },
    {
      name: 'Mentorship Threads',
      age: '18–25',
      description: 'Six-month pairings with HF0 alumni who aren\'t their parents. Monthly calls focused on thinking frameworks: how to evaluate opportunities, make decisions under uncertainty, know when to commit vs. explore.',
      details: [
        'Not career placement. The goal is judgment, not a job.',
        'Same listening-first framework as Mirror Sessions.',
        'Quarterly gatherings where the next-gen cohort starts forming its own network.',
      ],
    },
  ],
  philosophy: 'HF0 changes people by changing their environment. The house does it for founders in 12 weeks. The question for the next generation is simpler: can you give teenagers and young adults the same ingredients (focus, honest people, real work) and have it stick?',
};

// Sphere - closer to HF0's sliced sphere visual
const Sphere = ({ size = 140 }) => {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = 2;
    const s = size * dpr;
    canvas.width = s;
    canvas.height = s;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';

    let animId;
    const draw = () => {
      const f = frameRef.current;
      ctx.clearRect(0, 0, s, s);
      const cx = s / 2, cy = s / 2, r = s * 0.36;

      // Outer glow
      const g1 = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 1.6);
      g1.addColorStop(0, 'rgba(200,200,220,0.04)');
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Sphere body - subtle gradient
      const g2 = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r);
      g2.addColorStop(0, 'rgba(255,255,255,0.05)');
      g2.addColorStop(0.7, 'rgba(255,255,255,0.015)');
      g2.addColorStop(1, 'rgba(255,255,255,0.005)');
      ctx.fillStyle = g2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Edge ring
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Latitude lines
      for (let i = -5; i <= 5; i++) {
        const lat = (i / 5) * 0.85;
        const y = cy + lat * r;
        const rx = Math.sqrt(Math.max(0, r * r - (y - cy) * (y - cy)));
        if (rx < 2) continue;
        ctx.beginPath();
        ctx.ellipse(cx, y, rx, rx * 0.12 + Math.abs(lat) * rx * 0.04, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${0.035 + (1 - Math.abs(lat)) * 0.015})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Longitude lines (rotating)
      const rotSpeed = 0.002;
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI + f * rotSpeed;
        ctx.beginPath();
        for (let t = 0; t <= Math.PI; t += 0.015) {
          const x = cx + r * Math.sin(t) * Math.cos(angle);
          const y = cy - r * Math.cos(t);
          if (t === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.03)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // THE SLICE - horizontal cut with glow
      const sliceOffset = Math.sin(f * 0.006) * r * 0.15;
      const sliceY = cy + sliceOffset;
      const sliceRx = Math.sqrt(Math.max(0, r * r - sliceOffset * sliceOffset));

      // Slice glow
      const sg = ctx.createRadialGradient(cx, sliceY, 0, cx, sliceY, sliceRx * 1.2);
      sg.addColorStop(0, 'rgba(255,255,255,0.03)');
      sg.addColorStop(1, 'transparent');
      ctx.fillStyle = sg;
      ctx.beginPath();
      ctx.ellipse(cx, sliceY, sliceRx * 1.1, sliceRx * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();

      // Slice line - brighter
      ctx.beginPath();
      ctx.ellipse(cx, sliceY, sliceRx, sliceRx * 0.1, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Gap effect - darken above/below the slice slightly
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.ellipse(cx, sliceY, sliceRx * 0.95, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Inner highlight on slice edge
      ctx.beginPath();
      ctx.ellipse(cx, sliceY - 1.5, sliceRx * 0.9, sliceRx * 0.06, 0, Math.PI, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, sliceY + 1.5, sliceRx * 0.9, sliceRx * 0.06, 0, 0, Math.PI);
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 0.6;
      ctx.stroke();

      frameRef.current++;
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [size]);

  return <canvas ref={canvasRef} style={{ width: size, height: size }} />;
};

const App = () => {
  const [selected, setSelected] = useState(null);
  const [entered, setEntered] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [nextGenOpen, setNextGenOpen] = useState(false);
  const [nextGenProgram, setNextGenProgram] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const detailRef = useRef(null);
  const nextGenRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 680);
    check();
    window.addEventListener('resize', check);
    // Ensure viewport meta exists
    if (!document.querySelector('meta[name="viewport"]')) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1';
      document.head.appendChild(meta);
    }
    return () => window.removeEventListener('resize', check);
  }, []);
  useEffect(() => { setTimeout(() => setEntered(true), 50); }, []);
  useEffect(() => { if (selected !== null && detailRef.current) detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, [selected]);
  useEffect(() => { if (nextGenOpen && nextGenRef.current) nextGenRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, [nextGenOpen]);

  const active = PRODUCTS.find(p => p.id === selected);
  const mono = { fontFamily: '"SF Mono", "Fira Code", "Courier New", monospace' };
  const px = isMobile ? '20px' : '40px';

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>

      {/* Hero */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: isMobile ? '60px 20px 40px' : '80px 40px 60px', textAlign: 'center',
        opacity: entered ? 1 : 0, transition: 'opacity 1s ease',
      }}>
        <Sphere size={isMobile ? 100 : 150} />
        <h1 style={{
          fontSize: isMobile ? '12px' : '14px', ...mono, letterSpacing: '0.2em', fontWeight: 400,
          color: '#fff', marginTop: isMobile ? '36px' : '48px', marginBottom: '20px',
        }}>
          HF0 RESIDENCY
        </h1>
        <p style={{
          fontSize: isMobile ? '28px' : '40px', fontWeight: 300, letterSpacing: '-0.02em',
          lineHeight: 1.2, maxWidth: '520px', margin: '0 auto',
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}>
          Building bonds that outlast the batch.
        </p>
        <p style={{
          fontSize: isMobile ? '11px' : '13px', color: '#555', marginTop: '24px', ...mono,
        }}>
          5 products + 1 experimental
        </p>
      </div>

      {/* Product grid */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: `0 ${px} 40px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1px', background: '#1a1a1a' }}>
          {PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => { setSelected(selected === p.id ? null : p.id); setNextGenOpen(false); }}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                textAlign: 'center', padding: isMobile ? '32px 20px' : '44px 24px', background: '#000',
                border: 'none', cursor: 'pointer', transition: 'all 0.4s ease',
                opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(8px)',
                transitionDelay: `${0.3 + i * 0.06}s`,
                position: 'relative',
                gridColumn: isMobile ? undefined : (i === 3 ? '1 / 2' : i === 4 ? '2 / 3' : undefined),
              }}
            >
              {selected === p.id && <div style={{ position: 'absolute', bottom: 0, left: '25%', right: '25%', height: '1px', background: '#fff' }} />}
              <span style={{ ...mono, fontSize: '11px', color: '#333', display: 'block', marginBottom: '18px' }}>
                {p.number}
              </span>
              <h3 style={{
                fontSize: '19px', fontWeight: 300, letterSpacing: '-0.01em',
                color: hovered === p.id || selected === p.id ? '#fff' : '#666',
                transition: 'color 0.3s', marginBottom: '10px',
                fontFamily: 'Georgia, "Times New Roman", serif',
              }}>
                {p.name}
              </h3>
              <p style={{ ...mono, fontSize: '11px', color: '#444', lineHeight: 1.5, maxWidth: '180px', margin: '0 auto' }}>
                {p.tagline}
              </p>
            </button>
          ))}
          {/* Empty cell to keep grid clean */}
          {!isMobile && <div style={{ background: '#000' }} />}
        </div>
      </div>

      {/* Detail */}
      {active && (
        <div ref={detailRef} style={{ maxWidth: '900px', margin: '0 auto', padding: `0 ${px} 80px` }}>
          <div style={{ border: '1px solid #1a1a1a' }}>
            <div style={{
              padding: isMobile ? '28px 20px' : '44px', borderBottom: '1px solid #1a1a1a',
              display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-start',
              gap: isMobile ? '20px' : '0',
            }}>
              <div style={{ maxWidth: '540px' }}>
                <span style={{ ...mono, fontSize: '11px', color: '#444', letterSpacing: '0.1em' }}>
                  {active.number} / {active.category.toUpperCase()}
                </span>
                <h2 style={{
                  fontSize: isMobile ? '24px' : '30px', fontWeight: 300, marginTop: '14px', marginBottom: '16px',
                  fontFamily: 'Georgia, serif', letterSpacing: '-0.02em',
                }}>
                  {active.name}
                </h2>
                <p style={{ fontSize: isMobile ? '14px' : '15px', lineHeight: 1.8, color: '#888', fontFamily: 'Georgia, serif' }}>
                  {active.description}
                </p>
              </div>
              <button onClick={() => setSelected(null)} style={{
                ...mono, fontSize: '11px', color: '#555', background: 'transparent',
                border: '1px solid #222', padding: '8px 14px', cursor: 'pointer', letterSpacing: '0.1em',
              }}>
                CLOSE
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
              <div style={{ padding: isMobile ? '28px 20px' : '40px 44px' }}>
                <h4 style={{ ...mono, fontSize: '10px', letterSpacing: '0.15em', color: '#444', marginBottom: '14px' }}>THE IDEA</h4>
                <p style={{ fontSize: '14px', lineHeight: 1.85, color: '#888', fontFamily: 'Georgia, serif' }}>{active.whyItWorks}</p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* System */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: `0 ${px} 80px` }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: 300, fontFamily: 'Georgia, serif' }}>How it connects</h2>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 32px 1fr 32px 1fr',
          alignItems: 'start', padding: isMobile ? '24px 20px' : '32px', border: '1px solid #1a1a1a',
          gap: isMobile ? '24px' : '0',
        }}>
          {[
            { label: 'DURING', items: ['The Pulse', 'Campfire Dinners'], note: 'Weekly rhythms inside the house.' },
            null,
            { label: 'AFTER', items: ['Signal Board', 'The Return'], note: 'Stay useful after you leave.' },
            null,
            { label: 'ONGOING', items: ['Mirror Sessions'], note: 'Long-term listening practice.' },
          ].map((b, i) => b === null ? (
            isMobile ? null : <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '16px', color: '#222' }}>→</div>
          ) : (
            <div key={i} style={{ textAlign: 'center' }}>
              <span style={{ ...mono, fontSize: '10px', letterSpacing: '0.15em', color: '#555' }}>{b.label}</span>
              <div style={{ margin: '14px 0' }}>
                {b.items.map(item => (
                  <div key={item} style={{ fontSize: '15px', color: '#999', marginBottom: '5px', fontFamily: 'Georgia, serif' }}>{item}</div>
                ))}
              </div>
              <p style={{ ...mono, fontSize: '10px', color: '#444', lineHeight: 1.5 }}>{b.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: `0 ${px}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <div style={{ flex: 1, height: '1px', background: '#1a1a1a' }} />
          <span style={{ ...mono, fontSize: '10px', letterSpacing: '0.15em', color: '#444' }}>EXPERIMENTAL</span>
          <div style={{ flex: 1, height: '1px', background: '#1a1a1a' }} />
        </div>
      </div>

      {/* Next Gen */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: `0 ${px} 80px` }}>
        <button
          onClick={() => { setNextGenOpen(!nextGenOpen); setSelected(null); setNextGenProgram(null); }}
          onMouseEnter={() => setHovered('ng')}
          onMouseLeave={() => setHovered(null)}
          style={{
            width: '100%', textAlign: 'center', padding: isMobile ? '32px 20px' : '44px',
            background: 'transparent', border: '1px solid #1a1a1a',
            cursor: 'pointer', transition: 'border-color 0.3s',
            borderColor: nextGenOpen || hovered === 'ng' ? '#333' : '#1a1a1a',
          }}
        >
          <span style={{ ...mono, fontSize: '10px', letterSpacing: '0.15em', color: '#444', display: 'block', marginBottom: '14px' }}>EXPERIMENTAL</span>
          <h2 style={{
            fontSize: '26px', fontWeight: 300, fontFamily: 'Georgia, serif',
            color: hovered === 'ng' || nextGenOpen ? '#fff' : '#666',
            transition: 'color 0.3s', marginBottom: '8px',
          }}>
            HF<span style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: '26px', fontWeight: 400 }}>0</span> Next Gen
          </h2>
          <p style={{ ...mono, fontSize: '11px', color: '#444' }}>{NEXTGEN.tagline}</p>
        </button>

        {nextGenOpen && (
          <div ref={nextGenRef} style={{ border: '1px solid #1a1a1a', borderTop: 'none' }}>
            <div style={{ padding: isMobile ? '28px 20px' : '44px', borderBottom: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#888', fontFamily: 'Georgia, serif', maxWidth: '560px', margin: '0 auto', textAlign: 'center', marginBottom: '20px' }}>
                {NEXTGEN.intro}
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#555', fontFamily: 'Georgia, serif', maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
                {NEXTGEN.whyNow}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1px', background: '#1a1a1a' }}>
              {NEXTGEN.programs.map((prog, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setNextGenProgram(nextGenProgram === i ? null : i); }}
                  onMouseEnter={() => setHovered(`ngp-${i}`)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    textAlign: 'left', padding: '32px', background: '#000',
                    border: 'none', cursor: 'pointer', position: 'relative',
                  }}
                >
                  {nextGenProgram === i && <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px', background: '#333' }} />}
                  <span style={{ ...mono, fontSize: '11px', color: '#444', display: 'block', marginBottom: '10px' }}>AGES {prog.age}</span>
                  <h3 style={{
                    fontSize: '18px', fontWeight: 300, fontFamily: 'Georgia, serif',
                    color: nextGenProgram === i || hovered === `ngp-${i}` ? '#fff' : '#666',
                    transition: 'color 0.3s', marginBottom: '8px',
                  }}>{prog.name}</h3>
                  <p style={{ fontSize: '13px', lineHeight: 1.65, color: '#555', fontFamily: 'Georgia, serif' }}>{prog.description}</p>
                  {nextGenProgram === i && (
                    <div style={{ marginTop: '20px' }}>
                      {prog.details.map((d, j) => (
                        <div key={j} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: j < prog.details.length - 1 ? '1px solid #111' : 'none' }}>
                          <span style={{ ...mono, fontSize: '11px', color: '#333' }}>{String.fromCharCode(97 + j)}.</span>
                          <p style={{ fontSize: '12px', lineHeight: 1.7, color: '#666', margin: 0, fontFamily: 'Georgia, serif' }}>{d}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #1a1a1a' }}>
              <div style={{ padding: isMobile ? '24px 20px' : '32px 44px' }}>
                <h4 style={{ ...mono, fontSize: '10px', letterSpacing: '0.15em', color: '#444', marginBottom: '12px' }}>THE QUESTION</h4>
                <p style={{ fontSize: '13px', lineHeight: 1.85, color: '#666', fontFamily: 'Georgia, serif' }}>{NEXTGEN.philosophy}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid #0d0d0d' }}>
        <span style={{ ...mono, fontSize: '11px', color: '#1a1a1a', letterSpacing: '0.1em' }}>HF0</span>
      </footer>
    </div>
  );
};

export default App;
