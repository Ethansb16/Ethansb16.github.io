/* =============================================
   Rendering + motion for the single-page site.
   Content lives in experience.js, projects.js,
   skills.js and automation.js — edit it there.
   ============================================= */
(function () {
    'use strict';

    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Run fn once, the first time el scrolls into view
    function onceVisible(el, fn, threshold = 0.25) {
        if (!el) return;
        if (!('IntersectionObserver' in window)) { fn(); return; }
        const io = new IntersectionObserver(entries => {
            if (entries.some(e => e.isIntersecting)) { io.disconnect(); fn(); }
        }, { threshold });
        io.observe(el);
    }

    const cyberSkills = (skillCategories.find(c => c.label === 'Cybersecurity') || { skills: [] }).skills;
    const current = experiences[0];
    // "Label — detail" highlights from the cyber roles
    const splitPoint = h => { const i = h.indexOf(' — '); return i > 0 ? [h.slice(0, i), h.slice(i + 3)] : [null, h]; };

    /* ---------- top bar: clock, progress, active link ---------- */
    const clock = $('#clock');
    const pad = n => String(n).padStart(2, '0');
    const stamp = () => { const d = new Date(); return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`; };
    if (clock) { clock.textContent = stamp(); setInterval(() => { clock.textContent = stamp(); }, 1000); }

    const bar = $('#scroll-progress');
    const railFill = $('#rail-fill');
    const timeline = $('#timeline');
    function onScroll() {
        const de = document.documentElement;
        const total = de.scrollHeight - de.clientHeight;
        if (bar) bar.style.width = (total > 0 ? (de.scrollTop / total) * 100 : 0) + '%';
        if (timeline && railFill) {
            const r = timeline.getBoundingClientRect();
            const mark = window.innerHeight * 0.6;
            const h = Math.max(0, Math.min(r.height, mark - r.top));
            railFill.style.height = h + 'px';
            $$('.role', timeline).forEach(el => el.classList.toggle('is-lit', el.offsetTop + 24 <= h));
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    const navLinks = $$('.nav a');
    if ('IntersectionObserver' in window) {
        const spy = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        $$('main section[id]').forEach(s => spy.observe(s));
    }

    /* ---------- hero ---------- */
    const [company, site] = current.company.split(' — ');
    $('#hero-title').textContent = current.title;
    $('#hero-company').textContent = site ? `${company}, ${site}` : company;

    (function typewriter() {
        const el = $('#typewriter');
        const phrases = current.highlights.map(h => splitPoint(h)[0]).filter(Boolean);
        if (!el || !phrases.length) return;
        if (reduced) { el.textContent = phrases[0]; return; }
        let p = 0, c = 0, del = false;
        (function tick() {
            const phrase = phrases[p];
            c += del ? -1 : 1;
            el.textContent = phrase.slice(0, c);
            let delay = del ? 28 : 55;
            if (!del && c === phrase.length) { del = true; delay = 2200; }
            else if (del && c === 0) { del = false; p = (p + 1) % phrases.length; delay = 350; }
            setTimeout(tick, delay);
        })();
    })();

    /* Scope: a sweep that picks up each cybersecurity skill as a contact */
    (function scope() {
        const canvas = $('#scope');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const css = getComputedStyle(document.documentElement);
        const AMBER = css.getPropertyValue('--amber').trim() || '#ffb224';
        const OK = css.getPropertyValue('--ok').trim() || '#57d9a3';
        const mono = css.getPropertyValue('--mono').trim() || 'monospace';
        let W = 0, H = 0, dpr = 1, running = false, angle = -Math.PI / 2, last = 0;

        // Spread contacts evenly by angle, alternate distance
        const blips = cyberSkills.map((label, i) => ({
            label,
            a: (i / cyberSkills.length) * Math.PI * 2 - Math.PI / 2 + 0.38,
            r: [0.66, 0.88, 0.6, 0.86, 0.64, 0.9, 0.74][i % 7],
            heat: reduced ? 1 : 0
        }));

        function resize() {
            const r = canvas.getBoundingClientRect();
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            W = r.width; H = r.height;
            canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            draw();
        }

        function draw() {
            const cx = W / 2, cy = H / 2, R = Math.min(W, H) / 2 - 14;
            ctx.clearRect(0, 0, W, H);

            // rings + cross
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(87,217,163,.16)';
            for (let i = 1; i <= 4; i++) { ctx.beginPath(); ctx.arc(cx, cy, (R * i) / 4, 0, Math.PI * 2); ctx.stroke(); }
            ctx.beginPath();
            ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy);
            ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R);
            ctx.stroke();
            // bearing ticks
            ctx.strokeStyle = 'rgba(87,217,163,.35)';
            for (let i = 0; i < 72; i++) {
                const a = (i / 72) * Math.PI * 2, len = i % 6 === 0 ? 8 : 4;
                ctx.beginPath();
                ctx.moveTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
                ctx.lineTo(cx + Math.cos(a) * (R - len), cy + Math.sin(a) * (R - len));
                ctx.stroke();
            }

            // sweep
            if (!reduced) {
                if (ctx.createConicGradient) {
                    const g = ctx.createConicGradient(angle, cx, cy);
                    g.addColorStop(0, 'rgba(255,178,36,0)');
                    g.addColorStop(0.82, 'rgba(255,178,36,0)');
                    g.addColorStop(1, 'rgba(255,178,36,.30)');
                    ctx.fillStyle = g;
                    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
                }
                ctx.strokeStyle = AMBER; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(cx, cy);
                ctx.lineTo(cx + Math.cos(angle) * R, cy + Math.sin(angle) * R); ctx.stroke();
            }

            // contacts
            const fs = W < 380 ? 10 : 12;
            ctx.font = `500 ${fs}px ${mono}`;
            ctx.textBaseline = 'middle';
            blips.forEach(b => {
                const x = cx + Math.cos(b.a) * R * b.r, y = cy + Math.sin(b.a) * R * b.r;
                const h = b.heat;
                ctx.globalAlpha = 0.25 + 0.75 * h;
                ctx.fillStyle = AMBER;
                ctx.beginPath(); ctx.arc(x, y, 3 + 2 * h, 0, Math.PI * 2); ctx.fill();
                if (h > 0.02) {
                    ctx.globalAlpha = h * 0.5;
                    ctx.strokeStyle = AMBER; ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.arc(x, y, 6 + (1 - h) * 22, 0, Math.PI * 2); ctx.stroke();
                    // label, kept inside the screen
                    ctx.globalAlpha = Math.min(1, h * 1.6);
                    const w = ctx.measureText(b.label).width;
                    // labels point away from the centre so they never cross the photo
                    let lx = x >= cx ? x + 12 : x - 12 - w;
                    lx = Math.max(8, Math.min(W - 8 - w, lx));
                    ctx.fillStyle = 'rgba(7,13,15,.82)';
                    ctx.fillRect(lx - 4, y - fs * 0.8, w + 8, fs * 1.6);
                    ctx.fillStyle = '#dfe9e4';
                    ctx.fillText(b.label, lx, y);
                }
                ctx.globalAlpha = 1;
            });
            ctx.fillStyle = OK;
        }

        function frame(t) {
            if (!running) return;
            const dt = Math.min(0.05, (t - last) / 1000 || 0); last = t;
            const prev = angle;
            angle += dt * 1.05;                         // ~6s per revolution
            blips.forEach(b => {
                // did the sweep cross this contact during the frame?
                const d = ((b.a - prev) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
                if (d <= angle - prev) b.heat = 1;
                else b.heat = Math.max(0, b.heat - dt * 0.24);
            });
            draw();
            requestAnimationFrame(frame);
        }

        resize();
        window.addEventListener('resize', resize, { passive: true });
        if (reduced) return;
        const io = new IntersectionObserver(entries => {
            const vis = entries[0].isIntersecting;
            if (vis && !running) { running = true; last = performance.now(); requestAnimationFrame(frame); }
            else if (!vis) running = false;
        });
        io.observe(canvas);
    })();

    /* Feed: the cyber roles' highlights, one line at a time */
    (function feed() {
        const list = $('#feed'), toggle = $('#feed-toggle');
        if (!list) return;
        const lines = [];
        experiences.filter(e => e.track === 'cyber' && /PG&E/.test(e.company)).forEach(e => {
            e.highlights.forEach(h => {
                const [label, text] = splitPoint(h);
                lines.push({ tag: label, text });
            });
        });
        let i = 0, paused = false;
        function push() {
            const l = lines[i++ % lines.length];
            const li = document.createElement('li');
            li.innerHTML = `<time>${stamp()}</time>${l.tag ? `<b>${esc(l.tag)}</b>` : ''}${esc(l.text)}`;
            li.title = l.text;
            list.appendChild(li);
            while (list.children.length > 6) list.removeChild(list.firstChild);
        }
        for (let k = 0; k < (reduced ? 6 : 3); k++) push();
        if (reduced) { if (toggle) toggle.hidden = true; return; }
        setInterval(() => { if (!paused && !document.hidden) push(); }, 2400);
        if (toggle) toggle.addEventListener('click', () => {
            paused = !paused;
            toggle.textContent = paused ? 'Resume' : 'Pause';
            toggle.setAttribute('aria-pressed', String(paused));
        });
    })();

    /* ---------- headings decrypt in, gauges count up ---------- */
    $$('[data-decrypt]').forEach(el => {
        const text = el.textContent;
        el.setAttribute('aria-label', text);
        if (reduced) return;
        const glyphs = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%/<>';
        onceVisible(el, () => {
            let f = 0; const frames = 22;
            (function step() {
                const shown = Math.floor((f / frames) * text.length);
                el.textContent = text.split('').map((ch, i) =>
                    i < shown || ch === ' ' ? ch : glyphs[(Math.random() * glyphs.length) | 0]).join('');
                if (f++ < frames) setTimeout(step, 38); else el.textContent = text;
            })();
        }, 0.6);
    });

    onceVisible($('#gauges'), () => {
        if (reduced) return;
        $$('#gauges [data-count]').forEach(dd => {
            const target = +dd.dataset.count, suffix = dd.dataset.suffix || '';
            const t0 = performance.now(), dur = 1400;
            (function step(t) {
                const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
                dd.textContent = Math.round(target * e).toLocaleString('en-US') + suffix;
                if (p < 1) requestAnimationFrame(step);
            })(t0);
        });
    });

    /* ---------- experience ---------- */
    (function renderExperience() {
        if (!timeline) return;
        experiences.forEach((exp, i) => {
            const d = document.createElement('details');
            d.className = 'role' + (exp.track === 'cyber' ? ' is-cyber' : '');
            d.dataset.track = exp.track || 'other';
            if (i < 2) d.open = true;

            const refs = (exp.references || []).map(r => `
                <div class="extra">
                    <span class="extra-tag">Reference</span>
                    <span class="extra-name">${esc(r.name)}</span>
                    <span class="extra-sub">${esc(r.title)}</span>
                    <span class="extra-sub">${esc(r.contact)}</span>
                </div>`).join('');
            const awards = notableAchievements.filter(a => a.role === exp.title).map(a => `
                <div class="extra is-award">
                    <span class="extra-tag">Notable achievement, ${esc(a.date)}</span>
                    <span class="extra-name">${esc(a.title)}</span>
                    <span class="extra-sub">${esc(a.description)}</span>
                </div>`).join('');

            d.innerHTML = `
                <summary>
                    <span class="role-date">${esc(exp.period)}</span>
                    <span class="role-title">${esc(exp.title)}</span>
                    <span class="role-company">${esc(exp.company)}</span>
                    <i class="fas fa-plus role-toggle" aria-hidden="true"></i>
                </summary>
                <div class="role-body">
                    <p class="role-desc">${esc(exp.description)}</p>
                    <ul class="role-points">
                        ${exp.highlights.map(h => {
                            const [label, text] = splitPoint(h);
                            return `<li>${label ? `<b>${esc(label)}</b> — ` : ''}${esc(text)}</li>`;
                        }).join('')}
                    </ul>
                    ${refs || awards ? `<div class="role-extras">${awards}${refs}</div>` : ''}
                </div>`;
            d.addEventListener('toggle', onScroll);
            timeline.appendChild(d);
        });

        $$('.filter .chip').forEach(btn => btn.addEventListener('click', () => {
            const f = btn.dataset.filter;
            $$('.filter .chip').forEach(b => {
                b.classList.toggle('is-on', b === btn);
                b.setAttribute('aria-pressed', String(b === btn));
            });
            $$('.role', timeline).forEach(r => { r.hidden = f !== 'all' && r.dataset.track !== f; });
            onScroll();
        }));
    })();

    /* ---------- shared: animated flow diagram ---------- */
    function flow(steps) {
        const n = steps.length;
        return `<div class="flow" style="--n:${n}">${steps.map((s, i) => `
            <div class="flow-node" style="--i:${i}"><i class="${esc(s.icon)}" aria-hidden="true"></i><span>${esc(s.label)}</span></div>
            ${i < n - 1 ? `<div class="flow-wire" style="--i:${i}" aria-hidden="true"></div>` : ''}`).join('')}</div>`;
    }
    const tags = list => `<div class="tags">${list.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>`;
    const gh = (href, label) => href ? `<a href="${esc(href)}" class="link" target="_blank" rel="noopener"><i class="fab fa-github" aria-hidden="true"></i>${label}</a>` : '';

    /* ---------- projects ---------- */
    (function renderProjects() {
        const root = $('#projects-root');
        if (!root) return;
        const featured = projects.filter(p => p.featured);
        const collections = projects.filter(p => p.subProjects);
        const rest = projects.filter(p => !p.featured && !p.subProjects);
        let html = '';

        featured.forEach(p => {
            html += `
            <article class="feature">
                <div>
                    <span class="new-flag">New</span>
                    <h3>${esc(p.title)}</h3>
                    <p>${esc(p.description)}</p>
                    ${tags(p.technologies)}
                    ${gh(p.link, 'View on GitHub')}
                </div>
                <div class="airgap">
                    <span class="airgap-label"><i class="fas fa-lock" aria-hidden="true"></i> Offline</span>
                    <span class="airgap-cloud"><i class="fas fa-cloud" aria-hidden="true"></i>No cloud</span>
                    ${flow(p.pipeline)}
                </div>
            </article>`;
        });

        collections.forEach((p, ci) => {
            html += `
            <article class="collection">
                <div class="collection-top">
                    <div>
                        <h3>${esc(p.title)}</h3>
                        <p>${esc(p.description)}</p>
                        ${tags(p.technologies)}
                    </div>
                    ${gh(p.link, 'View collection on GitHub')}
                </div>
                <div class="viewer" data-collection="${ci}">
                    <div class="viewer-tabs" role="tablist" aria-label="${esc(p.title)}">
                        ${p.subProjects.map((s, i) => `<button type="button" class="viewer-tab" role="tab" id="tab-${ci}-${i}" aria-controls="pane-${ci}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(s.title)}</button>`).join('')}
                    </div>
                    <div class="viewer-pane" role="tabpanel" id="pane-${ci}" aria-labelledby="tab-${ci}-0"></div>
                </div>
            </article>`;
        });

        html += `<div class="cards">${rest.map(p => `
            <article class="card">
                <h3>${esc(p.title)}</h3>
                <p>${esc(p.description)}</p>
                ${tags(p.technologies)}
                ${gh(p.link, 'View on GitHub')}
            </article>`).join('')}</div>`;
        root.innerHTML = html;

        // tabbed viewer for the collection, auto-advancing until the visitor takes over
        $$('.viewer', root).forEach(v => {
            const subs = collections[+v.dataset.collection].subProjects;
            const tabs = $$('.viewer-tab', v), pane = $('.viewer-pane', v);
            let idx = 0, auto = !reduced;
            function show(i, focus) {
                idx = (i + subs.length) % subs.length;
                tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === idx)); t.tabIndex = k === idx ? 0 : -1; });
                pane.setAttribute('aria-labelledby', tabs[idx].id);
                const s = subs[idx];
                pane.innerHTML = `<h4>${esc(s.title)}</h4><p>${esc(s.description)}</p>${tags(s.technologies)}`;
                pane.classList.remove('is-swap'); void pane.offsetWidth; pane.classList.add('is-swap');
                if (focus) tabs[idx].focus();
            }
            const stop = () => { auto = false; };
            tabs.forEach((t, k) => {
                t.addEventListener('click', () => { stop(); show(k); });
                t.addEventListener('keydown', e => {
                    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); stop(); show(idx + 1, true); }
                    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); stop(); show(idx - 1, true); }
                });
            });
            v.addEventListener('pointerenter', stop);
            show(0);
            onceVisible(v, () => { const id = setInterval(() => { if (!auto) return clearInterval(id); if (!document.hidden) show(idx + 1); }, 3200); });
        });

        $$('.card', root).forEach(c => c.addEventListener('pointermove', e => {
            const r = c.getBoundingClientRect();
            c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
            c.style.setProperty('--my', (e.clientY - r.top) + 'px');
        }));
    })();

    /* ---------- automation ---------- */
    (function renderAutomation() {
        const root = $('#automation-root');
        if (!root) return;
        root.innerHTML = automations.map(a => `
            <article class="auto" id="${esc(a.id)}">
                <span class="auto-kind"><i class="fas ${esc(a.icon)}" aria-hidden="true"></i>${esc(a.label)}</span>
                <h3>${esc(a.title)}</h3>
                <p>${esc(a.description)}</p>
                ${a.pipeline ? flow(a.pipeline) : ''}
                <ol class="auto-steps">${a.details.map(d => `<li>${esc(d)}</li>`).join('')}</ol>
                ${a.stat ? `<div class="auto-stat"><b>${esc(a.stat.value)}</b><span>${esc(a.stat.label)}</span></div>` : ''}
                ${tags(a.technologies)}
            </article>`).join('');
    })();

    /* ---------- skills: annunciator panel ---------- */
    (function renderSkills() {
        const root = $('#skills-root');
        if (!root) return;
        const ordered = skillCategories.slice().sort((a, b) => (b.label === 'Cybersecurity') - (a.label === 'Cybersecurity'));
        root.innerHTML = ordered.map(cat => `
            <div class="ann-group${cat.label === 'Cybersecurity' ? ' is-cyber' : ''}">
                <h3><i class="fas ${esc(cat.icon)}" aria-hidden="true"></i>${esc(cat.label)}</h3>
                <ul class="ann-tiles">${cat.skills.map(s => `<li class="tile" tabindex="0">${esc(s)}</li>`).join('')}</ul>
            </div>`).join('');

        const tiles = $$('.tile', root);
        let busy = false;
        function lampTest() {
            if (busy) return;
            if (reduced) { $$('.is-cyber .tile', root).forEach(t => t.classList.add('is-held')); return; }
            busy = true;
            tiles.forEach(t => t.classList.remove('is-held'));
            tiles.forEach((t, i) => {
                setTimeout(() => t.classList.add('is-lit'), i * 55);
                setTimeout(() => {
                    t.classList.remove('is-lit');
                    if (t.closest('.is-cyber')) t.classList.add('is-held');   // cyber tiles stay energised
                    if (i === tiles.length - 1) busy = false;
                }, i * 55 + 520);
            });
        }
        onceVisible(root, lampTest, 0.3);
        const btn = $('#lamp-test');
        if (btn) btn.addEventListener('click', lampTest);
    })();

    /* ---------- terminal ---------- */
    (function terminal() {
        const wrap = $('#terminal'), out = $('#term-out'), form = $('#term-form'), input = $('#term-input');
        const openBtn = $('#open-terminal');
        if (!wrap || !form) return;
        const sections = ['about', 'experience', 'projects', 'automation', 'skills', 'goals', 'contact'];
        let opener = null;
        const history = []; let hi = 0;

        const print = html => { const d = document.createElement('div'); d.innerHTML = html; out.appendChild(d); out.scrollTop = out.scrollHeight; };
        const hl = s => `<span class="hl">${esc(s)}</span>`, dim = s => `<span class="dim">${esc(s)}</span>`;

        const commands = {
            help: () => [
                `${hl('whoami')}       current role`,
                `${hl('experience')}   work history`,
                `${hl('projects')}     project list`,
                `${hl('automation')}   automated systems`,
                `${hl('skills')}       technical skills`,
                `${hl('goals')}        professional goals`,
                `${hl('contact')}      how to reach me`,
                `${hl('open')} ${dim('<section>')}  jump to a section (${sections.join(', ')})`,
                `${hl('clear')}        clear the screen`,
                `${hl('exit')}         close the terminal`
            ].join('\n'),
            whoami: () => `Ethan Bernhardt\n${hl(current.title)}\n${esc(current.company)}\n${dim(current.period)}`,
            experience: () => experiences.map(e => `${dim(e.period.padEnd(27))} ${hl(e.title)}\n${' '.repeat(28)}${esc(e.company)}`).join('\n'),
            projects: () => projects.map(p => `${hl(p.title)}\n  ${esc(p.description)}` +
                (p.subProjects ? '\n' + p.subProjects.map(s => `    - ${esc(s.title)}`).join('\n') : '') +
                (p.link ? `\n  <a href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.link)}</a>` : '')).join('\n\n'),
            automation: () => automations.map(a => `${hl(a.title)}\n  ${esc(a.description)}`).join('\n\n'),
            skills: () => skillCategories.map(c => `${hl(c.label)}\n  ${esc(c.skills.join(', '))}`).join('\n'),
            goals: () => $$('#goals .goal').map(g => `${hl($('h3', g).textContent)}\n` + $$('li', g).map(li => `  - ${esc(li.textContent)}`).join('\n')).join('\n'),
            contact: () => $$('#contact .contact-item').map(c => c.href
                ? `<a href="${esc(c.getAttribute('href'))}"${c.target ? ' target="_blank" rel="noopener"' : ''}>${esc(c.textContent.trim())}</a>`
                : esc(c.textContent.trim())).join('\n'),
            clear: () => { out.innerHTML = ''; return ''; },
            exit: () => { close(); return ''; }
        };
        commands.ls = commands.help;

        function run(raw) {
            const line = raw.trim();
            if (!line) return;
            print(`<span class="cmd">&gt; ${esc(line)}</span>`);
            const [cmd, arg] = line.toLowerCase().split(/\s+/);
            if (cmd === 'open' || cmd === 'cd' || cmd === 'goto') {
                if (sections.includes(arg)) { close(); location.hash = '#' + arg; }
                else print(`Unknown section. Try: ${esc(sections.join(', '))}`);
                return;
            }
            const fn = commands[cmd];
            const res = fn ? fn() : `Command not found: ${esc(cmd)}. Type ${hl('help')} to see what works.`;
            if (res) print(res);
        }

        function open() {
            opener = document.activeElement;
            wrap.hidden = false;
            if (!out.children.length) print(`${dim('Ask about Ethan from the keyboard. Type')} ${hl('help')} ${dim('to list commands.')}`);
            input.focus();
        }
        function close() { wrap.hidden = true; if (opener && opener.focus) opener.focus(); }

        openBtn.addEventListener('click', open);
        $('#close-terminal').addEventListener('click', close);
        wrap.addEventListener('click', e => { if (e.target === wrap) close(); });
        form.addEventListener('submit', e => {
            e.preventDefault();
            const v = input.value; input.value = '';
            if (v.trim()) { history.push(v); hi = history.length; }
            run(v);
        });
        input.addEventListener('keydown', e => {
            if (e.key === 'ArrowUp' && hi > 0) { e.preventDefault(); input.value = history[--hi]; }
            if (e.key === 'ArrowDown' && hi < history.length) { e.preventDefault(); input.value = history[++hi] || ''; }
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && !wrap.hidden) { close(); return; }
            const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
            if (e.key === '/' && wrap.hidden && !typing && !e.ctrlKey && !e.metaKey) { e.preventDefault(); open(); }
            if (e.key === 'Tab' && !wrap.hidden) {         // keep focus inside the dialog
                const f = [input, $('#close-terminal')];
                const i = f.indexOf(document.activeElement);
                e.preventDefault(); f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus();
            }
        });
    })();

    onScroll();
})();
