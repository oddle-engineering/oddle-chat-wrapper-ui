# 🚀 Release Process

This document outlines the step-by-step process for releasing new versions of the Chat Wrapper UI library.

## 🏷️ Quick Release Commands

### Stable Releases
```bash
# Bug fixes (1.0.0 → 1.0.1)
npm run release:patch

# New features (1.0.0 → 1.1.0)  
npm run release:minor

# Breaking changes (1.0.0 → 2.0.0)
npm run release:major
```

### Pre-releases
```bash
# Alpha release (1.0.0 → 1.1.0-alpha.1)
npm run release:alpha

# Beta release (1.0.0 → 1.1.0-beta.1)
npm run release:beta

# Release candidate (1.0.0 → 1.1.0-rc.1)
npm run release:rc
```

## 📋 Detailed Release Process

### 1. Pre-Release Checklist

Before creating any release:

- [ ] All tests are passing
- [ ] Documentation is up to date
- [ ] Breaking changes are documented
- [ ] CHANGELOG.md is updated
- [ ] All features are tested in showcase app
- [ ] Code is reviewed and approved

### 2. Prepare the Release

#### Step 1: Update Documentation
```bash
# Update README if needed
# Update examples in showcase/
# Update TypeScript definitions
```

#### Step 2: Generate Changelog (Optional)
```bash
# Auto-generate changelog from commits
npm run changelog

# Review and edit CHANGELOG.md manually
```

#### Step 3: Test Everything
```bash
# Run tests
npm test

# Build package
npm run build

# Test in showcase
npm run showcase
```

### 3. Create the Release

#### For Stable Releases:

**Patch Release (Bug Fixes)**
```bash
# Creates version 1.0.X → 1.0.X+1
npm run release:patch
```

**Minor Release (New Features)**
```bash
# Creates version 1.X.0 → 1.X+1.0
npm run release:minor
```

**Major Release (Breaking Changes)**
```bash
# Creates version X.0.0 → X+1.0.0
npm run release:major
```

#### For Pre-releases:

**Alpha Release (Early Development)**
```bash
# Creates version 1.1.0-alpha.1
npm run release:alpha
```

**Beta Release (Feature Complete)**
```bash
# Creates version 1.1.0-beta.1
npm run release:beta
```

### 4. Post-Release

After the release is created:

1. **GitHub Actions will automatically:**
   - Build the package
   - Run tests
   - Publish to NPM
   - Create GitHub release with notes
   - Upload build artifacts

2. **Manual verification:**
   - Check NPM package is published
   - Verify GitHub release is created
   - Test installation in a fresh project

3. **Notify stakeholders:**
   - Update internal documentation
   - Notify teams using the library
   - Post in relevant Slack channels

## 🔄 What Happens Automatically

### GitHub Actions Workflow

When you push a tag (via release commands):

1. **CI Pipeline runs:**
   - Installs dependencies
   - Runs tests
   - Builds package
   - Validates bundle

2. **Release Pipeline:**
   - Publishes to NPM with correct tag
   - Creates GitHub release
   - Generates release notes from changelog
   - Uploads build artifacts

3. **NPM Tags:**
   - Stable releases → `latest` tag
   - Pre-releases → `beta` tag

## 📦 For Consumers

### Installing Releases

**Latest stable version:**
```bash
npm install @oddle/chat-wrapper-ui@latest
# or
npm install @oddle/chat-wrapper-ui
```

**Specific version:**
```bash
npm install @oddle/chat-wrapper-ui@1.2.3
```

**Latest beta:**
```bash
npm install @oddle/chat-wrapper-ui@beta
```

**Specific pre-release:**
```bash
npm install @oddle/chat-wrapper-ui@1.2.0-beta.1
```

### Update Strategies

**Safe updates (patches only):**
```json
{
  "dependencies": {
    "@oddle/chat-wrapper-ui": "~1.2.0"
  }
}
```

**Feature updates (minor versions):**
```json
{
  "dependencies": {
    "@oddle/chat-wrapper-ui": "^1.2.0"
  }
}
```

## 🚨 Emergency Releases

For critical bug fixes or security issues:

### Hotfix Process

1. **Create hotfix branch:**
```bash
git checkout -b hotfix/critical-fix
```

2. **Make minimal fix:**
```bash
# Fix the critical issue
# Update tests if needed
# Update changelog
```

3. **Release patch:**
```bash
npm run release:patch
```

4. **Merge back:**
```bash
git checkout main
git merge hotfix/critical-fix
```

## 🔍 Troubleshooting

### Common Issues

**"Version not updated" error:**
- Make sure to bump version before pushing
- Use `npm run version:patch/minor/major` before pushing

**NPM publish fails:**
- Check GITHUB_TOKEN permissions
- Verify package name and registry settings

**Release notes empty:**
- Update CHANGELOG.md manually
- Use conventional commit messages

### Manual Recovery

If automated release fails:

1. **Manual NPM publish:**
```bash
npm build
npm publish --tag latest
```

2. **Manual GitHub release:**
- Go to GitHub releases
- Create release from existing tag
- Copy changelog content

## 📊 Release Metrics

Track these metrics for each release:

- Bundle size changes
- Breaking changes count
- Time between releases
- Download statistics
- User feedback

## 🤝 Best Practices

### Commit Messages
Use conventional commits for better changelog generation:

```bash
feat: add new component
fix: resolve button styling issue
docs: update API documentation
breaking: change prop interface (major)
```

### Version Strategy
- **Patch**: Bug fixes only
- **Minor**: New features, no breaking changes
- **Major**: Breaking changes, major refactors

### Testing
- Always test in showcase before release
- Verify installation in fresh project
- Test both ESM and CommonJS imports

### Communication
- Update changelog with user-friendly descriptions
- Notify teams about breaking changes in advance
- Provide migration guides for major versions