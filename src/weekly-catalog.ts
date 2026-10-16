import type { LectureSummary } from './lecture-summaries';

export const weeklyCatalog = [
  {
    "number": 1,
    "title": "OT · 디지털 기초",
    "summary": "1장 · 신호·주기·전송·기억",
    "lectureIds": [
      "logic-digital"
    ],
    "noteScopes": [
      "ch1"
    ],
    "materials": [
      "1주차/논리회로_OT_2026.pdf",
      "1주차/논리회로 1장.pdf"
    ],
    "evidence": "1주차 실제 폴더에 OT와 1장이 함께 있습니다. 기존 OT 본문과 1장 학습 정리를 함께 제공합니다."
  },
  {
    "number": 2,
    "title": "수 체계와 코드",
    "summary": "2장 · 진수·BCD·Gray·패리티",
    "lectureIds": [
      "logic-codes"
    ],
    "noteScopes": [
      "ch2"
    ],
    "materials": [
      "2주차/수의 체계.pdf",
      "2주차/논리회로 2장 (1).pdf"
    ],
    "evidence": "2주차 폴더와 전사본을 기준으로 연결합니다. 텍스트가 없는 그림·페이지는 이미지 재검증을 했다고 표시하지 않습니다."
  },
  {
    "number": 3,
    "title": "게이트와 부울대수",
    "summary": "3장 · 회로 묘사·NAND·NOR",
    "lectureIds": [
      "logic-gates"
    ],
    "noteScopes": [
      "ch3"
    ],
    "materials": [
      "3주차/논리회로 3장 (3).pdf"
    ],
    "evidence": "3주차 폴더와 3-1·3-2 전사본을 기준으로 기존 Chapter3 학습 대화를 연결합니다."
  },
  {
    "number": 4,
    "title": "조합회로 설계와 최소화",
    "summary": "4장 · 진리표·SOP·POS·K-map",
    "lectureIds": [
      "logic-combinational",
      "gpt-logic-ch4-polarity"
    ],
    "noteScopes": [
      "ch4"
    ],
    "materials": [
      "4주차/논리회로 4장 (1).pdf"
    ],
    "evidence": "4주차 폴더의 4장 자료에 연결합니다. 전체 장 정리는 복습 범위이며 해당 주에 모든 항목을 수업했다는 의미는 아닙니다."
  },
  {
    "number": 5,
    "title": "조합회로 설계·K-map 계속",
    "summary": "4장 연속 수업 · 5주차 전사본",
    "lectureIds": [
      "logic-combinational",
      "gpt-logic-ch4-polarity"
    ],
    "noteScopes": [
      "ch4"
    ],
    "materials": [
      "4주차/논리회로 4장 (1).pdf (연속 수업)",
      "5주차/논리회로 5-2_original.txt",
      "5주차/논리회로5-2(2)_original.txt"
    ],
    "evidence": "5주차에는 별도 PDF가 없지만 전사본에 4장 예제·진리표→SOP·K-map 묶기가 있습니다. 5주차를 5장 플립플롭으로 바꾸지 않고 4장의 연속 학습으로 연결합니다."
  },
  {
    "number": 6,
    "title": "디지털 산술과 음수 처리",
    "summary": "6장 · 2의 보수·HA/FA·carry·overflow",
    "lectureIds": ["gpt-logic-ch6-arithmetic"],
    "noteScopes": ["ch6"],
    "materials": ["6주차/논리회로 6장.pdf", "6주차/수의 체계-음수의 처리 (1) (1).pdf", "논리회로 6-2 전사본"],
    "evidence": "최신 6주차 자료 목록에서 6장·음수 처리와 6-2 전사를 확인했습니다. 7-1 전사에서 가산기·overflow 및 감산기 설계 제외를 대조하여 산술 계산과 통합 회로 설계를 구분합니다."
  },
  {
    "number": 7,
    "title": "MSI 디코더와 계층 확장",
    "summary": "9장 p.1~15 · BCD·active LOW·7442·7445",
    "lectureIds": ["gpt-logic-ch9-decoder"],
    "noteScopes": ["ch9"],
    "materials": ["7주차/논리회로 9장.pdf", "7주차/논리회로 7-1 전사본"],
    "evidence": "7주차 폴더에 있는 9장을 연결합니다. 9장을 9주차로 추정하지 않습니다. p.15까지는 사용자 최신 시험 안내이며 p.13·15는 원본 이미지를 대조했습니다. 일반 enable 계층과 7442·7445 실제 IC 조건을 구분합니다."
  }
];

export const weeklyLectureSummaries: LectureSummary[] = [];

