#!/usr/bin/env node

const { execSync } = require('child_process');

/**
 * Check git status and provide helpful guidance
 */
function checkGitStatus() {
  try {
    // Check if we're in a git repository
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
  } catch (error) {
    console.error('❌ Not in a git repository.');
    process.exit(1);
  }

  try {
    // Check for uncommitted changes
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    
    if (status.trim() !== '') {
      console.error('❌ Git working directory is not clean.');
      console.error('📋 You have uncommitted changes:');
      console.error(status);
      console.error('🔧 Please commit or stash your changes before versioning:');
      console.error('');
      console.error('   git add .');
      console.error('   git commit -m "your commit message"');
      console.error('');
      console.error('   # OR stash changes temporarily');
      console.error('   git stash');
      console.error('   # ... run version command ...');
      console.error('   git stash pop');
      console.error('');
      process.exit(1);
    }

    // Check if we're ahead of remote
    try {
      const behind = execSync('git rev-list --count @{u}..HEAD', { encoding: 'utf8' }).trim();
      if (parseInt(behind) > 0) {
        console.warn('⚠️  You have unpushed commits. Consider pushing before releasing:');
        console.warn('   git push');
        console.warn('');
      }
    } catch (error) {
      // No upstream or other git issues - not critical for versioning
    }

    console.log('✅ Git working directory is clean. Ready for versioning!');
    
  } catch (error) {
    console.error('❌ Error checking git status:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  checkGitStatus();
}

module.exports = { checkGitStatus };