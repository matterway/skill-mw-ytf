export const SELECTORS = {
  navigateToProjectManagement: {
    projects: 'span[title="Projects"]',
    xAddRecordsBtn: '//a[contains(text(), "Add record")]',
  },
  createEntries: {
    projectName: '[name="projectname"]',
    startDate: '[name="startdate"]',
    targetEndDate: '[name="targetenddate"]',
    budget: '[name="targetbudget"]',
    xSaveBtn: '//button//*[contains(text(), "Save")]',
    xProjectsBreadcrumb:
      '//li[@class="breadcrumb-item u-text-ellipsis"]//a[contains(text(), "Projects")]',
  },
  highlightCreatedEntries: {
    xProjectName: (projectName: string) =>
      `//table[contains(@class, 'listViewEntriesTable')]//a[contains(text(), "${projectName}")]`,
  },
};
