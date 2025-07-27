---
date: "2025-06-24"
title: "AWS TechCamp 2025"
categories: ["AWS", "Serverless", "AI", "Lambda", "DynamoDB"]
summary: "AWS 서버리스 서비스를 활용한 웹 애플리케이션 구축과 AI Agent 개발 실습"
thumbnail: ./thumbnail-image.png
publicURL: https://kyong-dev.github.io
---

# '제목'

## AWS TechCamp [기초 과정] 서버리스로 가속하는 현대적 웹 애플리케이션 구현 - 2025년 6월 24일 (화) 14:00PM - 17:00PM

#### [실습 URL](https://regular-hydrogen-f86.notion.site/Day1-14-00-17-00-KST-21a2bb5207f1808f9780c389533a95e8)

- [\*\*AWS Lambda](https://aws.amazon.com/ko/lambda/faqs/)(람다)\*\*: 서버리스 함수 실행
- [\*\*Amazon DynamoDB](https://aws.amazon.com/ko/dynamodb/faqs/)(다이내모DB)\*\*: 완전관리형 NoSQL 데이터베이스
- [**Amazon API Gateway**](https://aws.amazon.com/ko/api-gateway/faqs/): REST API 생성 및 관리
- [**Amazon S3**](https://aws.amazon.com/ko/s3/faqs/): 정적 웹사이트 호스팅
- [**Amazon Q Developer**](https://aws.amazon.com/q/?trk=4ca3bac1-348e-45e6-b2fc-95a7c76f8906&sc_channel=ps&ef_id=Cj0KCQjw097CBhDIARIsAJ3-nxc9iwmL3Lay4A0G70uLS0oOCw66bjd5F2baUti5yOzhD-1_1zYO2XcaAipZEALw_wcB:G:s&s_kwcid=AL!4422!3!692062155728!p!!g!!amazon%20q!21058131100!157173585537&gad_campaignid=21058131100&gbraid=0AAAAADjHtp_2e8aoI0VFqp6hpgSe95r5r&gclid=Cj0KCQjw097CBhDIARIsAJ3-nxc9iwmL3Lay4A0G70uLS0oOCw66bjd5F2baUti5yOzhD-1_1zYO2XcaAipZEALw_wcB): Lambda 함수 에디터에서 코드 자동완성 기능 제공 / [Using Amazon Q Developer with AWS Lambda](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/lambda-setup.html)

API Gateway & Lambda & DynamoDB를 활용해 백엔드 서버를 구축하지 않고 CRUD 엔드포인트를 구현하고 S3 버킷을 활용해 static 홈페이지를 호스팅 하는 실습을 제공

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Member Management Demo</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@cloudscape-design/components/styles.css"
    />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <style>
      body {
        font-family: "Amazon Ember", "Helvetica Neue", Roboto, Arial, sans-serif;
        margin: 0;
        background-color: #fafafa;
      }
      .awsui-app-layout {
        min-height: 100vh;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
      .awsui-header {
        padding: 20px 0;
        margin-bottom: 20px;
      }
      .awsui-container {
        background: white;
        border: 1px solid #e9ebed;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
      }
      .awsui-form-field {
        margin-bottom: 16px;
      }
      .awsui-form-field label {
        display: block;
        font-weight: 700;
        margin-bottom: 4px;
        color: #16191f;
      }
      .awsui-form-field .description {
        font-size: 12px;
        color: #5f6b7a;
        margin-bottom: 8px;
      }
      .awsui-input,
      .awsui-select {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #879596;
        border-radius: 8px;
        font-size: 14px;
        box-sizing: border-box;
      }
      .awsui-button {
        background: #ff9900;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 8px;
        margin-right: 8px;
        cursor: pointer;
        font-size: 14px;
      }
      .awsui-button:hover {
        background: #e88b00;
      }
      .awsui-button.primary {
        background: #ff9900;
      }
      .awsui-button:disabled {
        background: #e9ebed;
        color: #5f6b7a;
        cursor: not-allowed;
      }
      .awsui-alert {
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 16px;
        border-left: 4px solid;
      }
      .awsui-alert.success {
        background: #f0f8ff;
        border-color: #0972d3;
        color: #0972d3;
      }
      .awsui-alert.error {
        background: #fdf2f2;
        border-color: #d91515;
        color: #d91515;
      }
      .awsui-alert.warning {
        background: #fffbf0;
        border-color: #ff9900;
        color: #ff9900;
      }
      .result-container {
        background: #232f3e;
        color: #ffffff;
        padding: 16px;
        border-radius: 8px;
        font-family: "Monaco", "Courier New", monospace;
        white-space: pre-wrap;
        overflow-x: auto;
      }
      .powered-by {
        text-align: center;
        color: #5f6b7a;
        margin-top: 20px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="awsui-header">
        <h1>Member Management Demo</h1>
      </div>

      <div id="alert-container"></div>

      <div class="awsui-container">
        <h2>Search Criteria</h2>
        <div class="awsui-form-field">
          <label>Group ID</label>
          <div class="description">Enter the ID of the group to query</div>
          <input
            type="text"
            id="groupId"
            class="awsui-input"
            placeholder="Group ID"
          />
        </div>
        <div class="awsui-form-field">
          <label>Member Name</label>
          <div class="description">Used when querying specific members</div>
          <input
            type="text"
            id="memberName"
            class="awsui-input"
            placeholder="Member Name"
          />
        </div>
        <div class="awsui-form-field">
          <label>Status</label>
          <div class="description">Select the activation status of members</div>
          <select id="status" class="awsui-select">
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div class="awsui-container">
        <h2>API Operations</h2>
        <button class="awsui-button primary" onclick="createMember()">
          Create Member
        </button>
        <button class="awsui-button" onclick="getAllMembers()">
          Get All Members
        </button>
        <button class="awsui-button" onclick="getMemberByName()">
          Get Member by Name
        </button>
        <button class="awsui-button" onclick="getMembersByStatus()">
          Get Members by Status
        </button>
      </div>

      <div id="result-container" style="display: none;" class="awsui-container">
        <h2>API Response</h2>
        <div id="result" class="result-container"></div>
      </div>

      <div class="awsui-container">
        <div
          style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;"
        >
          <h2>User Guide</h2>
          <button
            class="awsui-button"
            onclick="toggleLanguage()"
            id="lang-toggle"
          >
            한국어
          </button>
        </div>
        <div id="guide-content">
          <div style="margin-bottom: 15px;">
            <strong>1. Create Member (POST)</strong><br />
            • Group ID and Member Name input required<br />
            • Creates a new member
          </div>
          <div style="margin-bottom: 15px;">
            <strong>2. Get All Members</strong><br />
            • Group ID input required<br />
            • Retrieves all members in the group
          </div>
          <div style="margin-bottom: 15px;">
            <strong>3. Get Member by Name</strong><br />
            • Group ID and Member Name input required<br />
            • Retrieves a specific member within a specific group
          </div>
          <div style="margin-bottom: 15px;">
            <strong>4. Get Members by Status</strong><br />
            • Group ID and Status selection required<br />
            • Retrieves members by status within a specific group
            (active/inactive)
          </div>
        </div>
      </div>

      <div class="powered-by">
        <img
          src="https://d0.awsstatic.com/logos/powered-by-aws.png"
          alt="Powered by AWS"
          style="height: 40px;"
        />
      </div>
    </div>

    <script>
      const baseUrl = "<API GATEWAY 주소로 치환>";
      let loading = false;

      function showAlert(type, message) {
        const alertContainer = document.getElementById("alert-container");
        alertContainer.innerHTML = `
                <div class="awsui-alert ${type}">
                    ${message}
                    <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; cursor: pointer;">×</button>
                </div>
            `;
      }

      function setLoading(isLoading) {
        loading = isLoading;
        const buttons = document.querySelectorAll(
          ".awsui-button:not(#lang-toggle)"
        );
        buttons.forEach((btn) => {
          btn.disabled = isLoading;
        });
      }

      async function handleApiCall(type, url) {
        document.getElementById("alert-container").innerHTML = "";

        try {
          const response = await $.ajax({
            type: type,
            url: url,
            dataType: "json",
          });
          document.getElementById("result").textContent = JSON.stringify(
            response,
            null,
            2
          );
          document.getElementById("result-container").style.display = "block";
          showAlert("success", "API call was successful.");
        } catch (error) {
          document.getElementById(
            "result"
          ).textContent = `ERROR: ${JSON.stringify(error, null, 2)}`;
          document.getElementById("result-container").style.display = "block";
          showAlert("error", "An error occurred during API call.");
        } finally {
          setLoading(false);
        }
      }

      function createMember() {
        const groupId = document.getElementById("groupId").value;
        const memberName = document.getElementById("memberName").value;
        const status = document.getElementById("status").value;
        if (!groupId || !memberName || !status) {
          showAlert(
            "warning",
            "Please enter Group ID, Member Name and Status."
          );
          return;
        }

        document.getElementById("alert-container").innerHTML = "";
        setLoading(true);

        $.ajax({
          type: "POST",
          url: `${baseUrl}/members/${groupId}?name=${memberName}&status=${status}`,
          contentType: "application/json",
          dataType: "json",
          success: function (data) {
            document.getElementById("result").textContent = JSON.stringify(
              data,
              null,
              2
            );
            document.getElementById("result-container").style.display = "block";
            showAlert("success", "Member created successfully.");
          },
          error: function (error) {
            document.getElementById(
              "result"
            ).textContent = `ERROR: ${JSON.stringify(error, null, 2)}`;
            document.getElementById("result-container").style.display = "block";
            showAlert("error", "Failed to create member.");
          },
          complete: function () {
            setLoading(false);
          },
        });
      }

      function getAllMembers() {
        const groupId = document.getElementById("groupId").value;
        if (!groupId) {
          showAlert("warning", "Please enter Group ID.");
          return;
        }
        handleApiCall("GET", `${baseUrl}/members/${groupId}`);
      }

      function getMemberByName() {
        const groupId = document.getElementById("groupId").value;
        const memberName = document.getElementById("memberName").value;
        if (!groupId || !memberName) {
          showAlert("warning", "Please enter Group ID and Member Name.");
          return;
        }
        handleApiCall(
          "GET",
          `${baseUrl}/members/${groupId}?name=${memberName}`
        );
      }

      function getMembersByStatus() {
        const groupId = document.getElementById("groupId").value;
        const status = document.getElementById("status").value;
        if (!groupId || !status) {
          showAlert("warning", "Please enter Group ID and select Status.");
          return;
        }
        handleApiCall("GET", `${baseUrl}/members/${groupId}?status=${status}`);
      }

      let isKorean = false;

      function toggleLanguage() {
        const guideContent = document.getElementById("guide-content");
        const langToggle = document.getElementById("lang-toggle");

        if (isKorean) {
          guideContent.innerHTML = `
                    <div style="margin-bottom: 15px;">
                        <strong>1. Create Member (POST)</strong><br>
                        • Group ID and Member Name input required<br>
                        • Creates a new member
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong>2. Get All Members</strong><br>
                        • Group ID input required<br>
                        • Retrieves all members in the group
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong>3. Get Member by Name</strong><br>
                        • Group ID and Member Name input required<br>
                        • Retrieves a specific member within a specific group
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong>4. Get Members by Status</strong><br>
                        • Group ID and Status selection required<br>
                        • Retrieves members by status within a specific group (active/inactive)
                    </div>
                `;
          langToggle.textContent = "한국어";
          isKorean = false;
        } else {
          guideContent.innerHTML = `
                    <div style="margin-bottom: 15px;">
                        <strong>1. Create Member (POST)</strong><br>
                        • Group ID와 Member Name 입력 필수<br>
                        • 새로운 멤버를 생성합니다
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong>2. Get All Members</strong><br>
                        • Group ID 입력 필수<br>
                        • 해당 그룹의 모든 멤버를 조회합니다
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong>3. Get Member by Name</strong><br>
                        • Group ID와 Member Name 입력 필수<br>
                        • 특정 그룹 내 특정 멤버를 조회합니다
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong>4. Get Members by Status</strong><br>
                        • Group ID와 Status 선택 필수<br>
                        • 특정 그룹 내 상태별 멤버들을 조회합니다 (active/inactive)
                    </div>
                `;
          langToggle.textContent = "English";
          isKorean = true;
        }
      }

      function getAllMembers() {
        const groupId = document.getElementById("groupId").value;
        if (!groupId) {
          showAlert("warning", "Please enter Group ID.");
          return;
        }
        handleApiCall("GET", `${baseUrl}/members/${groupId}`);
      }

      function getMemberByName() {
        const groupId = document.getElementById("groupId").value;
        const memberName = document.getElementById("memberName").value;
        if (!groupId || !memberName) {
          showAlert("warning", "Please enter Group ID and Member Name.");
          return;
        }
        handleApiCall(
          "GET",
          `${baseUrl}/members/${groupId}?name=${memberName}`
        );
      }

      function getMembersByStatus() {
        const groupId = document.getElementById("groupId").value;
        const status = document.getElementById("status").value;
        if (!groupId || !status) {
          showAlert("warning", "Please enter Group ID and select Status.");
          return;
        }
        handleApiCall("GET", `${baseUrl}/members/${groupId}?status=${status}`);
      }
    </script>
  </body>
</html>
```

## AWS TechCamp [기본 과정] 손쉬운 Agent 조합으로 복잡한 문제를 해결하는 자비스(스마트 비서) 만들기 - 2025년 6월 25일 (수) 09:00AM - 12:00PM

#### [실습 URL](https://catalog.us-east-1.prod.workshops.aws/workshops/c68a2fb4-8b25-480f-ab0b-129778f96d4d/ko-KR)

### Amazon Bedrock Multi-Agent 마케팅 인사이트 시스템 구축

## 개요

자동차 마케팅 의사결정을 지원하는 Multi-Agent Collaboration 시스템 구축

## 실습 구성

### 실습 1: 제품 인사이트 에이전트 구성

**목표**: 단일 에이전트로 제품 인사이트 에이전트 구축

**주요 작업**:

- Knowledge Base 구축을 위한 데이터 업로드
- Amazon Bedrock Knowledge Base 생성
- 제품 인사이트 에이전트 생성 및 Knowledge Base 연결

**학습 목표**:
자동차 관련 마케팅 의사결정을 지원하는 지능형 에이전트 구축. 자동차 일반 정보와 고객 만족도 데이터를 활용하여 제품 핵심 정보 제공. 단일 에이전트 접근법의 장단점 이해 및 Multi-Agent Collaboration 필요성 체감.

---

### 실습 2: 산업 분석 에이전트 구성

**목표**: Multi-Agent Collaboration과 웹 검색 API 연동을 통한 실시간 데이터 기반 의사결정

**주요 작업**:

- Tavily API Key 발급
- web_search Lambda 함수 구성
- 산업 분석 에이전트 생성

**학습 목표**:
자동차 산업의 구조적 변화, 시장 동향, 경쟁사 정보, 소비자 행동 패턴을 종합 분석하는 지능형 에이전트 구축. Tavily 검색 API를 활용한 실시간 산업 데이터 수집 및 시장 포지셔닝 전략 제안.

---

### 실습 3: 리포트 작성 에이전트 구성

**목표**: Multi-Agent Collaboration을 활용한 정보 통합 및 고품질 콘텐츠 생성

**주요 작업**:

- 리포트 작성 에이전트 생성

**학습 목표**:
다양한 전문 에이전트들의 정보를 종합하여 일관성 있고 설득력 있는 마케팅 기획서 작성. 제품 인사이트 및 산업 분석 정보를 통합하고 Markdown 형식으로 재구성 후 HTML 문서로 변환하여 S3 저장.

---

### 실습 4: Supervisor 에이전트 구성

**목표**: 에이전트 간 업무 분담을 관리하는 Supervisor 에이전트 구성

**주요 작업**:

- Supervisor 에이전트 구성
- Multi-Agent Collaboration 기능 활성화
- 에이전트 간 협업 흐름 및 역할 부여

**학습 목표**:
에이전트 간 효과적인 작업 분배 및 결과 통합 구현

## 구축 단계

### 1. 환경 설정

- IAM Administrator 권한 사용자 생성
- AWS Bedrock 모델 활성화

### 2. 데이터 준비

- S3 Bucket에 필요한 데이터 파일 업로드
- Amazon Bedrock Knowledge Base 연결

### 3. 에이전트 생성

- **Product Insight Agent**: 제품 정보 분석
- **Market Analyst Agent**: 시장 분석 (Tavily API 연동)
- **Reporter Agent**: 리포트 작성
- **Supervisor Agent**: 전체 프로세스 관리

### 4. Multi-Agent Collaboration 구성

- 에이전트 간 협업 워크플로우 설정
- 마케팅 인사이트 리포트 작성 프로세스 구축

## 배포 방법

CloudFormation YAML 템플릿을 사용하여 환경 자동 설정 가능

## AWS TechCamp [기본 과정] 손쉬운 Agent 조합으로 복잡한 문제를 해결하는 자비스(스마트 비서) 만들기 - 2025년 6월 25일 (수) 09:00AM - 12:00PM

#### [실습 URL](https://catalog.workshops.aws/qwords/ko-KR/10-start-workshop/16-builder-id)
