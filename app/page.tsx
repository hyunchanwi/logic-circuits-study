'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Binary, Check, ChevronRight, CircleHelp, Clipboard, Cpu, Gauge, Lightbulb, Menu, Network, Search, ShieldAlert, X, Zap } from 'lucide-react';

const sections = [
  { id: 'goal', title: '강의 목표', keywords: '해석 설계 조합회로 순차회로 기억소자 하드웨어' },
  { id: 'signals', title: '디지털과 아날로그', keywords: 'digital analog 이산 연속 컴퓨터 스피커' },
  { id: 'evaluation', title: '평가와 운영', keywords: '중간 기말 출석 지각 결석 F 핸드폰' },
  { id: 'roadmap', title: '전체 학습 로드맵', keywords: '수체계 코드 논리 게이트 k-map 플립플롭 카운터 verilog hdl' },
  { id: 'method', title: '회로 학습 순서', keywords: '진리표 논리식 게이트 회로 HDL 변환' },
  { id: 'check', title: '확인 문제', keywords: '퀴즈 정답 시험' },
];

const chapters = [
  ['01', '기초 개념', '디지털 시스템의 출발점'], ['02', '수 체계와 코드', '정보를 0과 1로 표현'], ['03', '논리회로의 묘사', '논리식과 회로 표현'],
  ['04', '조합 논리회로', 'K-map·Quine–McCluskey 최소화'], ['06', '디지털 산술', '연산과 회로'], ['09', 'MSI 논리회로', '중규모 집적회로'],
  ['05', '플립플롭과 관련 소자', '상태를 기억하는 기본 소자'], ['07', '카운터와 레지스터', '순차 동작과 저장'], ['10', 'HDL 디지털 시스템', 'Verilog HDL·프로젝트'],
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [completed, setCompleted] = useState(() => {
    if (typeof window === 'undefined') return false;
    try { return localStorage.getItem('logic-circuits-completed') === 'true'; } catch { return false; }
  });
  const [answers, setAnswers] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const matches = useMemo(() => { const key = query.trim().toLowerCase(); return key ? sections.filter(s => `${s.title} ${s.keywords}`.toLowerCase().includes(key)) : sections; }, [query]);
  function go(id: string) { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }
  function toggleComplete() { const next = !completed; setCompleted(next); try { localStorage.setItem('logic-circuits-completed', String(next)); } catch { /* device-local storage may be unavailable */ } }
  function toggleAnswer(n: number) { setAnswers(a => a.includes(n) ? a.filter(v => v !== n) : [...a, n]); }
  async function copyFlow() { try { await navigator.clipboard.writeText('진리표 → 논리식 → 게이트 → 회로 → HDL'); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch { setCopied(false); } }

  return <div className="site-shell">
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark"><Binary size={21} /></span><span><b>Gate Lab</b><small>논리회로 학습실</small></span></a><label className="search-box"><Search size={17} /><input aria-label="개념 검색" placeholder="게이트, K-map, Verilog 검색" value={query} onChange={e => { setQuery(e.target.value); if (e.target.value) setMenuOpen(true); }} />{query && <button aria-label="검색어 지우기" onClick={() => { setQuery(''); setMenuOpen(false); }}><X size={16} /></button>}</label><button className="mobile-menu" aria-label={menuOpen ? '목차 닫기' : '목차 열기'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button><div className="progress"><span>{completed ? 100 : 0}%</span><i><b style={{ width: completed ? '100%' : '0%' }} /></i></div></header>
    <div className="workspace" id="top">
      {menuOpen && <button className="backdrop" aria-label="목차 닫기" onClick={() => setMenuOpen(false)} />}
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}><a className="hub-link" href="https://hyunchanwi.github.io/study-hub/"><ArrowLeft size={15} /> 전체 과목</a><p className="nav-label">COURSE NOTE</p><button className="week" onClick={() => go('goal')}><span>{completed ? <Check size={14} /> : '01'}</span><b>OT · 과목 안내</b><small>9쪽 · 학습 가능</small></button><p className="nav-label section-label">{query ? `검색 결과 ${matches.length}개` : '1주차 목차'}</p><nav>{matches.map(s => <button key={s.id} onClick={() => go(s.id)}>{s.title}<ChevronRight size={13} /></button>)}</nav>{matches.length === 0 && <p className="empty-search">일치하는 개념이 없습니다.</p>}<div className="source-note"><ShieldAlert size={18} /><b>출처 기준</b><p>현재 공개 내용은 1주차 OT 자료에서 확인한 운영 정보와 학습 범위입니다.</p></div></aside>
      <main className="content">
        <section className="hero"><div><p className="eyebrow"><span /> WEEK 01 · ORIENTATION</p><h1>0과 1로<br /><em>하드웨어를 설계하다.</em></h1><p>논리회로의 해석과 설계 방법을 익혀 조합회로, 순차회로, 기억소자를 이해하는 과목입니다.</p><div className="chips"><span>OT 9쪽</span><span>시험 중심</span><span>Verilog 연결</span></div></div><button className={`complete ${completed ? 'done' : ''}`} onClick={toggleComplete}>{completed ? <><Check size={18} /> 학습 완료</> : <><Gauge size={18} /> 완료로 표시</>}</button></section>
        <div className="stack">
          <section className="card goal-card" id="goal"><div><p className="kicker"><Cpu size={16} /> OT 2쪽 · COURSE GOAL</p><h2>회로를 읽는 것에서 직접 설계하는 것까지</h2><p className="lead">컴퓨터 하드웨어의 기본인 디지털 회로 원리를 이해하고, 디지털 시스템을 분석·설계하는 데 필요한 개념을 배웁니다.</p></div><div className="signal-box"><span>INPUT</span><b>논리회로 원리</b><ArrowRight /><span>OUTPUT</span><b>분석·설계 역량</b></div></section>
          <section className="card" id="signals"><p className="kicker"><Zap size={16} /> OT 3쪽 · SIGNAL</p><h2>디지털과 아날로그는 정보를 표현하는 방식이 달라요</h2><div className="compare"><article><span>DIGITAL</span><h3>구분된 값으로 표현</h3><p>디지털 형태의 물리량이나 정보를 다룹니다.</p><small>예: 디지털 컴퓨터, 계산기, 오디오·비디오 장치</small></article><article><span>ANALOG</span><h3>연속적인 값으로 표현</h3><p>아날로그 형태의 물리량이나 정보를 다룹니다.</p><small>예: 라디오 수신 시 스피커 출력</small></article></div></section>
          <section className="card" id="evaluation"><p className="kicker"><Gauge size={16} /> OT 6–7쪽 · OPERATION</p><h2>시험 90점, 출석 10점의 시험 중심 과목</h2><div className="score"><div><b>45</b><span>중간고사</span></div><i /><div><b>45</b><span>기말고사</span></div><i /><div><b>10</b><span>출석</span></div></div><div className="rules"><p><b>지각 3회</b><span>결석 1회로 환산</span></p><p><b>결석 1/4 이상</b><span>성적 F</span></p><p><b>부정행위</b><span>즉시 F 처리 원칙</span></p><p><b>과제 비중</b><span>추가 시 LMS 공지</span></p></div></section>
          <section className="card" id="roadmap"><p className="kicker"><Network size={16} /> OT 8쪽 · ROADMAP</p><h2>기초 표현에서 HDL 프로젝트까지 이어집니다</h2><div className="chapter-grid">{chapters.map(([n,t,d]) => <article key={`${n}-${t}`}><span>CH {n}</span><b>{t}</b><p>{d}</p></article>)}</div><div className="warning"><CircleHelp size={18} /><p><b>자료 확인 메모:</b> OT 8쪽에는 Chap 9가 중간고사 전·후 구간에 중복 표기되어 있습니다. 실제 진도 순서는 수업과 LMS 공지를 우선합니다.</p></div></section>
          <section className="card" id="method"><p className="kicker"><Lightbulb size={16} /> STUDY METHOD</p><h2>같은 기능을 다섯 표현으로 바꾸는 연습</h2><div className="flow"><span>진리표</span><ArrowRight /><span>논리식</span><ArrowRight /><span>게이트</span><ArrowRight /><span>회로</span><ArrowRight /><span>HDL</span></div><button className="copy" onClick={copyFlow}>{copied ? <Check size={15} /> : <Clipboard size={15} />}{copied ? '복사됨' : '학습 순서 복사'}</button><p className="note">이 변환 흐름은 사이트의 학습 방법입니다. 세부 회로 예제는 실제 강의자료가 추가되는 주차부터 작성합니다.</p></section>
          <section className="quiz" id="check"><p className="kicker"><Binary size={16} /> QUICK CHECK</p><h2>OT 내용을 바로 확인하세요</h2><Quiz n={1} text="중간고사와 기말고사의 합계 비중은 90점이다." answer="O" detail="각 45점으로 합계 90점이며, 출석 10점을 더해 100점입니다." open={answers.includes(1)} toggle={toggleAnswer}/><Quiz n={2} text="지각 3회는 결석 1회로 계산된다." answer="O" detail="OT 운영 안내에 명시된 출결 규칙입니다." open={answers.includes(2)} toggle={toggleAnswer}/><Quiz n={3} text="디지털 시스템은 연속적으로 변하는 값만 다룬다." answer="X" detail="연속적인 표현은 아날로그 시스템의 특징입니다." open={answers.includes(3)} toggle={toggleAnswer}/></section>
        </div>
      </main>
      <aside className="rail"><p>이 과목의 중심</p><div><Binary size={20}/><b>표현을 변환하는 힘</b><span>진리표에서 회로와 HDL까지</span></div><p className="rail-label">평가</p><blockquote>시험 90<br/>출석 10</blockquote></aside>
    </div>
  </div>;
}

function Quiz({n,text,answer,detail,open,toggle}:{n:number;text:string;answer:string;detail:string;open:boolean;toggle:(n:number)=>void}){return <article className="question"><div><span>Q{n}</span><p>{text}</p></div><button onClick={()=>toggle(n)}>{open?'해설 닫기':'정답 확인'}</button>{open&&<div className="answer"><b>정답 {answer}</b><p>{detail}</p></div>}</article>}
