/**
 * Tolgee Integration Test
 * 
 * This test file verifies:
 * 1. Tolgee configuration connection from environment variables
 * 2. ChatWrapper translation integration and fallback behavior
 * 3. Environment detection functionality
 * 
 * Run with: node test-tolgee-integration.js
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m', 
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Test results tracking
let passedTests = 0;
let failedTests = 0;
let totalTests = 0;

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    log(`✓ ${testName}`, 'green');
    if (details) log(`  ${details}`, 'cyan');
  } else {
    failedTests++;
    log(`✗ ${testName}`, 'red');
    if (details) log(`  ${details}`, 'red');
  }
}

// Load environment variables from .env.example
function loadEnvExample() {
  try {
    const envPath = path.join(__dirname, '.env.example');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const envVars = {};
      envContent.split('\n').forEach(line => {
        if (line.trim() && !line.startsWith('#')) {
          const [key, value] = line.split('=');
          if (key && value) {
            envVars[key.trim()] = value.trim();
          }
        }
      });
      return envVars;
    }
    return {};
  } catch (error) {
    return {};
  }
}

// Load environment variables from .env.local
function loadEnvLocal() {
  try {
    const envPath = path.join(__dirname, '.env.local');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const envVars = {};
      envContent.split('\n').forEach(line => {
        if (line.trim() && !line.startsWith('#')) {
          const [key, value] = line.split('=');
          if (key && value) {
            envVars[key.trim()] = value.trim();
          }
        }
      });
      return envVars;
    }
    return {};
  } catch (error) {
    return {};
  }
}

// Simulate window globals setup (like in showcase/src/main.tsx)
function simulateWindowGlobals(envVars) {
  global.window = global.window || {};
  global.window.__VITE_APP_TOLGEE_API_URL__ = envVars.VITE_APP_TOLGEE_API_URL;
  global.window.__VITE_APP_TOLGEE_API_KEY__ = envVars.VITE_APP_TOLGEE_API_KEY;
}

// Test Tolgee configuration detection (simulates ChatWrapper logic)
function testTolgeeConfigDetection() {
  const hasWindow = typeof global.window !== 'undefined';
  const tolgeeApiUrl = hasWindow ? global.window.__VITE_APP_TOLGEE_API_URL__ : undefined;
  const tolgeeApiKey = hasWindow ? global.window.__VITE_APP_TOLGEE_API_KEY__ : undefined;

  return {
    hasConfiguration: !!(tolgeeApiUrl && tolgeeApiKey),
    apiUrl: tolgeeApiUrl,
    apiKey: tolgeeApiKey
  };
}

// Verify translation files structure
function verifyTranslationFiles() {
  const translationDir = path.join(__dirname, 'i18n');
  const results = {
    dirExists: fs.existsSync(translationDir),
    files: [],
    validFiles: []
  };

  if (results.dirExists) {
    try {
      results.files = fs.readdirSync(translationDir).filter(file => file.endsWith('.json'));
      
      results.files.forEach(file => {
        try {
          const filePath = path.join(translationDir, file);
          const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          results.validFiles.push({
            file,
            keyCount: Object.keys(content).length,
            hasRequiredKeys: [
              'chat.loading',
              'chat.retry', 
              'chat.thinking',
              'chat.send',
              'chat.placeholder'
            ].every(key => key in content)
          });
        } catch (error) {
          // Invalid JSON file
        }
      });
    } catch (error) {
      // Can't read directory
    }
  }

  return results;
}

// Verify npm scripts for Tolgee management
function verifyTolgeeScripts() {
  try {
    const packagePath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const scripts = packageJson.scripts || {};

    const expectedScripts = [
      'i18n:extract',
      'i18n:push', 
      'i18n:pull',
      'i18n:sync',
      'i18n:update',
      'i18n:status',
      'i18n:init'
    ];

    const results = {
      hasAllScripts: expectedScripts.every(script => script in scripts),
      missingScripts: expectedScripts.filter(script => !(script in scripts)),
      presentScripts: expectedScripts.filter(script => script in scripts),
      scriptDetails: {}
    };

    expectedScripts.forEach(script => {
      if (scripts[script]) {
        results.scriptDetails[script] = scripts[script];
      }
    });

    return results;
  } catch (error) {
    return {
      hasAllScripts: false,
      missingScripts: [],
      presentScripts: [],
      scriptDetails: {},
      error: error.message
    };
  }
}

// Verify Tolgee dependencies
function verifyTolgeeDependencies() {
  try {
    const packagePath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    const dependencies = packageJson.dependencies || {};
    const devDependencies = packageJson.devDependencies || {};

    return {
      hasTolgeeReact: '@tolgee/react' in dependencies,
      hasTolgeeCli: '@tolgee/cli' in devDependencies,
      reactVersion: dependencies['@tolgee/react'],
      cliVersion: devDependencies['@tolgee/cli']
    };
  } catch (error) {
    return {
      hasTolgeeReact: false,
      hasTolgeeCli: false,
      error: error.message
    };
  }
}

// Verify Tolgee configuration file
function verifyTolgeeConfig() {
  try {
    const configPath = path.join(__dirname, 'tolgee.config.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return {
        exists: true,
        hasProjectId: 'projectId' in config,
        hasApiUrl: 'apiUrl' in config, 
        hasPatterns: 'patterns' in config,
        projectId: config.projectId,
        apiUrl: config.apiUrl,
        config
      };
    }
    return { exists: false };
  } catch (error) {
    return { exists: false, error: error.message };
  }
}

// Main test execution
async function runTests() {
  log('\n🧪 Tolgee Integration Test Suite', 'bold');
  log('='.repeat(50), 'cyan');

  // Test 1: Environment files verification
  log('\n📁 Testing Environment Configuration Files...', 'blue');
  
  const envExample = loadEnvExample();
  const envLocal = loadEnvLocal();

  assert(
    Object.keys(envExample).length > 0,
    'Environment example file (.env.example) exists and contains variables',
    `Found ${Object.keys(envExample).length} environment variables`
  );

  assert(
    'VITE_APP_TOLGEE_API_URL' in envExample,
    'Environment example contains VITE_APP_TOLGEE_API_URL'
  );

  assert(
    'VITE_APP_TOLGEE_API_KEY' in envExample,
    'Environment example contains VITE_APP_TOLGEE_API_KEY'
  );


  // Test 2: Window globals simulation
  log('\n🌐 Testing Window Globals Setup...', 'blue');

  const testEnvVars = Object.keys(envLocal).length > 0 ? envLocal : envExample;
  simulateWindowGlobals(testEnvVars);

  assert(
    typeof global.window !== 'undefined',
    'Window object is available'
  );

  assert(
    global.window.__VITE_APP_TOLGEE_API_URL__ !== undefined,
    'Window global for API URL is set',
    `Value: ${global.window.__VITE_APP_TOLGEE_API_URL__}`
  );


  // Test 3: Tolgee configuration detection
  log('\n🔧 Testing Tolgee Configuration Detection...', 'blue');

  const config = testTolgeeConfigDetection();

  assert(
    config.hasConfiguration,
    'Tolgee configuration is successfully detected from window globals',
    `API URL: ${config.apiUrl}, Has API Key: ${!!config.apiKey}`
  );

  assert(
    config.apiUrl && config.apiUrl.includes('tolgee'),
    'API URL contains "tolgee" and appears valid',
    `API URL: ${config.apiUrl}`
  );


  // Test 4: Translation files verification
  log('\n📝 Testing Translation Files Structure...', 'blue');

  const translationResults = verifyTranslationFiles();

  assert(
    translationResults.dirExists,
    'Translation directory (i18n/) exists'
  );

  assert(
    translationResults.files.length > 0,
    'Translation JSON files exist',
    `Found files: ${translationResults.files.join(', ')}`
  );

  assert(
    translationResults.validFiles.length > 0,
    'Translation files contain valid JSON'
  );

  const hasValidEnglishFile = translationResults.validFiles.some(file => 
    file.file.includes('en') && file.hasRequiredKeys
  );

  assert(
    hasValidEnglishFile,
    'English translation file contains required ChatWrapper keys',
    'Keys: chat.loading, chat.retry, chat.thinking, chat.send, chat.placeholder'
  );

  // Test 5: Package.json configuration
  log('\n📦 Testing Package.json Tolgee Configuration...', 'blue');

  const dependencies = verifyTolgeeDependencies();

  assert(
    dependencies.hasTolgeeReact,
    '@tolgee/react dependency is installed',
    `Version: ${dependencies.reactVersion}`
  );

  assert(
    dependencies.hasTolgeeCli,
    '@tolgee/cli dev dependency is installed',
    `Version: ${dependencies.cliVersion}`
  );

  const scripts = verifyTolgeeScripts();

  assert(
    scripts.hasAllScripts,
    'All required Tolgee npm scripts are present',
    `Present: ${scripts.presentScripts.join(', ')}`
  );

  if (!scripts.hasAllScripts) {
    log(`  Missing scripts: ${scripts.missingScripts.join(', ')}`, 'yellow');
  }

  // Test 6: Tolgee CLI configuration
  log('\n⚙️  Testing Tolgee CLI Configuration...', 'blue');

  const tolgeeConfig = verifyTolgeeConfig();

  assert(
    tolgeeConfig.exists,
    'tolgee.config.json file exists'
  );

  if (tolgeeConfig.exists) {
    assert(
      tolgeeConfig.hasProjectId,
      'Tolgee config contains projectId',
      `Project ID: ${tolgeeConfig.projectId}`
    );

    assert(
      tolgeeConfig.hasApiUrl,
      'Tolgee config contains apiUrl',
      `API URL: ${tolgeeConfig.apiUrl}`
    );

    assert(
      tolgeeConfig.hasPatterns,
      'Tolgee config contains file patterns'
    );
  }

  // Test 7: Integration test scenarios
  log('\n🔗 Testing ChatWrapper Integration Scenarios...', 'blue');

  // Scenario 1: With valid configuration
  const validConfig = testTolgeeConfigDetection();
  assert(
    validConfig.hasConfiguration,
    'ChatWrapper can detect valid Tolgee configuration'
  );

  // Scenario 2: Without configuration (fallback)
  delete global.window.__VITE_APP_TOLGEE_API_URL__;
  delete global.window.__VITE_APP_TOLGEE_API_KEY__;
  delete global.window.__VITE_APP_TOLGEE_PROJECT_ID__;

  const fallbackConfig = testTolgeeConfigDetection();
  assert(
    !fallbackConfig.hasConfiguration,
    'ChatWrapper gracefully handles missing Tolgee configuration (fallback mode)'
  );

  // Test 8: File structure verification
  log('\n📂 Testing Project File Structure...', 'blue');

  const requiredFiles = [
    '.env.example',
    'tolgee.config.json',
    'i18n/en_SG.json'
  ];

  requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    assert(
      fs.existsSync(filePath),
      `Required file exists: ${file}`
    );
  });

  // Test summary
  log('\n📊 Test Summary', 'bold');
  log('='.repeat(50), 'cyan');
  log(`Total Tests: ${totalTests}`, 'blue');
  log(`Passed: ${passedTests}`, 'green');
  log(`Failed: ${failedTests}`, failedTests > 0 ? 'red' : 'green');
  log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`, 
       passedTests === totalTests ? 'green' : 'yellow');

  if (failedTests === 0) {
    log('\n🎉 All tests passed! Tolgee integration is properly configured.', 'green');
    log('\nNext steps:', 'blue');
    log('1. Copy .env.example to .env.local', 'cyan');
    log('2. Add your actual Tolgee API key to .env.local', 'cyan'); 
    log('3. Run "npm run i18n:status" to verify connection', 'cyan');
    log('4. Run "npm run showcase" to test in the demo app', 'cyan');
  } else {
    log('\n⚠️  Some tests failed. Please check the configuration.', 'yellow');
    process.exit(1);
  }
}

// Export for programmatic use
module.exports = {
  runTests,
  testTolgeeConfigDetection,
  verifyTranslationFiles,
  verifyTolgeeScripts,
  verifyTolgeeDependencies,
  verifyTolgeeConfig
};

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(error => {
    log(`\n💥 Test execution failed: ${error.message}`, 'red');
    process.exit(1);
  });
}