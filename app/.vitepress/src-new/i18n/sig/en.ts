export default {
  sigCenter: 'SIG Center',
  sigApplicationProcess: 'SIG Application Process',
  intro: {
    title: 'Join Our SIGs',
    subTitle1: 'Learn How SIGs Operate',
    desc1:
      'SIGs are the core operational units in the openGauss community. Formed and run by community developers, each SIG focuses on one or more technical topics, manages relevant code repositories, and drives technological implementation and continuous innovation.',

    subTitle2: 'Communicate with a SIG',
    desc2:
      'Find SIG information, repository lists, and contact details on the SIG Center. You can also check the README.md file in the corresponding SIG directory in the openGauss community repository. Participate in discussions through mailing lists and public regular meetings. To create a meeting, the SIG Maintainer or Committer access is required.',
    createMeeting: 'Create Meeting',

    subTitle3: 'Contribute to a SIG',
    desc3: [
      'The openGauss community welcomes developers, enthusiasts, and experts to join our collaborative ecosystem. Contribute through code submissions, documentation improvements, feature testing, and more.',
    ],
    sigContributeGuide: 'SIG Contribution Guide',
  },
  understand: {
    title: 'About SIGs',
    title1: 'SIG Roles & Responsibilities',
    desc1:
      'Developers contribute to the openGauss community by joining Special Interest Groups (SIGs). Whether you are a Contributor, Committer, or Maintainer, every role is essential to the community. They differ in the scope of their SIG governance.',
    title2: 'SIG Meeting Guide',
    desc2:
      'Regular SIG meetings are a core activity for reviewing technical proposals, aligning development progress, solving problems, and planning future roadmaps.',
    title3: 'SIG Application Process',
    desc3: 'Have a great technical idea and want to build a community around it? Apply to create a new SIG.',
    viewApplicationProcess: 'View Application Process',
    apply1: 'Create',
    apply2: 'Fill in Details',
    apply3: 'Configure',
    apply4: 'Submit PR',
    apply5: 'Send Application',
    apply6: 'Refine',
  },
  vigor: {
    contributor: 'Contributors',
    download: 'Downloads',
    company: 'Organizations',
  },
  roles: {
    title: 'Roles',
    contributor: 'Contributor',
    contributorDesc: [
      'Responsibilities: Drive community growth by developing code, resolving issues, and enhancing documentation.',
      'Requirements: Master community technologies, strictly follow community regulations, and actively engage in contributions.',
    ],
    committer: 'Committer',
    committerDesc: [
      'Responsibilities: Review community code to enhance quality and drive community progress through personal contributions.',
      'Requirements: Extensive project experience, a solid understanding of coding standards, ability to offer insightful feedback, and willingness to share expertise.',
    ],
    maintainer: 'Maintainer',
    maintainerDesc: [
      'Responsibilities: Steer the technical direction, drive key decisions, and foster long-term community growth through contributions in critical areas.',
      'Requirements: Deep insight into the project architecture, strong collaboration and communication skills, alignment with the open source ethos, and dedication to sustained community growth.',
    ],
    newContributors: 'New Contributors',
    welcomNewContributors: 'We welcome new members to join our community. To start contributing, see the',
    contributorGuide: 'openGauss Contributor Guide',
    existingMembers: 'Existing Community Members',
    existingMembersDesc1: 'Existing community members should align with the community-driven philosophy, adhere to the',
    codeOfConduct: 'openGauss Code of Conduct',
    existingMembersDesc2: ', and have a solid understanding of the operational framework and technical landscape.',
    contributorTitle: 'Contributor',
    contributorSubTitle:
      "Contributors are the backbone of the openGauss community. They collectively fuel the project's innovation and evolution through active engagement in coding, documentation, bug fixing, and community operations.",
    joinRequirement: 'Requirements',
    responsibilityAndRights: 'Responsibilities and Rights',
    contributorRequirements: [
      'Have an account on the code hosting platform.',
      'Contribute to a SIG or community, e.g., by committing or reviewing PRs the code hosting platform, archiving or commenting on issues, and engaging in discussions.',
      'Join in one or more SIGs.',
    ],
    contributorResponsibility: [
      'Respond to assigned issues and PRs.',
      "Take responsibility for the contributed code, ensuring that it is well tested, consistently passes all test cases, meets the community's DT coverage requirements, and resolves any subsequent errors or issues.",
      'Take charge of the implementation design and pass the SIG review.',
      'Gain the right to become a SIG committer.',
    ],

    committerTitle: 'Committer',
    committerSubTitle:
      "Committers serve as the core maintainers of repositories with authority to merge code. Drawing on their extensive technical expertise, they safeguard code quality through code reviews, developer testing, and compliance checks, actively steering the database's technical roadmap and long-term sustainability.",
    committerRequirements: [
      'Be a contributor for at least three months.',
      'Participated in at least six PR reviews as the primary reviewer.',
      'Reviewed or merged at least 20 PRs into the code repository.',
      'Be familiar with the code repository.',
      'Nominate yourself or be nominated by the SIG committers or maintainers, and be approved at the SIG meeting.',
    ],
    committerResponsibility: [
      "Review the PRs submitted by contributors, providing fair and objective evaluations regarding code design, implementation, security, scalability, and compatibility. The evaluations should refer to the community's development specifications and secure coding guidelines.",
      'For any changes to external interfaces or APIs, notify potentially affected SIGs. Send notifications at least one week in advance, stating the compatibility impacts to ensure the relevant SIGs have enough time to respond.',
      'Update and maintain component versions. Follow the community quality control policy for version updates and align with the openGauss community release milestones.',
      'Be familiar with the community development workflows and guide contributors to follow the workflows, ensuring correct execution of development standards.',
      'Oversee component software engineering and cultivate a robust software engineering culture within SIGs. Maintain the code implementation design for components to ensure feature designs are logical and well-structured.',
      'Respond to security vulnerabilities. Stay updated on CVEs and security notices, promptly fix vulnerabilities, and notify relevant SIGs of affected components.',
      'Gain the right to become a SIG maintainer.',
      "Becoming a SIG maintainer: Committers who cover multiple code repositories within a SIG and actively contribute to the SIG's technical planning and architectural evolution are eligible to become SIG maintainers.",
    ],

    maintainerTitle: 'Maintainer',
    maintainerSubTitle:
      'Maintainers are the core leaders of a SIG, responsible for technical roadmap planning, community collaboration, and long-term development. They assume all committer responsibilities while leading architectural evolution, quality assurance, and ecosystem adaptation for components. They propel the fulfillment of SIG goals by coordinating resources both within and outside the community.',
    maintainerRequirements: [
      'Work as a committer for at least three months.',
      'Participated in the review of at least 12 PRs as a primary reviewer.',
      'Reviewed or merged at least 30 PRs into the code repository.',
      "Have deep understanding of the SIG's core repository.",
      'Nominate yourself or be nominated by a SIG maintainer with no objection from other maintainers, and be approved at the TC meeting.',
    ],
    maintainerResponsibility: [
      'Chart technical roadmaps for SIG projects, including strategic planning, direction setting, and architectural evolution.',
      'Develop the release plan for SIG projects by pinpointing key requirements, engaging in community PM activities, and aligning the SIG plan with community release milestones.',
      'Engage in community activities and designated openGauss meetings as a SIG representative.',
      'Convene regular SIG meetings to resolve escalated disputes.',
      'Represent the SIG in the Technical Committee and report on its work and progress.',
      'Evaluate the quality and engagement of community contributors to determine their promotion to committers.',
      "Gain the eligibility to join the Technical Committee's election.",
      'Outstanding maintainers are eligible for seats on the Technical Committee.',
    ],
  },
};
