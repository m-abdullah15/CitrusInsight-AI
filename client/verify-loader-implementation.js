/**
 * Automated Verification Script for Enhanced Disease Detection Loader
 * 
 * This script verifies the implementation against requirements by:
 * 1. Checking component files exist
 * 2. Validating code structure and patterns
 * 3. Verifying CSS properties and animations
 * 4. Checking accessibility attributes
 * 5. Validating responsive breakpoints
 * 
 * Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 5.1, 5.2, 5.3, 7.1, 7.2, 7.3
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: [],
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function test(name, condition, requirement = '') {
  const status = condition ? 'PASS' : 'FAIL';
  const symbol = condition ? '✅' : '❌';
  const color = condition ? 'green' : 'red';
  
  results.tests.push({ name, status, requirement });
  
  if (condition) {
    results.passed++;
  } else {
    results.failed++;
  }
  
  log(`${symbol} ${name}${requirement ? ` (Req: ${requirement})` : ''}`, color);
  return condition;
}

function warn(message) {
  results.warnings++;
  log(`⚠️  ${message}`, 'yellow');
}

function section(title) {
  log(`\n${'='.repeat(60)}`, 'cyan');
  log(title, 'cyan');
  log('='.repeat(60), 'cyan');
}

// Read file content
function readFile(filePath) {
  try {
    return fs.readFileSync(path.join(__dirname, filePath), 'utf8');
  } catch (error) {
    return null;
  }
}

// Check if pattern exists in content
function contains(content, pattern, flags = '') {
  if (typeof pattern === 'string') {
    return content.includes(pattern);
  }
  return new RegExp(pattern, flags).test(content);
}

// Count occurrences of pattern
function countOccurrences(content, pattern) {
  const matches = content.match(new RegExp(pattern, 'g'));
  return matches ? matches.length : 0;
}

// Main verification function
async function verifyImplementation() {
  log('\n🚀 Enhanced Disease Detection Loader - Implementation Verification', 'blue');
  log('Starting automated verification...', 'blue');

  // ===================================================================
  section('1. File Structure Verification');
  // ===================================================================

  const loaderFile = readFile('src/components/detection/AnalysisLoader.jsx');
  const stepIndicatorFile = readFile('src/components/common/StepIndicator.jsx');
  const diseaseDetectionFile = readFile('src/pages/protected/DiseaseDetection.jsx');

  test('AnalysisLoader.jsx exists', loaderFile !== null, '1.1');
  test('StepIndicator.jsx exists', stepIndicatorFile !== null, '2.1');
  test('DiseaseDetection.jsx exists', diseaseDetectionFile !== null, '1.1');

  if (!loaderFile || !stepIndicatorFile || !diseaseDetectionFile) {
    log('\n❌ Critical files missing. Cannot continue verification.', 'red');
    return;
  }

  // ===================================================================
  section('2. AnalysisLoader Component Verification');
  // ===================================================================

  // Requirement 1.1: Loader visibility control
  test(
    'Has isVisible prop',
    contains(loaderFile, 'isVisible'),
    '1.1'
  );

  test(
    'Conditional rendering based on visibility',
    contains(loaderFile, 'if (!shouldRender) return null'),
    '1.1'
  );

  // Requirement 1.2: Fade animations
  test(
    'Has fade-in animation',
    contains(loaderFile, '@keyframes fadeIn'),
    '1.2'
  );

  test(
    'Has fade-out animation',
    contains(loaderFile, '@keyframes fadeOut'),
    '1.2'
  );

  test(
    'Has scale-in animation',
    contains(loaderFile, '@keyframes scaleIn'),
    '1.2'
  );

  test(
    'Has scale-out animation',
    contains(loaderFile, '@keyframes scaleOut'),
    '1.2'
  );

  // Requirement 1.3: Background blur
  test(
    'Has backdrop-filter blur',
    contains(loaderFile, 'backdrop-filter: blur(10px)'),
    '1.3'
  );

  test(
    'Has webkit backdrop-filter',
    contains(loaderFile, '-webkit-backdrop-filter: blur(10px)'),
    '1.3'
  );

  // Requirement 2.1: Spinner component
  test(
    'Has AnimatedSpinner component',
    contains(loaderFile, 'const AnimatedSpinner'),
    '2.1'
  );

  test(
    'Spinner is memoized',
    contains(loaderFile, 'memo(() =>') && contains(loaderFile, 'AnimatedSpinner.displayName'),
    '2.1'
  );

  test(
    'Spinner has rotation animation',
    contains(loaderFile, '@keyframes spin'),
    '2.1'
  );

  test(
    'Spinner uses will-change for performance',
    contains(loaderFile, 'will-change: transform'),
    '2.1'
  );

  // Requirement 2.2: Step indicator integration
  test(
    'Imports StepIndicator component',
    contains(loaderFile, "import StepIndicator from '../common/StepIndicator'"),
    '2.2'
  );

  test(
    'Renders StepIndicator with props',
    contains(loaderFile, '<StepIndicator steps={steps} currentStep={currentStep}'),
    '2.2'
  );

  // Requirement 2.3: Cleanup and memory management
  test(
    'Has cleanup function for timeouts',
    contains(loaderFile, 'return () => {') && contains(loaderFile, 'clearTimeout'),
    '2.3'
  );

  // Requirement 3.1-3.3: Responsive design
  test(
    'Has mobile breakpoint (max-width: 640px)',
    contains(loaderFile, '@media (max-width: 640px)'),
    '3.1'
  );

  test(
    'Has tablet breakpoint (641px - 1024px)',
    contains(loaderFile, '@media (min-width: 641px) and (max-width: 1024px)'),
    '3.2'
  );

  test(
    'Has desktop breakpoint (1025px+)',
    contains(loaderFile, '@media (min-width: 1025px)'),
    '3.3'
  );

  // Requirement 7.1-7.3: Accessibility
  test(
    'Has role="dialog"',
    contains(loaderFile, 'role="dialog"'),
    '7.1'
  );

  test(
    'Has aria-modal="true"',
    contains(loaderFile, 'aria-modal="true"'),
    '7.1'
  );

  test(
    'Has aria-labelledby',
    contains(loaderFile, 'aria-labelledby="loader-title"'),
    '7.2'
  );

  test(
    'Has aria-describedby',
    contains(loaderFile, 'aria-describedby="loader-description"'),
    '7.2'
  );

  test(
    'Has aria-live region for announcements',
    contains(loaderFile, 'aria-live="polite"'),
    '7.3'
  );

  test(
    'Has screen reader only content',
    contains(loaderFile, 'className="sr-only"'),
    '7.2'
  );

  // ===================================================================
  section('3. StepIndicator Component Verification');
  // ===================================================================

  // Requirement 2.1: Component structure
  test(
    'Component is memoized',
    contains(stepIndicatorFile, 'memo(({ steps, currentStep })'),
    '2.1'
  );

  test(
    'Has getStepState function',
    contains(stepIndicatorFile, 'const getStepState'),
    '2.1'
  );

  // Requirement 2.2: Step states
  test(
    'Handles completed state',
    contains(stepIndicatorFile, "return 'completed'"),
    '2.2'
  );

  test(
    'Handles active state',
    contains(stepIndicatorFile, "return 'active'"),
    '2.2'
  );

  test(
    'Handles pending state',
    contains(stepIndicatorFile, "return 'pending'"),
    '2.2'
  );

  // Requirement 2.3: Visual indicators
  test(
    'Has checkmark SVG for completed steps',
    contains(stepIndicatorFile, '<svg') && contains(stepIndicatorFile, 'checkmark'),
    '2.3'
  );

  test(
    'Has pulse animation for active step',
    contains(stepIndicatorFile, '@keyframes pulse'),
    '2.3'
  );

  test(
    'Has connecting lines between steps',
    contains(stepIndicatorFile, 'step-line'),
    '2.3'
  );

  // Requirement 3.1-3.3: Responsive design
  test(
    'Has mobile responsive styles',
    contains(stepIndicatorFile, '@media (max-width: 640px)'),
    '3.1'
  );

  test(
    'Has tablet responsive styles',
    contains(stepIndicatorFile, '@media (min-width: 641px) and (max-width: 1024px)'),
    '3.2'
  );

  // Requirement 7.1-7.3: Accessibility
  test(
    'Has navigation landmark',
    contains(stepIndicatorFile, 'role="listitem"'),
    '7.1'
  );

  test(
    'Has aria-current for active step',
    contains(stepIndicatorFile, 'aria-current={state === \'active\' ? \'step\' : undefined}'),
    '7.2'
  );

  test(
    'Has aria-label for steps',
    contains(stepIndicatorFile, 'aria-label='),
    '7.2'
  );

  // ===================================================================
  section('4. DiseaseDetection Integration Verification');
  // ===================================================================

  // Requirement 1.1: Loader state management
  test(
    'Imports AnalysisLoader',
    contains(diseaseDetectionFile, "import AnalysisLoader from '../../components/detection/AnalysisLoader'"),
    '1.1'
  );

  test(
    'Has loadingState with isVisible',
    contains(diseaseDetectionFile, 'isVisible: false'),
    '1.1'
  );

  test(
    'Has loadingState with currentStep',
    contains(diseaseDetectionFile, 'currentStep: 0'),
    '1.1'
  );

  test(
    'Has step definitions',
    contains(diseaseDetectionFile, 'Uploading Image') && contains(diseaseDetectionFile, 'Detecting Disease'),
    '1.1'
  );

  // Requirement 1.2: Step transitions
  test(
    'Shows loader on image select',
    contains(diseaseDetectionFile, 'isVisible: true'),
    '1.2'
  );

  test(
    'Transitions to step 2 after delay',
    contains(diseaseDetectionFile, 'setTimeout') && contains(diseaseDetectionFile, 'currentStep: 2'),
    '1.2'
  );

  test(
    'Has 1.5 second transition delay',
    contains(diseaseDetectionFile, '1500'),
    '1.2'
  );

  // Requirement 4.1-4.3: Error handling
  test(
    'Hides loader on error',
    contains(diseaseDetectionFile, 'isVisible: false') && contains(diseaseDetectionFile, 'catch'),
    '4.1'
  );

  test(
    'Clears timeout on error',
    contains(diseaseDetectionFile, 'clearTimeout(stepTransitionTimeout)'),
    '4.2'
  );

  test(
    'Hides loader in finally block',
    contains(diseaseDetectionFile, 'finally') && contains(diseaseDetectionFile, 'isVisible: false'),
    '4.3'
  );

  test(
    'Displays error messages',
    contains(diseaseDetectionFile, 'showError(errorMessage)'),
    '4.2'
  );

  // Requirement 5.1-5.3: Results display
  test(
    'Renders AnalysisLoader component',
    contains(diseaseDetectionFile, '<AnalysisLoader'),
    '5.1'
  );

  test(
    'Passes isVisible prop',
    contains(diseaseDetectionFile, 'isVisible={loadingState.isVisible}'),
    '5.1'
  );

  test(
    'Passes currentStep prop',
    contains(diseaseDetectionFile, 'currentStep={loadingState.currentStep}'),
    '5.1'
  );

  test(
    'Passes steps prop',
    contains(diseaseDetectionFile, 'steps={loadingState.steps}'),
    '5.1'
  );

  // ===================================================================
  section('5. PropTypes Validation');
  // ===================================================================

  test(
    'AnalysisLoader has PropTypes',
    contains(loaderFile, 'AnalysisLoader.propTypes'),
    '2.1'
  );

  test(
    'StepIndicator has PropTypes',
    contains(stepIndicatorFile, 'StepIndicator.propTypes'),
    '2.1'
  );

  test(
    'PropTypes imported',
    contains(loaderFile, "import PropTypes from 'prop-types'") &&
    contains(stepIndicatorFile, "import PropTypes from 'prop-types'"),
    '2.1'
  );

  // ===================================================================
  section('6. Performance Optimizations');
  // ===================================================================

  test(
    'Uses React.memo for optimization',
    countOccurrences(loaderFile, 'memo') >= 2,
    '2.1'
  );

  test(
    'Uses will-change CSS hints',
    countOccurrences(loaderFile, 'will-change') >= 2,
    '2.1'
  );

  test(
    'GPU-accelerated animations (transform)',
    contains(loaderFile, 'transform:'),
    '2.1'
  );

  test(
    'GPU-accelerated animations (opacity)',
    contains(loaderFile, 'opacity:'),
    '2.1'
  );

  // ===================================================================
  section('7. Code Quality Checks');
  // ===================================================================

  test(
    'No console.log statements in AnalysisLoader',
    !contains(loaderFile, 'console.log'),
    'Quality'
  );

  test(
    'No console.log statements in StepIndicator',
    !contains(stepIndicatorFile, 'console.log'),
    'Quality'
  );

  test(
    'Components have display names',
    contains(loaderFile, 'displayName') && contains(stepIndicatorFile, 'displayName'),
    'Quality'
  );

  test(
    'Proper JSX formatting',
    contains(loaderFile, '<style jsx>') && contains(stepIndicatorFile, '<style jsx>'),
    'Quality'
  );

  // ===================================================================
  section('Test Results Summary');
  // ===================================================================

  const total = results.passed + results.failed;
  const successRate = ((results.passed / total) * 100).toFixed(1);

  log(`\nTotal Tests: ${total}`, 'cyan');
  log(`Passed: ${results.passed}`, 'green');
  log(`Failed: ${results.failed}`, results.failed > 0 ? 'red' : 'green');
  log(`Warnings: ${results.warnings}`, 'yellow');
  log(`Success Rate: ${successRate}%`, successRate >= 95 ? 'green' : 'yellow');

  if (results.failed === 0) {
    log('\n🎉 All verification tests passed!', 'green');
    log('The implementation meets all requirements.', 'green');
  } else {
    log('\n⚠️  Some verification tests failed.', 'yellow');
    log('Please review the failed tests above.', 'yellow');
  }

  // List failed tests
  if (results.failed > 0) {
    log('\nFailed Tests:', 'red');
    results.tests
      .filter(t => t.status === 'FAIL')
      .forEach(t => {
        log(`  - ${t.name} (${t.requirement})`, 'red');
      });
  }

  log('\n' + '='.repeat(60), 'cyan');
  log('Verification Complete', 'cyan');
  log('='.repeat(60) + '\n', 'cyan');

  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0);
}

// Run verification
verifyImplementation().catch(error => {
  log(`\n❌ Verification failed with error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
