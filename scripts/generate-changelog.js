#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

/**
 * Generate changelog entry from git commits
 */
function generateChangelog() {
  try {
    // Get current version from package.json
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const currentVersion = packageJson.version;
    
    // Get the last tag
    let lastTag;
    try {
      lastTag = execSync('git describe --tags --abbrev=0 HEAD^', { encoding: 'utf8' }).trim();
    } catch (error) {
      // If no previous tag, use initial commit
      lastTag = execSync('git rev-list --max-parents=0 HEAD', { encoding: 'utf8' }).trim();
    }
    
    // Get commits since last tag
    const commitRange = lastTag.startsWith('v') ? `${lastTag}..HEAD` : `${lastTag}..HEAD`;
    const commits = execSync(`git log ${commitRange} --pretty=format:"%s"`, { encoding: 'utf8' })
      .split('\n')
      .filter(commit => commit.trim() !== '');
    
    if (commits.length === 0) {
      console.log('No new commits found since last release.');
      return;
    }
    
    // Categorize commits
    const categories = {
      added: [],
      changed: [],
      deprecated: [],
      removed: [],
      fixed: [],
      security: []
    };
    
    commits.forEach(commit => {
      const lower = commit.toLowerCase();
      if (lower.includes('feat:') || lower.includes('add:')) {
        categories.added.push(commit.replace(/^(feat:|add:)\s*/i, ''));
      } else if (lower.includes('fix:') || lower.includes('bug:')) {
        categories.fixed.push(commit.replace(/^(fix:|bug:)\s*/i, ''));
      } else if (lower.includes('change:') || lower.includes('update:')) {
        categories.changed.push(commit.replace(/^(change:|update:)\s*/i, ''));
      } else if (lower.includes('remove:') || lower.includes('delete:')) {
        categories.removed.push(commit.replace(/^(remove:|delete:)\s*/i, ''));
      } else if (lower.includes('security:')) {
        categories.security.push(commit.replace(/^security:\s*/i, ''));
      } else if (lower.includes('deprecate:')) {
        categories.deprecated.push(commit.replace(/^deprecate:\s*/i, ''));
      } else {
        // Default to changed
        categories.changed.push(commit);
      }
    });
    
    // Generate changelog entry
    const today = new Date().toISOString().split('T')[0];
    let changelogEntry = `\n## [${currentVersion}] - ${today}\n`;
    
    if (categories.added.length > 0) {
      changelogEntry += '\n### Added\n';
      categories.added.forEach(item => {
        changelogEntry += `- ${item}\n`;
      });
    }
    
    if (categories.changed.length > 0) {
      changelogEntry += '\n### Changed\n';
      categories.changed.forEach(item => {
        changelogEntry += `- ${item}\n`;
      });
    }
    
    if (categories.deprecated.length > 0) {
      changelogEntry += '\n### Deprecated\n';
      categories.deprecated.forEach(item => {
        changelogEntry += `- ${item}\n`;
      });
    }
    
    if (categories.removed.length > 0) {
      changelogEntry += '\n### Removed\n';
      categories.removed.forEach(item => {
        changelogEntry += `- ${item}\n`;
      });
    }
    
    if (categories.fixed.length > 0) {
      changelogEntry += '\n### Fixed\n';
      categories.fixed.forEach(item => {
        changelogEntry += `- ${item}\n`;
      });
    }
    
    if (categories.security.length > 0) {
      changelogEntry += '\n### Security\n';
      categories.security.forEach(item => {
        changelogEntry += `- ${item}\n`;
      });
    }
    
    // Read existing changelog
    let changelog = '';
    if (fs.existsSync('CHANGELOG.md')) {
      changelog = fs.readFileSync('CHANGELOG.md', 'utf8');
    }
    
    // Insert new entry after "## [Unreleased]" section
    const unreleasedIndex = changelog.indexOf('## [Unreleased]');
    if (unreleasedIndex !== -1) {
      const nextSectionIndex = changelog.indexOf('\n## [', unreleasedIndex + 1);
      if (nextSectionIndex !== -1) {
        changelog = changelog.slice(0, nextSectionIndex) + changelogEntry + changelog.slice(nextSectionIndex);
      } else {
        changelog = changelog + changelogEntry;
      }
    } else {
      changelog = changelogEntry + '\n' + changelog;
    }
    
    // Write updated changelog
    fs.writeFileSync('CHANGELOG.md', changelog);
    
    console.log(`✅ Generated changelog entry for version ${currentVersion}`);
    console.log('📝 Review CHANGELOG.md and edit as needed before committing.');
    
  } catch (error) {
    console.error('❌ Error generating changelog:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateChangelog();
}

module.exports = { generateChangelog };