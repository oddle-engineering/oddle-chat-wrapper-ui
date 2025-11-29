/**
 * Tolgee CLI Test Script
 * 
 * This script tests Tolgee CLI connectivity and available commands.
 * Run with: node test-tolgee-cli.js
 */

const { execSync } = require('child_process');
const fs = require('fs');

// ANSI color codes
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m', 
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  log(`\n🔧 Testing: ${description}`, 'blue');
  log(`Command: ${command}`, 'cyan');
  
  try {
    const output = execSync(command, { 
      encoding: 'utf8', 
      timeout: 10000,
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    log('✅ Success:', 'green');
    log(output.trim(), 'reset');
    return true;
  } catch (error) {
    log('❌ Failed:', 'red');
    log(error.message, 'red');
    if (error.stdout) {
      log('stdout:', 'yellow');
      log(error.stdout, 'reset');
    }
    if (error.stderr) {
      log('stderr:', 'yellow'); 
      log(error.stderr, 'reset');
    }
    return false;
  }
}

async function testTolgeeCLI() {
  log('\n🧪 Tolgee CLI Test Suite', 'bold');
  log('='.repeat(50), 'cyan');

  // Check if .env.local exists
  const envLocalExists = fs.existsSync('.env.local');
  if (!envLocalExists) {
    log('\n⚠️  Warning: .env.local not found', 'yellow');
    log('Creating .env.local from .env.example for testing...', 'cyan');
    
    try {
      const envExample = fs.readFileSync('.env.example', 'utf8');
      fs.writeFileSync('.env.local', envExample);
      log('✅ Created .env.local from .env.example', 'green');
      log('🚨 Remember to add your actual API key!', 'red');
    } catch (error) {
      log('❌ Failed to create .env.local', 'red');
      return;
    }
  }

  // Test available Tolgee CLI commands
  const commands = [
    {
      cmd: 'npx tolgee --help',
      desc: 'Tolgee CLI help (check installation)'
    },
    {
      cmd: 'npm run i18n:status',
      desc: 'Check Tolgee project status'
    },
    {
      cmd: 'npm run i18n:extract',
      desc: 'Extract translation keys from source code'
    }
  ];

  let successCount = 0;
  
  for (const { cmd, desc } of commands) {
    if (runCommand(cmd, desc)) {
      successCount++;
    }
  }

  log('\n📊 CLI Test Summary', 'bold');
  log('='.repeat(30), 'cyan');
  log(`Successful commands: ${successCount}/${commands.length}`, 
       successCount === commands.length ? 'green' : 'yellow');

  if (successCount === commands.length) {
    log('\n🎉 All CLI tests passed!', 'green');
    log('\nNext steps for full testing:', 'blue');
    log('1. Add your real Tolgee API key to .env.local', 'cyan');
    log('2. Run: npm run i18n:status', 'cyan');
    log('3. Run: npm run i18n:pull', 'cyan');
    log('4. Run: npm run showcase', 'cyan');
  } else {
    log('\n⚠️  Some CLI commands failed.', 'yellow');
    log('This may be due to missing API credentials or network issues.', 'cyan');
    log('Check your .env.local configuration.', 'cyan');
  }

  log('\n📖 Available Tolgee Commands:', 'blue');
  log('npm run i18n:extract - Extract keys from code', 'cyan');
  log('npm run i18n:push    - Push translations to Tolgee', 'cyan');
  log('npm run i18n:pull    - Pull translations from Tolgee', 'cyan');
  log('npm run i18n:sync    - Extract and push in one command', 'cyan');
  log('npm run i18n:update  - Pull latest translations', 'cyan');
  log('npm run i18n:status  - Check translation status', 'cyan');
  log('npm run i18n:init    - Initialize Tolgee config', 'cyan');
}

if (require.main === module) {
  testTolgeeCLI().catch(error => {
    log(`\n💥 CLI test execution failed: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = { testTolgeeCLI };