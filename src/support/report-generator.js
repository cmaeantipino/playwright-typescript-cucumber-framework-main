const fs = require('fs');
const path = require('path');

const jsonReportPath = path.resolve('reports', 'cucumber-report.json');

if (!fs.existsSync(jsonReportPath)) {
  console.error('❌ Cucumber JSON report not found. Run tests first: npm test');
  process.exit(1);
}

async function generateReport() {
  const { generate } = await import('multiple-cucumber-html-reporter');

  generate({
    jsonDir: path.resolve('reports'),
    reportPath: path.resolve('reports', 'html'),
    pageTitle: 'Playwright BDD Test Report',
    reportName: 'Playwright Cucumber BDD - Test Execution Report',
    displayDuration: true,
    displayReportTime: true,
    pageFooter: '<div><p>Playwright + Cucumber BDD Framework</p></div>',
    customData: {
      title: 'Run Info',
      data: [
        { label: 'Project', value: 'Playwright Cucumber BDD' },
        { label: 'Platform', value: process.platform },
        { label: 'Node Version', value: process.version },
        { label: 'Execution Date', value: new Date().toLocaleString() },
      ],
    },
    metadata: {
      browser: {
        name: 'chromium',
        version: 'latest',
      },
      device: 'Local Machine',
      platform: {
        name: process.platform === 'win32' ? 'windows' : process.platform,
        version: '',
      },
    },
  });

  console.log('✅ HTML report generated at: reports/html/index.html');
}

generateReport().catch((err) => {
  console.error('❌ Report generation failed:', err);
  process.exit(1);
});
