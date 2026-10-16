import assert from 'node:assert/strict';
import test from 'node:test';
import { lectureSummaries } from '../src/lecture-summaries.ts';

void test('K-map 8칸·XOR 정규형·2차원 패리티의 표와 계산이 일치한다', () => {
  const all = lectureSummaries.flatMap((lecture) => lecture.sections);
  const kmap = all.find((s) => s.title === 'K-map 배치·감싸기·묶기')!;
  assert.equal(kmap.table!.rows.flatMap((r) => r.slice(1)).filter((v) => v.includes('*')).length, 8);
  assert.match(kmap.example, /2×4=8칸/);
  const xor = all.find((s) => s.title === 'SOP·POS·정규형')!;
  assert.equal(xor.table!.rows.length, 4);
  for (const row of xor.table!.rows) {
    const [a, b, f] = row.map(Number);
    assert.equal(a ^ b, f);
    assert.equal(Number(Boolean((a || b) && (!a || !b))), f);
  }
  const parity = all.find((s) => s.title.startsWith('2차원 패리티'))!;
  const bits = parity.table!.rows.map((r) => r.slice(1).map((v) => Number(v[0])));
  for (const r of bits) assert.equal(r.reduce((a,b) => a ^ b, 0), 0);
  for (let c=0; c<3; c++) assert.equal(bits.reduce((a,r) => a ^ r[c], 0), 0);
  bits[0][1] ^= 1;
  assert.deepEqual(bits.map((r) => r.reduce((a,b) => a ^ b, 0)), [1,0,0]);
  assert.deepEqual([0,1,2].map((c) => bits.reduce((a,r) => a ^ r[c], 0)), [0,1,0]);
});
