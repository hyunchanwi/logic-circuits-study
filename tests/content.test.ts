import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const page = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');

test('OT 한 개 자료의 운영 정보와 이후 계획을 구분해 제공한다', () => {
  assert.match(page, /OT 9쪽/);
  assert.match(page, /45/);
  assert.match(page, /지각 3회/);
  assert.match(page, /결석 1\/4 이상/);
  assert.match(page, /Chap 9가 중간고사 전·후 구간에 중복 표기/);
  assert.match(page, /Verilog HDL·프로젝트/);
  assert.match(page, /수업과 LMS 공지를 우선/);
});

test('왼쪽 전체 주차와 오른쪽 현재 주차 목차 구조를 제공한다', () => {
  assert.match(page, /length: 15/);
  assert.match(page, /ALL WEEKS/);
  assert.match(page, /강의자료 대기/);
  assert.match(page, /주차 목차/);
  assert.match(page, /내용을 임의로 만들지 않았습니다/);
});
