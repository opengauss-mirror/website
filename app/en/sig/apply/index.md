---
title: 'How to Set Up a SIG'
category: sig-apply
goBackUrl: /en/sig/sig-list
---

<script setup>
import { OLink } from '@opensig/opendesign';
</script>

# **How to Set Up a SIG**

In open-source communities, Special Interest Groups (SIGs) serve as the core organizational units that drive technical advancements, deliver continuous code contributions, and steer key decisions. To date, the openGauss community has nurtured more than 20 SIGs, including SQLEngine, StorageEngine, AI, Security, and CloudNative, covering diverse technical fields from kernel and toolchain to security and AI.

If a particular technical direction falls outside the scope of current SIGs, or you want to gather a group of long-term contributors around a new topic, simply set up a new SIG. This guide will tell you how to set up a SIG in the openGauss community.

## **I. General Provisions**

**Before officially initiating a SIG application, it is recommended that you do the following:**

1. **Review current SIGs** to verify that no existing SIG covers your needs (see the list at the end of this guide, or check <OLink color="primary" href="https://gitcode.com/opengauss/tc/blob/master/sigs/README.md" target="_blank" rel="noopener noreferrer">sigs/README.md in the tc repository</OLink>). If a SIG already covers your direction, we highly encourage joining them instead of starting a new SIG to keep the community structure streamlined.

2. **Initiate an open discussion within the community**, for example, by sharing your proposal via the openGauss mailing list, forum, or online meetups. Doing so will help you:

- Engage potential maintainers and committers who want to get involved early.
- Collect community feedback to clarify the SIG's responsibilities and objectives.
- Build consensus for the subsequent Technical Committee (TC) review, improving approval efficiency.

The **TC** determines the establishment, dissolution, and merging of SIGs. As the technical governing body of the openGauss community, the TC holds the final authority on technical decisions and oversees the daily operations of all SIGs (for details, see the <OLink color="primary" href="https://gitcode.com/opengauss/tc/blob/master/README.md" target="_blank" rel="noopener noreferrer">README in the tc repository</OLink>).

## **II. Roles**

A SIG typically has three roles:

| Role | Responsibility | Criteria |
| --- | --- | --- |
| Contributor | Project contributor who claims issues and PRs and completes testing before submitting PRs. | Registered openGauss community members who have signed the CLA. |
| Committer | Project code reviewer who assigns issues and PRs and reviews code quality and accuracy. | Frequently contributing to the SIG, experienced, and willing to participate in review. |
| Maintainer | Project owner who charts the technical roadmap for the SIG project and develops the release plan. | Experienced, responsible, excellent technical and management capabilities. |

## **III. How to Apply**

The SIG governance data for openGauss is archived in the sigs/ directory of the <OLink color="primary" href="https://gitcode.com/opengauss/tc" target="_blank" rel="noopener noreferrer">opengauss/tc</OLink> repository. Each SIG has a separate subdirectory. The procedure is as follows:

### **Step 1: Fork the tc repository and create your SIG directory using the template.**

```txt
git clone https://gitcode.com/${Your GitCode ID}/tc
cd ./tc/sigs
cp -r Template ${Your SIG name}
cd ${Your SIG name}
```

The **sigs/Template** directory offers standard templates (**README.md and OWNERS**). Copy and customize them as needed.

### **Step 2: Complete README for the new SIG.**

Open README.md in the new SIG directory and fill in the required content as recommended.

- **SIG name and responsibilities**: Specify the openGauss community module that the SIG is responsible for developing and maintaining.
- **Meeting schedule**: Specify the public meeting time (e.g., "14:00–16:00 on every other Wednesday (Beijing time)"), and subscribe to <OLink color="primary" href="/en/online-communication">openGauss online communication</OLink> for timely notifications.
- **Meeting minutes archive method** (e.g., Etherpad link)
- **Members**: Names, GitCode IDs, and email addresses of maintainers and committers
- **Contact information**: Mailing list address (yoursig@opengauss.org)
- **Repositories**: Code repositories that the SIG plans to host and maintain (if repositories are specified during the application)

```txt
vi README.md
```

### **Step 3: Compile the sig-info.yaml file to configure member and repository information.**

Specify SIG members in the sig-info.yaml file.

```txt
vi sig-info.yaml
```

### **Step 4: Submit a pull request.**

Commit the changes to GitCode and initiate a pull request to the <OLink color="primary" href="https://gitcode.com/opengauss/tc" target="_blank" rel="noopener noreferrer">opengauss/tc</OLink> repository.

### **Step 5: Email the Technical Committee (TC).**

Email the TC at <OLink color="primary" href="mailto:tc@opengauss.org">tc@opengauss.org</OLink> with the subject "New SIG Proposal + SIG Name". Include the PR link from Step 4 in the email for TC members' review.

### **Step 6: The TC conducts reviews and makes decisions.**

Once the proposal is approved, the TC merges the pull request to officially set up the SIG. The community infrastructure then automatically configures the code repository and roles."

With a clear technical vision, a team of aligned contributors, and readiness for sustained commitment, you are invited to launch your SIG proposal through the outlined process. For any questions, feel free to contact the TC at tc@opengauss.org.

We look forward to seeing more SIGs in the openGauss community.
