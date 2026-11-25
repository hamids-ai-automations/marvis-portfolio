/**
 * Site model derived from the committed master-record snapshot.
 */

import assert from 'node:assert/strict';
import test from 'node:test';

import { buildSiteModel, groupByCategory } from '../src/lib/model.js';
import { loadModel } from './helpers.js';

const { db, model } = await loadModel();

test('model exposes services, articles and projects', () => {
  assert.ok(model.services.length >= 5, 'expected at least five services');
  assert.ok(model.articles.length >= 3, 'expected at least three articles');
  assert.ok(model.projects.length > 10, 'expected a populated project index');
});

test('every detail project has a unique slug and a repository url', () => {
  const slugs = model.detailProjects.map((project) => project.slug);
  assert.equal(new Set(slugs).size, slugs.length, 'detail slugs must be unique');
  for (const project of model.detailProjects) {
    assert.match(project.repoUrl, /^https:\/\/github\.com\//, `${project.slug} needs a github url`);
  }
});

test('services have unique paths under /services/', () => {
  const paths = model.services.map((service) => service.path);
  assert.equal(new Set(paths).size, paths.length, 'service paths must be unique');
  for (const path of paths) assert.match(path, /^\/services\/[a-z0-9-]+\/$/);
});

test('articles have unique slugs and ISO dates', () => {
  const slugs = model.articles.map((article) => article.slug);
  assert.equal(new Set(slugs).size, slugs.length, 'article slugs must be unique');
  for (const article of model.articles) assert.match(article.date, /^\d{4}-\d{2}-\d{2}$/);
});

test('groupByCategory preserves every project', () => {
  const grouped = groupByCategory(model.projects);
  const total = grouped.reduce((sum, group) => sum + group.items.length, 0);
  assert.equal(total, model.projects.length);
  for (const group of grouped) assert.ok(group.label, 'each group needs a label');
});

test('stats report real repository counts', () => {
  assert.equal(model.stats.repositoriesTracked, db.repositories.length);
  assert.ok(model.stats.projects > 0);
});
