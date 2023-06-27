---
title: 'Vulnerability Report'
id: 'security'
keywords:
  [
    'Vulnerability Response',
    'Vulnerability Handling',
    'Vulnerability Reporting',
    'Vulnerability Severity Assessment',
    'Vulnerability Disclosure',
  ]
category: 'security'
---

<script setup>
    import { computed } from 'vue';
    import { useCommon } from '@/stores/common';

    import imgLight from './procedure.png';
    import imgDark from './procedure_dark.png';
    import imgMoLight from './procedure_mo.png';
    import imgMoDark from './procedure_mo_dark.png';
    const commonStore = useCommon();
    const imgPc = computed(() =>
        commonStore.theme === 'light' ? imgLight : imgDark
    );
    const imgMo = computed(() =>
        commonStore.theme === 'light' ? imgMoLight : imgMoDark
    );
</script>

## 1. Vulnerability Response

The openGauss community attaches great importance to the community version security. The SIG Security of openGauss community is responsible for receiving, investigating, and disclosing security vulnerabilities related to the community. Researchers and industry organizations working on vulnerability prevention are encouraged to report the potential security vulnerabilities in the openGauss community to the SIG Security. The reported security issues or vulnerabilities will be quickly analyzed and resolved by the SIG Security.

## 2. Supported Version

The vulnerability response process supports the LTS distribution of the openGauss community and its branch versions.

## 3. Vulnerability Handling Process

Each security vulnerability is tracked and handled by a designated coordinator. This coordinator is a member of the SIG Security of openGauss community, who is responsible for tracking, resolving, and disclosing the vulnerability. The following figure shows the end-to-end vulnerability handling process.

<img class="isPc" :src="imgPc" />
<img class="isH5" :src="imgMo" />

The details of vulnerability reporting, vulnerability assessment, and vulnerability disclosure are described as follows.

### 3.1 Vulnerability Reporting

We hope that you can report the potential vulnerability of an openGauss product to the openGauss community and work with us to resolve and disclose the vulnerability.

#### 3.1.1 Reporting Channel

You can send the potential security vulnerabilities of an openGauss product to the e-mail of the openGauss security team (<securities@openGauss.org>). Given that the vulnerability information is sensitive, you are advised to use the <a Download href="/file/public-key/openGauss_0x912AD1B8_public.asc">public PGP key</a> of the security team to encrypt the e-mail.
The information of the SIG Security members is as follows:

- Jinwei Zhu[@zhujinwei], <zhujinwei@huawei.com>

- Liang Guo[@blueloveki], <liang4358@163.com>

- Jianfeng Li[@jianfenglee], <bigtimer@qq.com>

- Yaozhong Zhang[@buter], <zhangyaozhong1@huawei.com>

- Zheli Liu[@liuzheli], <liuzheli@nankai.edu.cn>

#### 3.1.2 Reporting Content

To quickly identify and verify suspected vulnerabilities, the reporting e-mail should include but is not limited to the following content:

- Basic information: including the modules affected by the vulnerability, triggering conditions of the vulnerability, and impact on the system after the vulnerability is exploited.

- Technical details: including system configuration, fault locating method, description of exploit, POC, and method and procedure of fault reproduction.

- Suggestions on resolving the vulnerability.

- Organization and contact information of the vulnerability reporter.

- Reporter's possible plan for vulnerability disclosure.

#### 3.1.3 E-mail Response

We will respond to the reporting of suspected security vulnerabilities through e-mail within 5 days and keep the reporter informed of the vulnerability handling progress.

### 3.2 Vulnerability Severity Assessment

The Common Vulnerability Scoring System (CVSS) is widely used in the industry to assess vulnerability severity. Currently openGauss is using CVSS v3 to assess vulnerabilities, and such assessment focuses on the impact caused by the vulnerability in a preset attack scenario. The vulnerability severity assessment covers factors such as the exploit difficulty and the impact of vulnerability exploit on the confidentiality, integrity, and availability of the product. A score will be given after these factors are assessed.

#### 3.2.1 Assessment Criteria

The CVSS v3 adopted by the openGauss community assesses the impact of a vulnerability based on the following variables:

- Attack vector (AV): indicating the remoteness of an attack and how to exploit this vulnerability.

- Attack complexity (AC): describing the difficulty in executing an attack and the conditions for a successful attack.

- User interaction (UI): determining whether the attack requires users' participation.

- Permission required (PR): recording the level of user authorization required for a successful attack.

- Scope (S): determining whether an attack can affect components of different permission levels.

- Confidentiality (C): measuring the impact of unauthorized information disclosure.

- Integrity (I): measuring the impact of information tampering.

- Availability (A): measuring the impact on data access or services for users affected by the vulnerability.

#### 3.2.2 Assessment Principles

- The severity of a vulnerability is assessed, not the risk of the vulnerability.

- The assessment must be based on an attack scenario where the system confidentiality, integrity, and availability are affected by a successful attack.

- When a security vulnerability has multiple attack scenarios, the attack scenario with the highest CVSS score (that is, with the greatest impact) shall prevail in the assessment.

- When a library that is embedded or invoked has vulnerabilities, the assessment on its vulnerability severity should be based on an attack scenario, which is determined by the usage of the library in the product.

- When a security defect does not trigger or affect the confidentiality/integrity/availability (CIA), the CVSS score is 0.

#### 3.2.3 Assessment Procedure

Perform this procedure to assess a vulnerability:

- Set a possible attack scenario and score based on this attack scenario.

- Identify vulnerable components and affected components.

- Select the value of the basic assessment indicator, and perform the vulnerability impact assessment based on the exploitable indicators (attack vector, attack complexity, permission required, user interaction, and scope) and affected indicators (confidentiality, integrity, and availability).

#### 3.2.4 Severity Rating

<table board="2" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th align="left" style="width:40px">Severity Rating</th>
              <th align="left" style="width:40px">Score</th>
          </tr>
          <tr>
              <td align="left">Critical</td>
              <td>9.0 - 10.0</td>
          </tr>
          <tr>
              <td align="left">High</td>
              <td>7.0 - 8.9</td>
          </tr>
           <tr>
              <td align="left">Medium</td>
              <td>4.0 - 6.9</td>
          </tr>
          <tr>
              <td align="left">Low</td>
              <td>0.1 - 3.9</td>
          </tr>
          <tr>
              <td align="left">None</td>
              <td>0.0</td>
          </tr>
      </thead>
  </table>

### 3.3 Vulnerability Disclosure

For the security of openGauss users, the openGauss community will not discuss, confirm, or disclose the security issues of an openGauss product, and will strictly restrict the transmission of vulnerability information within vulnerability handling personnel, until the vulnerability is investigated and resolved and the security announcement is issued. In this process, the vulnerability reporter is also required to keep the vulnerability confidential. After the security vulnerability is resolved, the openGauss community will release a security announcement, with information including the technical details, CVE identifier, CVSS security score, and severity level of the vulnerability, as well as the affected and fixed versions. You can subscribe to security announcements of the openGauss community on the [securityannounce](https://mailweb.opengauss.org/postorius/lists/securityannounce.opengauss.org/).
