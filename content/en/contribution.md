+++
title = "Contributions to the Community"
+++

This document provides guidance for you to contribute to the openGauss community.

# Welcome <a name="Welcome"></a>

Welcome to openGauss!

- [Welcome <a name="Welcome"></a>](#welcome)
- [Before You Start <a name="Before_You_Start"></a>](#before-you-start)
  - [Signing the Contributor License Agreement (CLA) <a name="Signing_the_CLA"></a>](#signing-the-contributor-license-agreement-cla)
  - [Community Code of Conduct <a name="Code_of_Conduct"></a>](#community-code-of-conduct)
- [Starting Your Contribution <a name="Starting_Your_Contribution"></a>](#starting-your-contribution)
  - [Finding Your Interests <a name="Finding_Your_Interests"></a>](#finding-your-interests)
    - [Konwing SIG <a name="Knowing_SIG"></a>](#konwing-sig)
    - [Finding Your SIG <a name="Finding_Your_SIG"></a>](#finding-your-sig)
  - [Starting Your Contribution <a name="Starting_Your_Contribution_1"></a>](#starting-your-contribution-1)
    - [Assigning an Issue to Yourself <a name="Assigning_an_Issue_to_Yourself"></a>](#assigning-an-issue-to-yourself)
    - [Submitting Issues <a name="Submitting_Issues"></a>](#submitting-issues)
    - [Establishing the Development Environment <a name="Establishing_the_Development_Environment"></a>](#establishing-the-development-environment)
      - [Installing openGauss <a name="Installing_openGauss"></a>](#installing-opengauss)
    - [Participating in Code Contribution <a name="Participating_in_Code_Contribution"></a>](#participating-in-code-contribution)
      - [Precautions for SIG Development <a name="Precautions_for_SIG_Development"></a>](#precautions-for-sig-development)
      - [Downloading Code and Pulling a Branch <a name="Downloading_Code_and_Pulling_a_Branch"></a>](#downloading-code-and-pulling-a-branch)
      - [Submitting a PR <a name="Submitting_a_Pull-Request"></a>](#submitting-a-pr)
    - [Reviewing Code <a name="Reviewing_Code"></a>](#reviewing-code)
    - [Participating in Non-Code Contributions <a name="Participating_in_Non-Code_Contributions"></a>](#participating-in-non-code-contributions)
  - [Participating in Community Activities <a name="Participating_in_Community_Activities"></a>](#participating-in-community-activities)
    - [Communication Methods in Community <a name="Communication_Methods_in_Community"></a>](#communication-methods-in-community)
    - [Community News and Events <a name="Community_News_and_Events"></a>](#community-news-and-events)
- [Feedback <a name="Feedback"></a>](#feedback)



# Before You Start <a name="Before_You_Start"></a>

Welcome to openGauss!



## Signing the Contributor License Agreement (CLA) <a name="Signing_the_CLA"></a>

Please sign the [Contributor License Agreement (CLA)](https://opengauss.org/en/cla.html) before participating in the community contribution.



## Community Code of Conduct <a name="Code_of_Conduct"></a>

openGauss is an open-source community. It fully relies on the friendly development and collaboration environment provided by the community. Before contributing to the community, read and comply with the [Code of Conduct](https://gitee.com/opengauss/community/blob/master/code-of-conduct.md) of openGauss community.



# Starting Your Contribution <a name="Starting_Your_Contribution"></a>

**Welcome to join us anytime!**

There are always documents to be improved (such as this document you are reading), code to be reviewed, functions or variables to be refactored or commented, and test cases to be supplemented and optimized. We will help you understand the openGauss SIG and guide you through your first contribution. So if you are interested, take action now.



## Finding Your Interests <a name="Finding_Your_Interests"></a>

### Konwing SIG <a name="Knowing_SIG"></a>

SIG is short for Special Interest Group. The openGauss community is organized based on different SIGs, facilitating the management and improvement of working processes.

- SIGs are open to everyone to make contributions.
- SIGs are established for one or more specific technical topics. SIG members promote the output of deliverables and strive to make the deliverables a part of the release of the openGauss community.
- Core SIG members lead the governance. For details, see [SIG Role Description](). You can accumulate experience and improve your influence while making contributions.
- Each SIG has one or more projects on Gitee, and these projects have one or more repositories. The SIG deliverables are stored in these repositories.
- Issues can be submitted in the repository corresponding to the SIG where specific issues can be discussed, submitted, resolved, and reviewed.
- You can also communicate with SIG members through mail lists, IRC or video meetings.



### Finding Your SIG <a name="Finding_Your_SIG"></a>

Find a SIG you are interested in so that you can raise questions in the right place and get faster community response.

- **Method 1**: If you do not know what SIGs or projects are available, you can view the [SIG List](https://opengauss.org/en/sig.html) which contains all SIGs established in the openGauss community. You can quickly locate a SIG of the field that you are interested in through the list. In addition, the following SIG information is provided:
  
  - SIG projects and repository locations of the projects
  - Communication methods in the SIG, including mail lists, IRC, and video meetings
  - Maintainer contact information
  
- **Method 2**: If you know the name of a project, perform a fuzzy search in the repository list of openGauss to quickly locate the home page address of the project. Generally, you can find the SIG information, communication method, members, and contact information of the project in the `README.md` file on the home page.

  

  If you cannot locate the SIG that you are interested in using either of the preceding methods, send a help email to community@opengauss.org. You are advised to use [Question of Development Process] as the title in the email and write down features of the SIG or project you are looking for. We will help you.



## Starting Your Contribution <a name="Starting_Your_Contribution_1"></a>

### Assigning an Issue to Yourself <a name="Assigning_an_Issue_to_Yourself"></a>

- **Finding an issue list**: Click **Issues** to find the SIG issue list (for example, the issue list address of the community team is https://gitee.com/opengauss/community/issues).

- **Assigning an issue**: If you want to process one of the issues, you can assign it to yourself. Enter `/assign` or `/assign @yourself` in the comment box. The robot will assign the issue to you and your name will be displayed in the owner list.
- **Discussing an issue**: Participants communicate and discuss on each issue page. You can leave your opinions in the comment box.



### Submitting Issues <a name="Submitting_Issues"></a>

- **Problems**: You can report a problem or defect to the community by creating an issue. Submit the issue to the issue list of the project repository and view the [Issue Submission Guide](https://gitee.com/opengauss/community/blob/master/en/contributors/issue-submit.md) to obtain more information. When submitting an issue, **please comply with** the issue submission guidelines.
- **Suggestions**: You can submit an issue to share your own comments or suggestions on SIGs. Everyone can fully communicate and discuss this issue. To attract more attention, you can attach the issue link to an email and send the email to all users through the mail list.



### Establishing the Development Environment <a name="Establishing_the_Development_Environment"></a>

#### Installing openGauss <a name="Installing_openGauss"></a> 

For details, see [Downloading and Installing openGauss](https://opengauss.org/en/download.html).


### Participating in Code Contribution <a name="Participating_in_Code_Contribution"></a>

#### Precautions for SIG Development <a name="Precautions_for_SIG_Development"></a>

The coding language, development environment, and coding conventions used by projects may vary in each SIG. If you want to know and participate in the code contribution, find the contributor guide provided by the project for developers. This guide is generally provided as the `CONTRIBUTING.md` file on the SIG home page, alternatively, you can find it in the `README.md` file of the project. (For details about how to find the repository of the project, see [Finding Your Interests](#Finding_Your_Interests).)

In addition to these files, the SIG may provide other guidance information which is located in the specific community directory of SIG or project. If you do not find any related information or have any questions, submit an issue in the SIG or send the question to the mail list of the SIG to which the project belongs. If you do not receive any response for a long time, contact community@opengauss.org.



#### Downloading Code and Pulling a Branch <a name="Downloading_Code_and_Pulling_a_Branch"></a>

To contribute code, you need to know how to download code from Gitee and integrate code through a Pull Request (PR). openGauss uses the Gitee code hosting platform. For details, see [Gitee Workflow Guide](https://gitee.com/opengauss/community/blob/master/en/contributors/gitee-workflow.md). The method of using the hosting platform is similar to that of using GitHub. If you have used GitHub, skip this section.


#### Submitting a PR <a name="Submitting_a_Pull-Request"></a>

When you submit a PR, it means that you have started to contribute code to the community. For details, see [openGauss Community PR Submission Guide](https://gitee.com/openGauss/community/blob/master/en/contributors/pull-request.md).



### Reviewing Code <a name="Reviewing_Code"></a>

openGauss is an open community. We hope that all participants in the community are active reviewers. [Community Member]() describes the roles and responsibilities of different contributors.

**For contributors**, to make your submissions more acceptable, you need to:

+ Comply with the SIG coding conventions, if any.
+ Prepare complete submission information.
+ If a large amount of code needs to be submitted at a time, it is recommended that you break down large content into a series of logically small content and submit them separately to help reviewers understand your ideas.
+ Use appropriate SIG and monitor labels to mark PRs: The community robot will send you a message to help you better complete the entire PR process.



**For reviewers**, it is strongly recommended that you surpass yourselves, respect each other, and promote collaboration in accordance with the [Code of Conduct](https://gitee.com/opengauss/community/blob/master/code-of-conduct.md). [The Gentle Art Of Patch Review](https://sage.thesharps.us/2014/09/01/the-gentle-art-of-patch-review/) puts forward a series of review focuses, explaining that the review is to promote the participation of new contributors and prevent the contributors from being overwhelmed by subtle errors at the beginning. Therefore, when you review PRs, focus on the following:

+ Is the idea of the contribution reasonable?
+ Whether the contribution architecture is correct?
+ Whether the contribution is complete?

Note: If your PR does not draw enough attention, you can seek help through the SIG mail list.


### Participating in Non-Code Contributions <a name="Participating_in_Non-Code_Contributions"></a>

If you are not interested in compiling code, you can find interesting work in [Non-Code Contributions](https://gitee.com/opengauss/community/blob/master/en/contributors/non-code-contributions.md).


## Participating in Community Activities <a name="Participating_in_Community_Activities"></a>

### Communication Methods in Community <a name="Communication_Methods_in_Community"></a>

The openGauss community supports communication through mail lists, IRC, and video meetings. For details, see [Community Communication Guide]().



### Community News and Events <a name="Community_News_and_Events"></a>

The information about openGauss community and technical communication meetings and other community events can be found on the [openGauss News](https://opengauss.org/en/news.html) page.



# Feedback <a name="Feedback"></a>

If you have any questions about the developer guide or the development process, please feel free to contact us (community@opengauss.org), use [Question of Development Process] as the title, and write down your questions and doubts in the email. The openGauss community operation team will try the best to answer your questions.
