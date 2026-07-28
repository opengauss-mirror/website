<script setup lang="ts">
import AppSection from '~@/components/AppSection.vue';

defineProps<{
  lang: 'zh' | 'en';
}>();
</script>

<template>
  <AppSection id="conduct" :title="lang === 'zh' ? 'openGauss社区行为准则' : 'openGauss Community Code of Conduct'">
    <div v-if="lang === 'zh'" class="content-card">
      <p>
        1、为建设开放友好的社区环境，本项目群贡献者和维护者承诺：不论年龄、体型、身体健全与否、民族、经验水平、受教育程度、社会地位、国籍、相貌、种族等，本项目群和社区的参与者皆免于任何骚扰。
      </p>

      <p>2、有助于创造积极社区环境的行为包括但不限于：</p>

      <ul>
        <li>(1)措辞友好且包容；</li>
        <li>(2)尊重不同的观点和经验；</li>
        <li>(3)耐心接受有益批评；</li>
        <li>(4)关注对社区最有利的事情；</li>
        <li>(5)与社区其他成员友善相处。</li>
        <li>(6)合规提交代码、规范使用权限、保障项目供应链与基础设施安全。</li>
      </ul>

      <p>3、本项目群和社区的参与者不应采取的行为包括但不限于：</p>

      <ul>
        <li>(1)发布与色情、暴力等有关的言论或图像；</li>
        <li>(2)捣乱/煽动/造谣行为、侮辱/贬损的评论、人身及政治攻击；</li>
        <li>(3)公开或私下骚扰本项目群和社区的其他参与者；</li>
        <li>(4)未经明确授权发布他人的个人信息等资料，如住址、电子邮箱等；</li>
        <li>(5)植入恶意后门、污染项目依赖、损毁项目资产等危害社区安全的违规操作；</li>
        <li>(6)其他有理由认定为违反社区行为准则的不当行为。</li>
      </ul>

      <p>
        4、社区项目维护者(Maintainer)有权利和义务诠释何谓“不当行为”，并妥善公正地纠正已发生的不当行为。社区项目维护者有权利和义务删除、编辑、拒绝违背本行为准则的评论（comments）、提交（commits）、代码、wiki
        编辑、问题（issues）等任何贡献；社区项目维护者可暂时或永久地封禁任何其认为有威胁、冒犯、有害社区秩序的不当行为参与者。
      </p>

      <p>5、本行为准则适用于本社区。当有人代表本社区时，本准则亦适用于此人所处的公共平台。</p>

      <p>6、代表本社区的情形包括但不限于：使用本社区的官方电子邮件、通过本社区官方媒体账号发布消息、作为本社区指定代表参与在线或线下活动等。</p>

      <p>7、代表本社区的行为准则可由项目群办公室进一步定义及解释，并报本项目群 openGauss 委员会审批发布。</p>
    </div>
    <div v-else class="content-card">
      <p>
        1. To build an open and friendly environment, we as contributors and maintainers pledge to make participation in our community a harassment-free
        experience for participants of the program and community, regardless of age, body size, visible or invisible disability, ethnicity, level of experience,
        education, socioeconomic status, nationality, personal appearance, or race.
      </p>
      <p>2. Behaviors that contribute to a positive environment for our community include:</p>
      <ul>
        <li>(1) Friendly and inclusive wording;</li>
        <li>(2) Respecting different viewpoints and experiences;</li>
        <li>(3) Gracefully accepting constructive feedback;</li>
        <li>(4) Focusing on what is best for the community;</li>
        <li>(5) Demonstrating kindness toward other people.</li>
        <li>(6) Compliant code submissions, proper use of permissions, and safeguarding project supply chain and infrastructure security.</li>
      </ul>

      <p>3. Unacceptable behaviors in the program and community include:</p>
      <ul>
        <li>(1) Use of sexualized and violent language or imagery;</li>

        <li>(2) Disruption, incitement, rumor-making, insulting, derogatory comments, and personal and political attacks;</li>

        <li>(3) Public or private harassment to participants in the program and community;</li>

        <li>(4) Publishing others' information, such as physical and email addresses, without their explicit authorization;</li>

        <li>
          (5) Implanting malicious backdoors, polluting project dependencies, destroying project assets, and other violations that endanger community security;
        </li>

        <li>(6) Other conduct that can reasonably be considered as a violation of this Code of Conduct.</li>
      </ul>

      <p>
        4. Community project maintainers are responsible for clarifying and enforcing our standards of "proper conduct" and will take appropriate and fair
        corrective action in response to any conduct that they deem inappropriate. Community project maintainers have the right and responsibility to remove,
        edit, or reject comments, commits, code, wiki edits, and issues that violate this Code of Conduct, and will temporarily or permanently ban any
        participant because of the behavior they consider to be threatening, offensive, or harmful.
      </p>
      <p>5. This Code of Conduct applies within all community spaces, and applies when an individual represents the community in public spaces.</p>
      <p>
        6. Examples of representing the community include using an official email address, posting through an official media account, and participating in
        online or offline events as an appointed representative.
      </p>
      <p>
        7. The program office can further define and interpret the conduct of representing the community and report to the openGauss Committee for approval and
        publishing.
      </p>
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
</style>
