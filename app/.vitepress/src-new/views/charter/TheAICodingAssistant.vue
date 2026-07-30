<script setup lang="ts">
import { OButton, useMessage } from '@opensig/opendesign';
import AppSection from '~@/components/AppSection.vue';
import { useClipboard } from '~@/composables/useClipboard';
import { useI18n } from '~@/i18n';
import IconCopy from '~icons/app/icon-copy2.svg';

defineProps<{
  lang: 'zh' | 'en';
}>();

const i18n = useI18n();
const message = useMessage();

const onCopyClick = (e: MouseEvent) => {
  const text = (e.currentTarget as HTMLElement).parentElement?.textContent ?? '';
  useClipboard({
    text,
    target: e,
    success: () => {
      message.success({
        content: i18n.value.common.COPY_SUCCESS,
      });
    },
    error: () => {
      message.danger({
        content: i18n.value.common.COPY_FAILED,
      });
    },
  });
};
</script>

<template>
  <AppSection
    id="ai-coding-assistants"
    :title="lang === 'zh' ? 'openGauss社区生成式AI工具使用与开源贡献策略' : 'openGauss Community Generative AI Use and Open Source Contribution Policy'"
  >
    <div v-if="lang === 'zh'" class="content-card policy">
      <h3>1. 开放策略 (Openness Strategy)</h3>

      <p>
        openGauss社区秉持开放、协同、创新的开源精神，将生成式AI与智能化Agent视为推动社区技术演进的重要生产力。社区允许贡献者在合理、透明、可审查的前提下使用生成式人工智能工具辅助贡献，但坚持以下原则：
      </p>
      <ul>
        <li>
          <strong>核心原则一：保持开放，AI开发导向 (Open & AI-Development-Oriented)</strong>

          <p>
            openGauss社区对新技术始终秉承开放拥抱的姿态。我们积极迎接AI开发导向，并致力于构建一个对人类开发者与AI代理同样友好的智能化开源生态。openGauss社区鼓励并支持开发者和自动化Agent深入参与到社区的各项贡献中（包括但不限于代码编写、文档翻译、测试用例生成、运维自动化等）。
          </p>
        </li>

        <li>
          <strong>核心原则二：开发者最终负责 (Developer Ultimate Responsibility)</strong>

          <p>
            AI只是人类开发者参与社区贡献的辅助工具，<strong>人类开发者对其所提交的社区贡献质量负责并承担相关法律责任</strong>。无论是人类开发者独立开发的成果，还是由AI辅助生成、触发的代码与内容，贡献者都必须对其所提交内容的正确性、安全性、合规性和质量负责并承担最终责任。社区维护者对贡献者提交内容的审查、合并、发布行为并不表示社区管理方确认其中所包含的AI输出不构成侵权、不存在安全缺陷或适合特定用途。
          </p>
        </li>

        <li>
          <strong>核心原则三：透明度，可追溯 (Transparency & Traceability)</strong>

          <p>
            在向社区提交内容时，贡献者应如实披露与该贡献相关的AI工具使用情况、第三方材料来源、许可证信息和人工审查情况。openGauss社区建立了一套严格的元数据记录机制，对AI生成内容的<strong>关键元数据（包括生成该等内容所使用的Agent平台、模型、Prompt摘要等）进行完整记录</strong>，从而确保AI参与的代码贡献都具备清晰的审查追踪链。
          </p>
        </li>
      </ul>

      <h3>2. 适用范围 (Scope of Application)</h3>

      <p>本策略适用于贡献者向openGauss社区（包括但不限于openGauss组织下的所有代码仓库、文档库等）提交的各种形式的所有贡献：</p>

      <ul>
        <li><strong>源代码与脚本</strong>：包括各类核心代码、测试用例、构建脚本。</li>
        <li><strong>技术文档与社区内容</strong>：包括API说明、部署指南、发布日志、Wiki页面等。</li>
        <li><strong>配置与元数据</strong>：包括Containerfile/Dockerfile、CI/CD配置文件等。</li>
      </ul>

      <h3>3. 法律与合规 (Legal & Compliance)</h3>

      <p>贡献者向openGauss社区提交包含AI生成内容的贡献，必须在以下法律与合规框架内：</p>

      <h4>3.1 CLA（贡献者许可协议）</h4>

      <p>openGauss社区采用<strong>CLA（Contributor License Agreement，贡献者许可协议）</strong>。</p>

      <ul>
        <li>贡献者在提交贡献前，必须签署社区CLA。</li>
        <li>
          依据CLA，当贡献者向社区提交包含AI生成内容的贡献时，即视为该贡献者承诺其对该贡献拥有合法的处分权（例如，已获得充分授权）。贡献者不能以“内容由AI生成”为由免除其在CLA中所做出的承诺以及应当承担的相关法律责任。
        </li>
      </ul>

      <h4>3.2 追溯机制：关键元数据完整记录</h4>

      <p>
        若贡献者向社区提交的贡献包含主要<strong>由AI生成或经AI自动化处理</strong>的代码与文档，则其在提交Pull
        Request时应当完整记录并携带以下<strong>关键元数据</strong>。这些元数据可记录在Pull Request的固定模板中：
      </p>

      <ul>
        <li><strong>Agent平台信息（Tool）</strong>：明确指明生成该内容所使用的Agent平台名称及版本（如 `Claude Code 2.1.156`、`Qwen Code 0.16.1` 等）。</li>
        <li><strong>模型信息 (Model)</strong>：明确指明生成该内容所使用的生成式AI模型名称及版本（如 `GPT-4o`、`DeepSeek-V3` 等）。</li>
        <li>
          <strong>Prompt 摘要 (Prompt Summary)</strong>：简要概述指导AI生成该内容的核心提示词或核心意图（如 `"Optimize memory allocation for Spec
          file"`），不得提交提示词或核心意图不明的AI生成内容。
        </li>
      </ul>

      <p><strong>规范示例（Pull Request格式）：</strong></p>
      <div class="code-block">
        <OButton class="copy-btn" :icon="IconCopy" @click="onCopyClick" />
        <pre><code>### 当前PR是否有AI参与:
[]  否
[x]  是
__1. Agent平台信息: Claude Code 2.1.156
__2. 模型信息: DeepSeek-V3
__3. Prompt摘要: 基于现有代码逻辑，完成代码编写、逻辑优化、异常分支补充及注释完善，协助完成本次功能开发与问题修复

### 希望检视人员了解:
1. 代码由AI辅助开发者编写，且开发者已人工逐行核对逻辑、校验功能正确性，且与开发者预期一致；</code></pre>
      </div>

      <h3>4. Agents规范Prompt（Standard Prompt for Agents）</h3>

      <p>
        为了让各种AI编程助手、自动化Agent（如PR自动化审查、代码自动修复Agent）在为openGauss社区提供服务时能够严格遵循上述策略，特制定以下<strong
          >系统级提示词规范（System Prompt）</strong
        >：
      </p>

      <div class="code-block">
        <OButton class="copy-btn" :icon="IconCopy" @click="onCopyClick" />
        <pre><code># 角色与目标
你是一个专为openGauss开源社区服务的AI编程与合规助手（AI Agent）。你的目标是协助人类开发者高效参与社区贡献，同时必须坚守合规底线，确保所有输出符合openGauss社区的合规与质量要求。

# 核心行为准则

## 1. 明确责任边界与开发导向
- 你是开发者的效率放大器，但你必须明白，人类开发者将对你的输出质量负责并承担相关法律责任。因此，你生成的代码必须清晰、人类可读且易于人类开发者进行Review。
- 不得生成任何含义模糊、难以调试或存在黑盒逻辑的复杂代码块。

## 2. 法律与许可证合规（底线原则）
- 不得在不遵循适用许可证的情况下，从采用GPL2.0、GPL3.0等限制型许可证许可的代码库或独占许可的商业软件专有代码库中直接复制或变相复制任何代码片段。
- 如果你生成的代码直接引用了特定的开源组件或公开算法实现，则该等代码必须保留其原有著作权声明（包括但不限于保留原组件或算法的著作权声明）及许可证声明，而不得删除或修改该等声明。

## 3. 关键元数据显式披露
- 当你协助人类生成代码，或者作为自动化Agent独立向openGauss仓库提交PR时，必须按照PR固定模板进行提交。元数据必须包含：
  - Agent平台信息: [Agent平台名称及版本]
  - 模型信息: [AI模型名称及版本]
  - Prompt摘要: [核心提示词或核心意图]

## 4. openGauss技术栈适配
- 代码风格：在向openGauss社区提交代码前，应分析对应代码仓库的代码风格，提交修改代码时必须严格遵守对应代码仓库的代码风格指南。
- 优先安全性：不得引入内存泄漏、缓冲区溢出等常见安全漏洞，优先推荐使用已经过openGauss社区验证的安全函数。</code></pre>
      </div>

      <h3>5. 禁止或高风险行为</h3>

      <ul>
        <li>未经人工审查的AI输出</li>
        <li>贡献者无法解释、无法维护或无法确认来源的代码</li>
        <li>AI工具明显复现第三方项目代码、文档、图片或其他受保护表达，但未提供合法来源、许可证和必要权属信息的内容</li>
        <li>与本项目许可证不兼容的内容</li>
        <li>违反AI工具使用条款、雇主政策、保密义务，违反出口管制、数据合规要求或侵犯第三方权利的内容</li>
        <li>包含商业秘密、个人信息、敏感数据、私有代码、内部文档或未公开漏洞信息的提示词、输出或贡献</li>
        <li>由AI Agent自动批量提交的贡献或提交人类贡献者未实质参与的贡献</li>
      </ul>

      <h3>6. 贡献者责任</h3>

      <p>贡献者向社区提交AI辅助贡献时，应确认并承诺：</p>

      <ul>
        <li>已对拟提交AI辅助贡献内容进行人工审查</li>
        <li>理解拟提交AI辅助贡献的技术含义、设计影响和维护成本</li>
        <li>已完成对拟提交的AI辅助贡献的必要测试、构建、许可证检查和安全检查</li>
        <li>已确认AI工具输出未引入与项目许可证不兼容的限制</li>
        <li>已确认拟提交AI辅助贡献不包含已知的未获授权的第三方材料，或已按照本项目要求披露第三方材料、许可证、著作权声明和权属信息</li>
        <li>已遵守贡献者雇主、客户、学校或所属组织关于AI工具和开源贡献的政策</li>
        <li>对所提交AI辅助贡献承担与非AI辅助贡献相同的责任</li>
      </ul>

      <h3>7. 审查与合入规则</h3>

      <p>社区维护者可以基于以下原因要求贡献者修改、补充说明、重新提交AI辅助贡献或拒绝合入AI辅助贡献：</p>

      <ul>
        <li>贡献者未按要求披露AI辅助贡献的相关信息</li>
        <li>贡献者无法解释其所提交的代码逻辑或来源</li>
        <li>贡献内容与未经授权的第三方代码、文档或图片实质性相似</li>
        <li>许可证、著作权或权属信息不清晰</li>
        <li>未经测试、不可维护或增加安全风险的低质量AI辅助贡献</li>
        <li>自动化、批量化提交影响社区正常维护秩序的低质量AI辅助贡献</li>
        <li>社区维护者基于openGauss项目风险偏好认为AI辅助贡献不适合合入</li>
      </ul>
    </div>
    <div v-else class="content-card policy">
      <h3>1. Openness Strategy</h3>

      <p>
        Guided by the spirit of openness, collaboration, and innovation, the openGauss community recognizes generative AI and intelligent agents as essential
        drivers for advancing community technologies. While we allow the use of generative AI tools in making contributions, provided such use is reasonable,
        transparent, and reviewable, we strictly adhere to the following principles:
      </p>
      <ul>
        <li>
          <strong>Core Principle 1: Open & AI-Development-Oriented</strong>
          <p>
            The openGauss community actively embraces new technologies. Open to AI-centric development, we are committed to building an intelligent open-source
            ecosystem that is equally friendly to both human developers and AI agents. The openGauss community welcomes both developers and automated agents to
            contribute deeply to the community, whether through code writing, document translation, test case generation, or O&M automation.
          </p>
        </li>
        <li>
          <strong>Core Principle 2: Developer Ultimate Responsibility</strong>
          <p>
            AI is strictly a supporting tool for human contributors.
            <strong>Human contributors hold ultimate responsibility and legal accountability for the quality of their submissions</strong>. Whether an output is
            human-developed, or generated or triggered with AI assistance, contributors must assume final responsibility for the accuracy, security, compliance,
            and quality of their submissions. Review, merging, or publishing the submissions by community maintainers does not constitute an endorsement or
            warranty by the community that the AI output in the submissions is free of infringement, secure, or fit for a particular purpose.
          </p>
        </li>
        <li>
          <strong>Core Principle 3: Transparency and Traceability</strong>
          <p>
            Upon submission, contributors should disclose the use of AI tools, sources of third-party materials, license information, and human review status
            associated with the submission. The openGauss community enforces a strict metadata tracking system to fully log
            <strong>critical metadata for AI-generated content, including the agent platform, model, and prompt summaries</strong>. This guarantees a clear
            audit trail for AI-assisted code contributions.
          </p>
        </li>
      </ul>

      <h3>2. Scope of Application</h3>

      <p>
        This policy applies to all forms of contributions submitted to the openGauss community (including but not limited to all code and documentation
        repositories under the openGauss organization):
      </p>

      <ul>
        <li><strong>Source code and scripts</strong>：including various core code, test cases, and build scripts.</li>
        <li><strong>Technical documents and community content</strong>：including API references, deployment guides, release logs, and Wiki pages.</li>
        <li><strong>Configurations and metadata</strong>：including Containerfiles/Dockerfiles, and CI/CD configuration files.</li>
      </ul>

      <h3>3. Legal & Compliance</h3>

      <p>Any submissions incorporating AI-generated content to the openGauss community shall be governed by the following legal and compliance frameworks:</p>

      <h4>3.1 Contributor License Agreement (CLA)</h4>

      <p>The openGauss community implements a <strong>Contributor License Agreement (CLA)</strong>.</p>

      <ul>
        <li>Contributors must sign the CLA before submitting any contributions.</li>
        <li>
          According to the CLA, by submitting a contribution that contains AI-generated content to the community, the contributor is deemed to have lawful
          rights to dispose of that submission (e.g., having obtained sufficient authorization). The AI-generated nature of the content shall not serve as a
          ground to exempt the contributors from their obligations and legal liabilities pledged in the CLA.
        </li>
      </ul>

      <h4>3.2 Traceability: Full Logging of Key Metadata</h4>

      <p>
        For contributions that contain code or documents <strong>fundamentally generated or automatically processed by AI</strong>, contributors shall fully
        record and attach the following <strong>key metadata</strong> when submitting a pull request. This metadata can be recorded in the pull request
        template.
      </p>

      <p>Pull request template:</p>
      <ul>
        <li><strong>Agent Platform:</strong> Specify the name and version of the agent platform used (e.g., Claude Code 2.1.156, Qwen Code 0.16.1, etc.).</li>
        <li><strong>Model:</strong> Specify the name and version of the generative AI model used (e.g., GPT-4o, DeepSeek-V3, etc.).</li>
        <li>
          <strong>Prompt Summary:</strong> Briefly describe the core prompts or intent that guided the AI generation (e.g., "Optimize memory allocation for
          Specfile"). AI-generated content submitted with ambiguous prompts or unclear intent is prohibited.
        </li>
      </ul>

      <p><strong>Example (pull request):</strong></p>

      <div class="code-block">
        <OButton :icon="IconCopy" class="copy-btn" @click="onCopyClick" />
        <pre><code>### AI involvement in this PR:
[]  No
[x]  Yes
__1. Agent platform: Claude Code 2.1.156
__2. Model: DeepSeek-V3
__3. Prompt summary: Based on the existing code logic, complete the code, optimize logic, add missing branches, and improve annotations to help with function development and problem fixing.

### Notes for reviewers:
1. The code was developed with AI assistance. The developer has manually reviewed the logic line-by-line and verified its functionality to ensure it behaves exactly as expected.</code></pre>
      </div>

      <h3>4. Standard Prompt for Agents</h3>

      <p>
        To ensure that various AI programming assistants and automated agents (such as automated PR reviewers and auto-fixing agents) strictly comply with the
        preceding policies when serving the openGauss community, the following <strong>system prompt</strong> is formulated:
      </p>

      <div class="code-block">
        <OButton :icon="IconCopy" class="copy-btn" @click="onCopyClick" />
        <pre><code># Role and objective:
You are an AI agent dedicated to serving the openGauss community. Your goal is to assist human developers in contributing efficiently while strictly adhering to the compliance baseline, ensuring all outputs meet the openGauss community's compliance and quality standards.

# Core Code of Conduct

## 1. Clarify responsibilities and development orientation.
- You serve as an efficiency amplifier for developers, but you must understand that human developers will bear the ultimate legal and quality liability for your outputs. Therefore, your generated code must be clean, readable, and easy for human developers to review.
- Do not generate any complex code blocks with ambiguity, debugging difficulties, or black-box logic.

## 2. Legal and license compliance (red line)
- Do not directly replicate or paraphrase any code snippets from repositories under restrictive licenses (such as GPL-2.0, GPL-3.0, etc.) or proprietary repositories of commercially licensed software without adhering to the applicable licenses.
- If your generated code directly references specific open-source components or public algorithmic implementations, such code must retain its original copyright notices (including but not limited to preserving the copyright notices of the original components or algorithms) and license notices, which shall not be deleted or modified.

## 3. Explicit exposure of key metadata
- When assisting humans in code generation or when independently submitting PRs to openGauss repositories as an automated agent, you must use the designated PR template. The metadata must include:
  - Agent platform: [Agent platform name and version]
  - Model: [AI model name and version]
  - Prompt summary: [core prompts or intent]

## 4. openGauss technology stack adaptation
- Code style: Before submitting any code to the openGauss community, analyze the coding style of the target repository. Your modifications must strictly conform to that repository's code style guide.
- Security first: Do not introduce security vulnerabilities such as memory leaks and buffer overflows. Always prefer secure functions verified by the openGauss community.</code></pre>
      </div>

      <h3>5. Prohibited or Risky Behaviors</h3>

      <ul>
        <li>Unreviewed AI outputs;</li>
        <li>Code that contributors cannot explain, maintain, or verify the source of;</li>
        <li>
          Content where AI clearly reproduces third-party code, documentation, images, or copyrighted expressions without providing legitimate sources,
          licenses, and necessary attributions;
        </li>
        <li>Content that is incompatible with the project's license;</li>
        <li>
          Content that violates AI terms of service, employer policies, confidentiality obligations, export controls, data compliance regulations, or
          third-party rights;
        </li>
        <li>
          Prompts, outputs, or contributions that contain trade secrets, personal information, sensitive data, private code, internal documents, or undisclosed
          vulnerability information;
        </li>
        <li>Contributions submitted in batch by AI agents or lacking substantial participation by human contributors.</li>
      </ul>

      <h3>6. Contributor Responsibilities</h3>

      <p>When submitting AI-assisted contributions to the community, contributors shall acknowledge and agree that they:</p>

      <ul>
        <li>Have manually reviewed the AI-assisted contributions to be submitted;</li>
        <li>Understand the technical implications, design impact, and maintenance costs of the AI-assisted contributions to be submitted;</li>
        <li>Have completed all necessary testing, builds, license checks, and security reviews on the AI-assisted contributions to be submitted;</li>
        <li>Have verified that the AI output does not introduce content incompatible with the project license;</li>
        <li>
          Have confirmed that the AI-assisted contributions do not include any known unauthorized third-party materials, or that any third-party materials,
          licenses, copyright notices, and attributions have been fully disclosed as required by this project;
        </li>
        <li>
          Have complied with all applicable policies of the contributors' employers, clients, academic institutions, or affiliated organizations regarding AI
          tools and open-source contributions;
        </li>
        <li>Take the same responsibility for AI-assisted contributions as for non-AI-assisted contributions.</li>
      </ul>

      <h3>7. Review and Merging Rules</h3>

      <p>
        Community maintainers may request modifications, additional explanations, resubmissions of AI-assisted contributions by the contributors, or reject
        AI-assisted contributions for any of the following reasons:
      </p>

      <ul>
        <li>The contributor fails to disclose information regarding the AI-assisted contribution as required;</li>
        <li>The contributor is unable to explain the logic or source of the submitted code;</li>
        <li>The contribution is substantially similar to unauthorized third-party code, documentation, or images;</li>
        <li>The licensing, copyright, or attribution information is unclear;</li>
        <li>The AI-assisted contribution is of poor quality, untested, unmaintainable, or introduces security risks;</li>
        <li>Automated, mass submissions of low-quality AI-assisted contributions disrupt the maintainability and operations of the community;</li>
        <li>The community maintainers consider the AI-assisted contribution inappropriate for merging based on the openGauss project's risk control.</li>
      </ul>
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.content-card {
  border-radius: 4px;
  background-color: var(--o-color-fill2);
  padding: 40px;
  color: var(--o-color-control3);

  p {
    @include text1;
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  ul {
    @include text1;
    list-style: disc inside;
    &:not(:last-child) {
      margin-bottom: 16px;
    }
    li {
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }

  @include respond-to('pad_h') {
    padding: 12px 16px;
  }
  @include respond-to('pad_v') {
    padding: 24px;
  }
  @include respond-to('phone') {
    padding: 12px;
  }
}

.policy {
  ul {
    list-style-position: outside;
    padding-left: calc(1em + 7px);
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  .code-block {
    position: relative;

    @include hover {
      .copy-btn {
        display: block;
      }
    }

    .copy-btn {
      --btn-bg-color-hover: transparent;
      --btn-bg-color-active: transparent;
      display: none;
      position: absolute;
      right: 0;
      top: 0;

      @include respond-to('<=pad_v') {
        display: block !important;
      }
    }
  }

  pre {
    overflow: auto;
    background-color: var(--o-color-fill1);
    border-radius: 4px;
    padding: 12px;

    code {
      font-family: 'Consolas', 'Microsoft YaHei';
      white-space: no-wrap;
      font-size: 14px;
      line-height: 22px;
    }
  }

  p {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  h2 + p,
  h3 + p,
  h4 + p {
    margin-top: 16px;
    margin-bottom: 16px;
  }

  h3 {
    font-weight: 600;
    &:not(:first-child) {
      margin-top: 40px;
    }
    &:not(:last-child) {
      margin-bottom: 16px;
    }
    @include h3;
  }

  h4 {
    font-weight: 600;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>
