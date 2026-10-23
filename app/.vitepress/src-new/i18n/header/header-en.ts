import { markRaw } from 'vue';
import { ATOMGIT_LINK, GITHUB_LINK } from '~@/data/url-config';

import IconOutLink from '~icons/app-new/icon-out-link.svg';

const OutLink = markRaw(IconOutLink);

export default {
  MORE: 'More',
  QUICKLINK: 'Quick Links',
  CODE: 'Code',
  SEARCH: {
    BROWSEHISTORY: 'History',
    CLEAN: 'Clean up',
    TOPSEARCH: 'Top search',
    CHANGE: 'Change',
    PLACEHOLDER: 'Please enter the content',
    PLACEHOLDER_EXTEND: 'Please enter the content',
    TEXT: 'Search',
  },
  SOURCE_CODE: [
    {
      NAME: 'AtomGit',
      PATH: `${ATOMGIT_LINK}/opengauss`,
      ICON: OutLink,
    },

    {
      NAME: 'Github',
      PATH: `${GITHUB_LINK}/opengauss-mirror`,
      ICON: OutLink,
    },
  ],
};
