# Photography Platform — Version 2.0

## Mission

Build a photography website platform that individual photographers and photography clubs can use and maintain without programming knowledge.

The platform should be beautiful, bilingual, portable, easy to update, and designed around the way photographers naturally organize their work.

---

## Core Principles

### 1. Photography First

The photographs are always the most important part of the website.

The design should remain quiet, elegant, and easy to browse.

### 2. No Coding Required

A photographer or club administrator should not need to edit React, TypeScript, or configuration code for ordinary updates.

### 3. Folder-Based Organization

Photographers organize their work through folders.

The platform reads those folders and automatically creates:

- collections
- categories
- albums
- galleries
- photo counts
- cover images

### 4. Bilingual Interface

The platform initially supports:

- English
- Tiếng Việt

Users can switch languages from the website header.

The Trúc Viên edition will use Vietnamese as its default language.

### 5. Easy Maintenance

A new administrator should be able to maintain the website after a short training session.

### 6. Club Ownership

The club owns:

- the photographs
- member information
- showcase content
- translations
- configuration
- website source files

### 7. Host Independence

The website must not depend permanently on one hosting company.

It should be movable to another compatible host without rebuilding the content.

### 8. Easy Migration and Backup

The complete website should be recoverable from ordinary folders and files.

No essential content should be trapped inside a proprietary database.

### 9. Clear Storage Guidelines

Recommended website photographs:

- JPG format
- sRGB color space
- 2,000–2,400 pixels on the long edge
- generally 250–600 KB
- approximately 1 MB maximum

### 10. Scalable for Small Clubs

The platform should comfortably support:

- fewer than 20 active members
- up to 5 main collections per member
- 20–30 photographs per album
- one shared monthly showcase

### 11. Built-In Documentation

The platform should include:

- Quick Start Guide
- User Manual
- Administrator Guide
- Backup and migration instructions
- Troubleshooting guide

### 12. The Vacation Test

Another club member should be able to maintain the website while the main administrator is unavailable.

---

## Version 2 Initial Priorities

1. Bilingual English/Vietnamese interface
2. Automatic multi-level folder galleries
3. Clear separation between platform code and website content
4. Easy cloning for a new photographer or club
5. User and administrator documentation
6. Host-independent deployment
7. Reliable backup and migration