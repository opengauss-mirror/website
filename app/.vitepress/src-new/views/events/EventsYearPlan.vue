<!-- 
:deep(.el-collapse-item__header) {
    padding: 12px 16px;
    border-bottom: none;
    border-radius: var(--o-radius-xs);
    &.is-active {
      border-bottom: none;
    }
  }
  :deep(.el-collapse-item__header) {
    .o-icon {
      margin-right: 8px;
    }
    .header-right-icon {
      margin-right: 0;
      font-size: 24px;
    }
  }
  :deep(.el-collapse-item__arrow) {
    margin-right: 0;
  }
  .el-collapse-item + .el-collapse-item {
    margin-top: 12px;
  }
  :deep(.el-collapse-item__wrap) {
    border-bottom: none;
    border-radius: var(--o-radius-xs);
  }
  .content-box {
    flex-direction: column;
    padding: 0 16px 8px;
  }
  .item-month {
    padding: 0;
  }
  .item-divider {
    &::after {
      display: none;
    }
  }
  .item-none {
    display: none;
  }
  .divider-mb {
    --o-divider-gap: 8px;
  }
  .month-mb {
    color: var(--o-color-info2);
    @include text2;
  }
  .event-box {
    margin-top: 8px;
    position: relative;
    margin-left: 12px;
    &::after {
      content: '';
      position: absolute;
      width: 2px;
      height: 100%;
      background: #3422ff;
      left: -12px;
      top: 0;
    }
  }
  .event-box + .event-box {
    margin-top: 8px;
  }
  .active-name {
    margin-top: 0;
    padding: 0;
    color: var(--o-color-info1);
    background-image: none;
    @include text2;
  }
  .location {
    @include text1;
  }
  .active-name-link {
    color: var(--o-color-link1);
  }

  .content-developer,
  .content-release {
    .active-name {
      background-image: none;
    }
  }

  .content-box-dark {
    .active-name {
      background-image: none;
    }
  }

  .content-developer {
    .event-box {
      &::after {
        background: #ffa122;
      }
    }
  }
  .content-release {
    .event-box {
      &::after {
        background: var(--o-color-link1);
      }
    }
  } 
-->