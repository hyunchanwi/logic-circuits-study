import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { gptLectureSummaries, gptStudyNotes } from '../src/gpt-study-data.ts';
import { allLectureSummaries, allStudyNotes, weeklyStudyIndex, studyScopeOptions } from '../src/study-data.ts';
import { lectureSummaries } from '../src/lecture-summaries.ts';
import { weeklyCatalog } from '../src/weekly-catalog.ts';

test('6주차 6장·7주차 9장을 실제 catalog·질문·목차와 연결한다', () => {
  assert.deepEqual(weeklyCatalog.map((week) => week.number), [1,2,3,4,5,6,7]);
  assert.deepEqual(weeklyCatalog[5].noteScopes, ['ch6']);
  assert.deepEqual(weeklyCatalog[6].noteScopes, ['ch9']);
  assert.ok(lectureSummaries.every((lecture) => allLectureSummaries.includes(lecture)));
  assert.equal(new Set(allLectureSummaries.map((lecture) => lecture.id)).size, allLectureSummaries.length);
  assert.equal(new Set(allStudyNotes.map((note) => note.id)).size, allStudyNotes.length);
  for (const week of weeklyCatalog) {
    assert.ok(week.lectureIds.every((id) => allLectureSummaries.some((lecture) => lecture.id === id)));
    const index = weeklyStudyIndex(week.number);
    assert.equal(new Set(index.map((item) => item.id)).size, index.length);
    assert.ok(week.lectureIds.every((id) => index.some((item) => item.id === `learning-${id}`)));
  }
  assert.ok(weeklyStudyIndex(7).some((item) => item.keywords.includes('7445')));
  assert.ok(!weeklyStudyIndex(6).some((item) => item.id === 'learning-gpt-logic-ch9-decoder'));
  const page = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(page, /activeWeek <= 5|activeWeek > 5|index < 5|week <= 5/);
  assert.match(page, /weeklyStudyIndex\(activeWeek\)/);
  assert.deepEqual(weeklyStudyIndex(9), []);
});

test('HA·FA 공개 진리표와 두 carry 식을 모든 입력으로 검산한다', () => {
  const arithmetic = gptLectureSummaries.find((lecture) => lecture.id === 'gpt-logic-ch6-arithmetic')!;
  const ha = arithmetic.sections.find((section) => section.title.startsWith('반가산기'))!.table!;
  const fa = arithmetic.sections.find((section) => section.title.startsWith('전가산기'))!.table!;
  assert.equal(ha.rows.length, 4); assert.equal(fa.rows.length, 8);
  for (let a=0; a<2; a++) for (let b=0; b<2; b++) {
    assert.deepEqual(ha.rows[a*2+b].map(Number), [a,b,(a+b)%2,Math.floor((a+b)/2)]);
    for (let c=0; c<2; c++) {
      const carry1 = (a&b) | (a&c) | (b&c);
      const carry2 = (a&b) | ((a^b)&c);
      assert.equal(carry1, carry2);
      assert.deepEqual(fa.rows[a*4+b*2+c].map(Number), [a,b,c,(a+b+c)%2,carry1]);
      assert.equal(a | ((1-a)&c), a | c);
    }
  }
});

test('2의 보수·carry·overflow·계층 디코더 수치와 검색 본문을 확인한다', () => {
  assert.equal(parseInt('10101100',2)-256, -84);
  for (let a=0; a<16; a++) for (let b=0; b<16; b++) {
    const signedA = a<8 ? a : a-16, signedB = b<8 ? b : b-16;
    const sum = signedA+signedB;
    const carryIntoSign = ((a&7)+(b&7))>>3, carryOut = (a+b)>>4;
    assert.equal(Boolean(carryIntoSign^carryOut), sum < -8 || sum > 7);
  }
  for (let input=0; input<16; input++) assert.equal(4*(input>>2)+(input&3), input);
  const text6 = weeklyStudyIndex(6).map((item) => item.keywords).join(' ');
  for (const value of ['-84','carry-out=0','가산·감산 통합 회로 설계','AB+ACin+BCin']) assert.ok(text6.includes(value));
  const text9 = weeklyStudyIndex(7).map((item) => item.keywords).join(' ');
  for (const value of ['p.15','1010~1111','별도 enable 핀이 없다','모든 출력이 HIGH','외부 pull-up','4×2+3','사용자 최신 안내']) assert.ok(text9.includes(value), value);
  for (const lecture of gptLectureSummaries) assert.ok(lecture.scopes.every((scope) => studyScopeOptions.some((item) => item.id === scope)));
  for (const note of gptStudyNotes) assert.ok(note.questionsAsked.length && note.question && note.answer && note.source.startsWith('GPT'));
  assert.doesNotMatch(JSON.stringify(gptLectureSummaries) + JSON.stringify(gptStudyNotes), /\/Users\/|sandbox:|chatgpt-content-reference|threadId|@/);
});
