#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

/**
 * Interactive release helper
 */
function releaseHelper() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'status':
      checkStatus();
      break;
    case 'prepare':
      prepareRelease();
      break;
    case 'clean':
      cleanWorkspace();
      break;
    case 'info':
      showInfo();
      break;
    default:
      showHelp();
  }
}

function checkStatus() {
  console.log('🔍 Checking release readiness...\n');
  
  // Check git status
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim() === '') {
      console.log('✅ Git working directory is clean');
    } else {
      console.log('❌ Git working directory has uncommitted changes');
      console.log(status);
    }
  } catch (error) {
    console.log('❌ Git status check failed');
  }

  // Check if tests pass (when implemented)
  console.log('ℹ️  Tests: Will be implemented in Phase 1.4');
  
  // Check build
  try {
    execSync('npm run build', { stdio: 'ignore' });
    console.log('✅ Build successful');
  } catch (error) {
    console.log('❌ Build failed');
  }

  // Show current version
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`📦 Current version: ${packageJson.version}`);
  
  // Show recent commits
  try {
    const commits = execSync('git log --oneline -5', { encoding: 'utf8' });
    console.log('\n📝 Recent commits:');
    console.log(commits);
  } catch (error) {
    console.log('❌ Could not fetch recent commits');
  }
}

function prepareRelease() {
  console.log('🔧 Preparing workspace for release...\n');
  
  try {
    // Stash any uncommitted changes
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim() !== '') {
      console.log('📦 Stashing uncommitted changes...');
      execSync('git stash push -m "Auto-stash before release"');
      console.log('✅ Changes stashed successfully');
      console.log('💡 Run `git stash pop` after release to restore changes');
    } else {
      console.log('✅ No uncommitted changes to stash');
    }
    
    // Pull latest changes
    console.log('🔄 Pulling latest changes...');
    execSync('git pull', { stdio: 'inherit' });
    
    // Install dependencies
    console.log('📥 Installing dependencies...');
    execSync('npm ci', { stdio: 'inherit' });
    
    // Run build
    console.log('🏗️  Building package...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('\n✅ Workspace prepared for release!');
    console.log('🚀 You can now run release commands:');
    console.log('   npm run release:patch');
    console.log('   npm run release:minor');
    console.log('   npm run release:major');
    
  } catch (error) {
    console.error('❌ Failed to prepare workspace:', error.message);
    process.exit(1);
  }
}

function cleanWorkspace() {
  console.log('🧹 Cleaning workspace...\n');
  
  try {
    // Clean dist
    console.log('🗑️  Removing dist folder...');
    execSync('rm -rf dist', { stdio: 'inherit' });
    
    // Clean node_modules
    console.log('🗑️  Removing node_modules...');
    execSync('rm -rf node_modules', { stdio: 'inherit' });
    
    // Fresh install
    console.log('📥 Fresh npm install...');
    execSync('npm install', { stdio: 'inherit' });
    
    console.log('✅ Workspace cleaned successfully!');
    
  } catch (error) {
    console.error('❌ Failed to clean workspace:', error.message);
    process.exit(1);
  }
}

function showInfo() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  console.log('📊 Package Information\n');
  console.log(`Name: ${packageJson.name}`);
  console.log(`Version: ${packageJson.version}`);
  console.log(`Description: ${packageJson.description}`);
  
  // Show tags
  try {
    const tags = execSync('git tag --sort=-version:refname | head -5', { encoding: 'utf8' });
    console.log('\n🏷️  Recent tags:');
    console.log(tags || 'No tags found');
  } catch (error) {
    console.log('\n🏷️  No git tags found');
  }
  
  // Show branch
  try {
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    console.log(`\n🌿 Current branch: ${branch}`);
  } catch (error) {
    console.log('\n🌿 Could not determine current branch');
  }
}

function showHelp() {
  console.log('🚀 Release Helper\n');
  console.log('Usage: node scripts/release-helper.js <command>\n');
  console.log('Commands:');
  console.log('  status   - Check if workspace is ready for release');
  console.log('  prepare  - Prepare workspace for release (stash, pull, install, build)');
  console.log('  clean    - Clean workspace (remove dist, node_modules, reinstall)');
  console.log('  info     - Show package and git information');
  console.log('  help     - Show this help message\n');
  
  console.log('Examples:');
  console.log('  node scripts/release-helper.js status');
  console.log('  node scripts/release-helper.js prepare');
  console.log('  npm run release:patch\n');
  
  console.log('Quick release workflow:');
  console.log('  1. node scripts/release-helper.js prepare');
  console.log('  2. npm run release:patch  # or minor/major');
  console.log('  3. git stash pop  # if changes were stashed');
}

// Run if called directly
if (require.main === module) {
  releaseHelper();
}

module.exports = { releaseHelper };