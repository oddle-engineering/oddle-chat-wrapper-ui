#!/usr/bin/env node
/**
 * Sync translation files between root i18n/ and showcase/public/i18n/
 * This ensures CLI tools can work with source files while browser can access them
 */

const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'i18n');
const targetDir = path.join(__dirname, 'showcase/public/i18n');

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy all JSON files from source to target
if (fs.existsSync(sourceDir)) {
  const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.json'));
  
  console.log('📁 Syncing translation files...');
  
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`✅ Copied ${file} to showcase/public/i18n/`);
  });
  
  console.log(`🎉 Synced ${files.length} translation files to public directory`);
} else {
  console.log('⚠️  Source i18n directory not found');
}