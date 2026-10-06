import assert from 'node:assert/strict';
import test from 'node:test';
import { weeklyCatalog, weeklyLectureSummaries } from '../src/weekly-catalog.ts';
import { lectureSummaries } from '../src/lecture-summaries.ts';
import { studyNotes } from '../src/claude-study-data.ts';

const summaries = [...lectureSummaries, ...weeklyLectureSummaries];

test('1~5주차는 실제 자료에 연결되고 모든 정리 ID가 존재한다', () => {
  assert.deepEqual(weeklyCatalog.map((week) => week.number), [1, 2, 3, 4, 5]);
  for (const week of weeklyCatalog) {
    assert.ok(week.materials.length > 0);
    assert.ok(week.evidence.length > 20);
    assert.ok(week.lectureIds.length > 0);
    assert.ok(week.lectureIds.every((id) => summaries.some((summary) => summary.id === id)));
    assert.ok(week.noteScopes.every((scope) => studyNotes.some((note) => note.scopes.includes(scope))));
  }
});

test('5주차는 순차회로 5장이 아니라 조합회로 4장의 계속 학습이다', () => {
  assert.deepEqual(weeklyCatalog[4].noteScopes, ['ch4']);
  assert.deepEqual(weeklyCatalog[4].lectureIds, ['logic-combinational']);
});
