import type { LectureSummary } from './lecture-summaries';
import type { studyNotes } from './claude-study-data';

const sourceStatus = 'GPT 학습 대화의 요지를 편집한 정리 / 진리표·검산 예제는 별도 편집 / 원문 대화·손실된 이미지·코드 참조를 복원한 것이 아님';

export const gptLectureSummaries: LectureSummary[] = [
  {
    id: 'gpt-logic-ch4-polarity', scopes: ['ch4'], title: 'GPT 보충 · 4장 enable·게이트 극성·K-map·Don’t Care',
    sources: ['GPT · 논리회로 4장 설명'], location: '4장 p.40~41 설명 요청 / 그 외 세부 페이지·그림 대응 미확인',
    recordingStatus: 'GPT 대화의 학습 요청과 남아 있는 설명을 편집했습니다. p.40~41 이미지 전체를 새로 검증했다는 표시는 아닙니다.', sourceStatus,
    overview: '논리식의 기능, 신호가 활성인 레벨, 최소화에서 허용한 입력 조건을 분리합니다. 그림이 손실된 부분에 원래 게이트 배치를 추정해 붙이지 않습니다.',
    sections: [
      {
        title: 'enable은 동작 허용 조건이며 극성을 먼저 확인한다',
        paragraphs: [
          '일반적인 active HIGH enable E는 E=1일 때 기능을 허용한다. active LOW enable E̅는 핀 전압이 0일 때 허용한다. 변수 이름·버블·진리표의 비활성 행을 함께 읽어야 하며 enable이 언제나 1이어야 켜진다고 외우지 않는다.',
          '예를 들어 active HIGH 출력 2×4 디코더는 E=0일 때 모든 출력 0, E=1일 때 선택 출력 하나만 1이다. active LOW 출력 구현은 선택 출력이 0이고 비선택은 1일 수 있다. 입력 enable 극성과 출력 극성은 독립된 조건이므로 하나의 버블을 모든 신호의 반전으로 해석하지 않는다.',
        ], formula: 'active HIGH enable: 허용 ↔ E=1\nactive LOW enable: 허용 ↔ E̅=0', example: '', code: '',
      },
      {
        title: 'AND·OR의 드모르간 변환과 NAND·NOR 구현',
        paragraphs: [
          '출력 버블은 논리 반전이다. NAND는 AND 결과를 반전하고 NOR는 OR 결과를 반전한다. 드모르간으로 게이트를 바꾸면 AND↔OR 교체와 각 입력·출력의 반전을 함께 추적해야 한다. 버블 하나만 지워 같은 회로라고 하면 기능이 바뀐다.',
          'SOP의 곱항을 NAND로 만든 뒤 NAND로 합치는 2단 NAND-NAND는 두 번 반전되어 원래 SOP를 구현한다. POS는 NOR-NOR와 연결된다. 부울 +는 산술 덧셈이 아니라 OR이고 AB는 AND이므로 보수·흡수 법칙을 산술식처럼 적용하지 않는다.',
        ], formula: '¬(AB)=Ā+B̅\n¬(A+B)=ĀB̅\n¬(¬P·¬Q)=P+Q', example: '편집 확인: F=AB+CD라면 첫 NAND 두 개가 ¬AB·¬CD를 만들고 마지막 NAND가 ¬(¬AB·¬CD)=AB+CD를 만듭니다.', code: '',
      },
      {
        title: 'K-map은 Gray 순서·2의 거듭제곱 묶음으로 최소화한다',
        paragraphs: [
          'K-map의 행·열을 00,01,11,10처럼 Gray 순서로 배치하면 인접한 칸끼리 변수 하나만 다르다. 1,2,4,8,…개 직사각형 묶음을 만들고 묶음 안에서 바뀌는 변수를 지운다. 대각선은 인접이 아니며 양쪽 가장자리는 서로 이어진다.',
          'SOP를 구할 때는 필요한 1을 모두 덮고 확정된 0은 포함하지 않는다. Don’t Care X는 허용 조건에서 출력이 무엇이든 상관없는 입력이라 묶음을 크게 할 때만 1처럼 쓸 수 있다. 모든 X를 반드시 덮거나 모든 회로에서 항상 0으로 고정하지 않는다. POS의 0 묶음은 반대로 생각한다.',
        ], formula: '예: F(A,B,C)=Σm(1,3), d=Σm(5,7)\n1·3·5·7을 묶으면 C가 남음 → F=C (허용된 입력 조건 아래)', example: '이 예제에서 X를 쓰지 않으면 ĀC, X를 쓰면 C로 단순화됩니다. 둘은 확정된 입력의 0·1을 동일하게 만족합니다.', code: '',
      },
      {
        title: 'Don’t Care를 고장·부동 입력·무효 BCD 출력과 섞지 않는다',
        paragraphs: [
          'Don’t Care는 설계 명세의 자유도다. 회로가 모르거나 중간 전압을 출력하라는 뜻이 아니며 물리 핀을 연결하지 않아도 된다는 뜻도 아니다. 실제로 발생할 수 있는 입력의 출력을 X로 임의 지정하면 원래 요구 기능을 잃는다.',
          'BCD 입력 1010~1111이 발생하지 않는다는 명세가 있으면 사용자 회로 최소화에서 Don’t Care로 둘 수 있다. 반면 특정 IC가 그 입력에 보이는 동작은 해당 진리표대로 읽어야 한다. 7442의 무효 BCD에서 활성 출력이 없다는 사실을 임의의 X로 바꾸어 해석하지 않는다.',
        ], formula: '', example: '', code: '',
      },
    ],
  },
  {
    id: 'gpt-logic-ch6-arithmetic', scopes: ['ch6'], title: '6주차 · 6장 디지털 산술·2의 보수·HA·FA·overflow',
    sources: ['GPT · 논리회로 6장 설명', 'GPT · 음수 처리 설명', '최신 6주차 자료 목록·7-1 전사 대조'],
    location: '6장 p.3~12 덧셈·HA/FA, p.13~20 보수·overflow, p.24 carry 전달 / 페이지는 학습 대화 기준',
    recordingStatus: '최신 자료에서 6주차 6장·음수 처리 PDF와 6-2 전사 존재 확인. 7-1 전사 58:50·1:00:18~40에서 가산기·overflow와 감산기 설계 제외를 대조했습니다.', sourceStatus,
    overview: '숫자를 비트열로 표현하는 규칙과 그 비트를 더하는 회로를 연결합니다. 2의 보수 계산·가산기·overflow는 복습에 포함하고 가산·감산 통합 회로 설계는 제외 범위로 따로 둡니다.',
    sections: [
      {
        title: '시험 범위: 산술 계산 포함·감산기 설계 제외',
        paragraphs: [
          '최신 사용자 안내는 Chap 9 p.15까지다. 7-1 전사에서 가산기와 overflow의 중요성 및 감산기 설계 제외를 확인했다. 따라서 6장 전체가 제외된다고 읽지 않는다. 2의 보수로 음수를 읽고 덧셈·뺄셈 값을 검산하는 계산은 이 정리에 포함한다.',
          '가산·감산 통합 회로의 제어 신호·XOR 배선 설계는 제외 항목으로 구분한다. 계산 원리 A-B=A+(-B)를 이해하는 것과 통합 회로를 설계하는 문제는 요구가 다르다. 페이지 경계 p.15는 모호한 전사 문장을 확정한 것이 아니라 사용자 최신 안내로 표시한다.',
        ], formula: '복습 포함: 2의 보수 계산 · HA/FA · 가산기 · carry/overflow\n시험 제외 안내: 가산·감산 통합 회로 설계', example: '', code: '',
      },
      {
        title: '고정 비트 수와 부호 표현 · 10101100은 -84',
        paragraphs: [
          '8비트 2의 보수는 최상위 비트의 가중치가 -128이고 나머지는 64,32,16,8,4,2,1이다. 10101100은 -128+32+8+4=-84다. 같은 비트열을 unsigned로 읽으면 172이므로 비트 수와 해석 규칙을 먼저 적는다.',
          '음수 크기는 전체 비트를 반전하고 1을 더해 구할 수도 있다. 10101100 → 01010011 → 01010100=84다. 맨 앞 1만 지우면 44가 되는데 이는 부호·크기 방식과 혼동한 것이다. n비트 2의 보수 범위는 -2^(n-1)부터 2^(n-1)-1이며 비트 수를 늘릴 때는 부호 확장한다.',
        ], formula: '10101100₂(8비트 signed)=-84\n범위: -128~127\n반전+1: 01010011+1=01010100=84', example: '편집 검산: 5비트 9-4는 01001+11100=1 00101 → 하위 5비트 00101=5입니다. 마지막 carry를 버리는 것과 signed overflow 판정은 별개입니다.', code: '',
      },
      {
        title: '반가산기 HA: 두 입력에서 합과 carry 두 출력을 만든다',
        paragraphs: [
          '반가산기는 A와 B 두 비트를 더해 현재 자리 S와 다음 자리 C를 만든다. A와 B가 서로 다르면 합 비트가 1이므로 S=A⊕B, 둘 다 1일 때만 carry가 생기므로 C=AB다.',
          '1+1=10₂에서 S=0,C=1이다. 이전 낮은 자리에서 넘어오는 carry-in 입력이 없다는 것이 반가산기의 제한이다. 여러 자리 덧셈에서 carry-in을 받아야 하는 자리는 세 입력을 다루는 전가산기로 연결한다.',
        ], formula: 'HA: S=A⊕B, C=AB', example: '', code: '',
        table: { headers: ['A','B','S','C'], rows: [['0','0','0','0'],['0','1','1','0'],['1','0','1','0'],['1','1','0','1']] },
      },
      {
        title: '전가산기 FA: carry-in을 포함해 세 비트를 더한다',
        paragraphs: [
          '입력 A,B,Cin에서 1의 개수가 홀수이면 S=1이고 두 개 이상이면 Cout=1이다. 따라서 S=A⊕B⊕Cin, Cout=AB+ACin+BCin이다. Cin은 낮은 자리에서 넘어온 올림이며 현재 출력 Cout과 같은 신호 이름으로 뭉뚱그리지 않는다.',
          '첫 HA에 A,B를 넣어 X=A⊕B와 C1=AB를 만든다. 둘째 HA에 X,Cin을 넣어 S=X⊕Cin과 C2=XCin을 만든다. 마지막 OR가 Cout=C1+C2를 만든다. 즉 두 HA+OR이며 XOR 2개·AND 2개·OR 1개로 구현할 수 있다.',
        ], formula: 'Cout=AB+(A⊕B)Cin=AB+ACin+BCin', example: '', code: '',
        table: { headers: ['A','B','Cin','S','Cout'], rows: [['0','0','0','0','0'],['0','0','1','1','0'],['0','1','0','1','0'],['0','1','1','0','1'],['1','0','0','1','0'],['1','0','1','0','1'],['1','1','0','0','1'],['1','1','1','1','1']] },
      },
      {
        title: '두 carry 식이 같은 이유 · 흡수법칙을 전개한다',
        paragraphs: [
          'A+ĀC=(A+Ā)(A+C)=1·(A+C)=A+C는 분배법칙과 보수법칙이다. OR의 분배식 X+YZ=(X+Y)(X+Z)를 사용하며 일반 산술 덧셈·곱셈 공식과 혼동하지 않는다.',
          'AB+(A⊕B)Cin을 AB+A B̅ Cin+ĀB Cin으로 전개한다. AB+A B̅ Cin=A(B+B̅ Cin)=A(B+Cin)=AB+ACin이다. 그 뒤 AB+ĀB Cin=B(A+ĀCin)=AB+BCin으로 묶으면 AB+ACin+BCin과 같아진다. 부울 OR에서는 항이 겹쳐도 숫자 2가 생기지 않는다.',
        ], formula: 'A+ĀC=A+C\nAB+ĀBCin=B(A+ĀCin)=B(A+Cin)=AB+BCin', example: '편집 확인: A=B=Cin=1이면 두 carry 식 모두 1이고, S=1이므로 전체 합은 11₂입니다.', code: '',
      },
      {
        title: 'ripple carry와 signed overflow를 구분한다',
        paragraphs: [
          '다중 비트 가산기는 낮은 자리 Cout을 다음 높은 자리 Cin으로 전달한다. A·B 각 자리는 병렬로 들어와도 carry는 단계별 지연을 가질 수 있다. 병렬가산기라는 이름이 모든 carry가 동시에 확정된다는 뜻은 아니다.',
          'carry-out은 비트 폭 밖의 올림이고 signed overflow는 부호 표현 범위를 넘은 것이다. 같은 부호 두 수의 합에서 결과 부호가 바뀌면 overflow다. 4비트 0111+0001=1000은 carry-out=0이어도 +8을 표현할 수 없어 overflow다. 1111+0001=1 0000은 -1+1=0이라 carry-out=1이어도 signed overflow가 없다.',
          '부호 비트로 들어가는 carry와 나오는 carry의 XOR로 V를 구할 수 있다. 표기 번호는 자료마다 다르므로 C6·C7 같은 첨자만 암기하지 말고 두 carry의 위치를 확인한다. 서로 다른 부호끼리 더하면 일반적인 2의 보수 덧셈에서는 signed overflow가 발생하지 않는다.',
        ], formula: 'V = carry_into_sign XOR carry_out_of_sign\n같은 부호 + 같은 부호 → 다른 부호이면 overflow', example: '편집 검산: 8비트 01111111+00000001=10000000은 127+1이 범위를 넘어 overflow입니다.', code: '',
      },
    ],
  },
  {
    id: 'gpt-logic-ch9-decoder', scopes: ['ch9'], title: '7주차 · 9장 p.1~15 디코더·BCD·active LOW·계층 확장',
    sources: ['GPT · 9장 설명', 'GPT · 논리회로 중간고사 대비', '9장 PDF p.13·15 직접 이미지 대조', '최신 7주차 자료 목록·7-1 전사'],
    location: '7주차 9장 PDF p.1~15 / p.13·15 원본 이미지 확인, 나머지 세부 도식은 학습 대화 기준',
    recordingStatus: '7주차 폴더의 9장·7-1 전사를 확인. p.15까지라는 경계는 사용자 최신 안내입니다. p.13 7442와 p.15 7445 이미지는 확인했지만 전체 장을 모두 이미지 검증한 것은 아닙니다.',
    sourceStatus: `${sourceStatus} / p.13·15만 원본 이미지 대조 완료, 소자 동작 설명 보충은 원본 문구와 구분`,
    overview: '9장은 9주차가 아니라 7주차 자료입니다. 비트 가중치 → 선택 출력 → 극성 → enable 계층 → 실제 IC의 조건 순서로 읽습니다. 복습 경계는 p.15입니다.',
    sections: [
      {
        title: '디코더는 이진 코드를 선택 출력으로 푼다',
        paragraphs: [
          'n비트 이진 입력을 최대 2^n개의 출력 중 하나의 선택으로 바꾸는 회로가 디코더다. 일반적인 2×4에서는 두 입력의 네 조합 00,01,10,11이 d0,d1,d2,d3에 각각 대응한다. 출력이 active HIGH면 선택선 하나가 1이고 active LOW면 선택선 하나가 0이다.',
          '입력의 MSB·LSB는 알파벳 순서가 아니라 도면의 정의와 가중치로 판단한다. BA에서 B가 2의 자리·A가 1의 자리라면 BA=10은 d2다. DCBA에서 D가 8의 자리이면 DCBA=1001은 십진 9다. 이름만 보고 ABCD가 항상 MSB→LSB라고 정하지 않는다.',
        ], formula: '2×4 (active HIGH, E=1):\nd0=B̅Ā · d1=B̅A · d2=BĀ · d3=BA', example: '', code: '',
        table: { headers: ['BA','값','선택 출력'], rows: [['00','0','d0'],['01','1','d1'],['10','2','d2'],['11','3','d3']] },
      },
      {
        title: 'BCD-10진 디코더와 7442 active LOW · p.13',
        paragraphs: [
          '원본 p.13에서 7442는 DCBA 네 입력으로 10개의 출력을 선택한다. 유효 BCD 0000~1001에서 대응 출력 하나만 LOW이고 나머지는 HIGH다. 출력 기호의 버블과 진리표 0은 선택되지 않았다는 표시가 아니라 선택 활성일 수 있다.',
          '7442는 별도 enable 핀이 없다. 1010~1111은 유효한 한 자리 BCD가 아니며 이 입력에서는 모든 출력이 HIGH여서 활성 출력이 없다. 일반적인 enable 있는 2×4 계층 설계를 7442에 그대로 대응시키거나 무효 BCD를 정상적인 d10~d15 선택으로 읽지 않는다.',
        ], formula: 'DCBA=0101(5) → d5=LOW, 나머지 HIGH\nDCBA=1011(무효 BCD) → 모든 출력 HIGH', example: '원본 확인 범위는 p.13의 진리표·단자입니다. 유효 입력과 선택선의 관계를 아래 편집 요약표로 다시 적었습니다.', code: '',
        table: { headers: ['입력 DCBA','유효성','7442 활성 출력'], rows: [['0000','BCD 0','d0만 LOW'],['1001','BCD 9','d9만 LOW'],['1010~1111','무효 BCD','없음 · 모두 HIGH']] },
      },
      {
        title: '2×4 다섯 개로 4×16 구성 · p.14 학습 질문',
        paragraphs: [
          '일반적인 active HIGH enable·출력을 가진 2×4 디코더를 가정한다. 첫 단계 1개는 상위 x3x2를 4개의 그룹 선택선 E0~E3으로 디코딩한다. 둘째 단계 4개는 공통 하위 x1x0를 각각 4개 출력으로 디코딩하되 자기 그룹 enable이 1일 때만 작동한다. 합계는 1+4=5개다.',
          '1011을 나누면 상위 10은 십진 그룹 2, 하위 11은 그룹 안 3번이다. 첫 단계가 E2=1을 만들어 두 번째 단계의 그룹2만 허용하므로 최종 d(4×2+3)=d11이 활성이다. 10 자체는 2비트 입력값이지 enable 한 선이 아니다. 실제 칩의 enable·출력 극성이 다르면 반전·연결 조건을 그 도면에 맞춰 바꿔야 한다.',
        ], formula: 'x3x2=10 → [E0,E1,E2,E3]=[0,0,1,0]\nx1x0=11 → 그룹2 안의 3번 → d11\n출력 번호 = 4×상위 그룹 + 하위 번호', example: '여기의 enable 모델은 일반적인 계층 구성의 편집 설명입니다. 별도 enable 없는 7442 구현이라고 표시하지 않습니다.', code: '',
        table: { headers: ['신호','폭','1011에서 값·역할'], rows: [['x3x2','2비트','10 → 그룹 번호 2'],['E2','1비트','1 → 그룹2 허용'],['x1x0','2비트','11 → 그룹 내 번호 3'],['d11','1비트','선택 출력']] },
      },
      {
        title: '7445 decoder/driver·open collector · p.15 복습 경계',
        paragraphs: [
          '원본 p.15는 7445의 open-collector 출력과 decoder/driver·카운터 응용을 보여 준다. 선택 출력의 트랜지스터가 켜지면 부하 전류를 LOW 쪽으로 흘리는 역할을 하며, 꺼졌을 때 HIGH 전압은 외부 pull-up·부하·전원 조건으로 결정된다. IC가 HIGH를 능동적으로 30V 출력한다고 해석하지 않는다.',
          '슬라이드의 80mA·30V 표기는 소자 조건·정격에 관한 원본 표시다. 이 수치를 모든 출력에서 동시에 보장되는 동작점이나 설계 목표로 일반화하지 않는다. 이 문단의 전류 흡수·차단·외부 부하 설명은 이해를 돕기 위한 보충이며 실제 설계에는 해당 소자의 동작 조건을 별도 확인해야 한다.',
          '카운터의 BCD 출력은 디코더 입력으로, 선택 출력은 해당 부하 구동으로 이어진다. 원본을 확인한 p.15까지가 이번 복습 경계다. 그 뒤 페이지의 회로·응용을 최신 중간고사 범위로 확대하지 않는다.',
        ], formula: '선택 LOW → 출력 트랜지스터 ON → 전류 흡수\n비선택·차단 → 외부 pull-up/load가 전압 결정', example: '', code: '',
      },
    ],
  },
];

export const gptStudyNotes: (typeof studyNotes)[number][] = [
  {
    id: 'gpt-logic-q-ch4', scopes: ['ch4'], chapter: '4장', title: 'p.40~41을 시각적으로 다시 읽기·Don’t Care 주의',
    source: 'GPT · 논리회로 4장 설명', location: '4장 p.40~41 설명·시각화 요청 / 원래 도식 전체 재대조 전',
    questionsAsked: ['4장 40페이지를 더 자세히 설명하고 그림·수식을 SVG나 간단한 HTML로 보여 달라고 요청했다.', '41페이지 설명을 요청했다.'],
    explanation: ['위 요청은 실제 질문 요지다. 이 페이지의 정확한 원본 도식은 현재 확인 범위에서 단정하지 않으며 enable·극성·K-map 보충 설명은 별도 재구성이다.', 'Don’t Care는 최소화에서 선택할 수 있는 자유도이고 활성 LOW 출력이나 부동 입력과 같은 뜻이 아니다. enable의 활성 레벨과 선택 출력의 활성 레벨도 따로 읽는다.'],
    question: 'SOP K-map에서 모든 X를 반드시 1로 묶어야 하는가?', answer: '아니다. 확정된 1을 모두 덮되 0을 포함하지 않고, 도움이 되는 X만 사용할 수 있다. 이 문제는 실제 질문 원문이 아닌 편집 확인 문제다.',
  },
  {
    id: 'gpt-logic-q-fa', scopes: ['ch6'], chapter: '6장 p.10~12', title: 'FA carry 식이 왜 두 가지인가?',
    source: 'GPT · 음수 처리 설명', location: '전가산기 식 동치·흡수법칙 질문',
    questionsAsked: ['전가산기는 BC+AC+AB인데 AB+(A⊕B)Cin 식과 왜 다른지 물었다.', 'A+ĀCin의 인수분해와 AB+ĀBCin=AB+BCin이 되는 이유를 물었다.'],
    explanation: ['FA의 carry는 세 입력 중 둘 이상이 1이면 1이다. AB+(A⊕B)Cin은 두 HA의 carry를 OR한 형태이며 AB+ACin+BCin과 같은 8행 진리표를 갖는다.', 'A+ĀC=(A+Ā)(A+C)=A+C는 부울 분배·보수법칙이다. 앞에 B가 붙으면 AB+ĀBC=B(A+ĀC)=B(A+C)=AB+BC다. 부울 +는 OR다.'],
    question: 'A=1,B=0,Cin=1이면 S와 Cout은?', answer: 'S=0,Cout=1이다. 1+0+1=10₂이며 두 carry 식에서 같은 결과가 나온다.',
  },
  {
    id: 'gpt-logic-q-scope', scopes: ['ch6','ch9'], chapter: '최신 중간고사 범위', title: 'Chap 9 p.15까지·6장 일부 제외를 분리하기',
    source: 'GPT · 논리회로 중간고사 대비 / 사용자 최신 안내·7-1 전사 대조', location: '9장 p.15 사용자 안내 / 7-1 전사 58:50·1:00:18~40',
    questionsAsked: ['교수님 안내가 Chap 9 15페이지까지이고 Chap 6 일부는 제외라며 녹음을 참고해 달라고 했다.', '6장 파일을 실제로 불러와 확인해 달라고 요청했다.'],
    explanation: ['최신 자료 목록에서 6주차의 디지털 산술 6장 PDF와 음수 처리 자료를 확인했다. 파일이 없다는 과거 답변을 그대로 유지하지 않는다.', '전사 대조에서 감산기 설계 제외와 가산기·overflow를 구분했다. 2의 보수 계산·HA/FA·overflow는 복습에 포함하고 가산·감산 통합 회로 설계는 제외로 표시한다. Chap9 p.15 경계는 사용자 안내이며 전사 끝의 모호한 페이지 발언을 확정한 것이 아니다.'],
    question: '감산기 설계 제외라면 2의 보수로 -84를 읽거나 carry와 overflow를 구별하는 공부도 제외되는가?', answer: '아니다. 산술 계산·가산기·overflow와 통합 회로 설계를 분리한다. 8비트 10101100은 -84이고 carry-out만으로 signed overflow를 판정하지 않는다.',
  },
  {
    id: 'gpt-logic-q-enable', scopes: ['ch9'], chapter: '9장 p.14', title: '1011에서 10이 enable 자체인가?',
    source: 'GPT · 9장 설명', location: '4×16 계층 디코더·상위/하위 비트 질문',
    questionsAsked: ['14페이지를 더 자세하고 이해하기 쉽게 설명해 달라고 했다.', '입력이 1011이면 10이 enable이라는 뜻인지 물었다.', '다른 디코더의 A,B,C,D와 비교해 MSB·LSB 순서가 반대인지 물었다.'],
    explanation: ['상위 10은 어느 그룹을 허용할지 정하는 2비트 값이다. 첫 디코더가 이 값을 E2라는 1비트 선택선으로 바꾸어 그룹2의 enable에 보낸다.', '하위 11은 그 그룹 안의 3번을 골라 d11을 만든다. x3x2x1x0의 가중치는 8,4,2,1이다. 알파벳 순서로 가중치를 정하지 말고 도면의 BA·CBA·DCBA·x3x2x1x0 정의를 따른다.'],
    question: '1101이면 그룹과 그룹 내 번호·최종 출력은?', answer: '상위 11은 그룹3, 하위 01은 번호1, 최종 d(4×3+1)=d13이다. 일반적인 활성 HIGH 계층 모델의 편집 확인 문제다.',
  },
  {
    id: 'gpt-logic-q-bcd', scopes: ['ch9'], chapter: '9장 p.13~15', title: 'BCD 디코더부터 다시·선택 LOW와 driver',
    source: 'GPT · 9장 설명 / 9장 p.13·15 이미지 대조', location: '7442·7445 · 실제 질문은 BCD 설명 재시작 요청',
    questionsAsked: ['BCD-10진 디코더부터 다시 설명해 달라고 요청했다.'],
    explanation: ['7442는 유효 BCD 입력에서 대응 출력 하나만 LOW다. 별도 enable 핀이 없고 1010~1111에서는 활성 출력이 없다. 아래 확인 문제의 IC 수치·무효 입력 질문을 사용자의 실제 질문으로 꾸미지 않는다.', '7445의 open collector는 출력 트랜지스터의 전류 흡수·차단 상태를 뜻한다. p.15의 80mA·30V 표기가 HIGH를 30V로 능동 생성한다는 뜻은 아니며 외부 부하·전원·동작 조건을 구분한다.'],
    question: '7442에서 1011이 들어오면 d11이 LOW가 되는가? 7445는 HIGH를 능동 30V로 출력하는가?', answer: '둘 다 아니다. 7442에는 d0~d9만 있고 무효 BCD에서는 모두 HIGH다. 7445의 차단 출력 전압은 외부 pull-up·부하에 달리며 정격과 출력 동작을 혼동하면 안 된다.',
  },
];

export const gptScopeOptions = [
  { id: 'ch6', label: '6장 · 디지털 산술·음수 처리' },
  { id: 'ch9', label: '9장 · p.1~15 디코더' },
];
