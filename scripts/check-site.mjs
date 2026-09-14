// Offline form gate verification: no Firebase SDK, network or production writes.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const handlers = {};
const submit = {disabled: false};
const state = {dataset: {}};
const boxes = Array.from({length: 3}, () => ({checked: false}));
const form = {
  elements: {name: {value: ''}, phone: {value: ''}, company: {value: ''}},
  querySelectorAll: () => boxes,
  addEventListener: (event, fn) => {handlers[event] = fn;},
};
const context = {
  document: {
    querySelectorAll: () => [],
    getElementById: id => ({apply: form, 'apply-submit': submit, 'apply-state': state}[id] ?? null),
  },
  window: {}, matchMedia: () => ({matches: true}),
};
const source = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8')
  .replace(/^import[\s\S]*?from\s+"[^"]+";\s*/gm, '');
vm.runInNewContext(source, context);
assert.equal(submit.disabled, true, 'Empty form must be disabled');
form.elements.name.value = 'QA Test';
form.elements.phone.value = '+7 (700) 000-00-00';
for (let mask = 0; mask < 8; mask++) {
  boxes.forEach((box, i) => {box.checked = Boolean(mask & (1 << i));});
  handlers.change();
  assert.equal(submit.disabled, mask !== 7, `Consent combination ${mask}`);
}
form.elements.phone.value = '123'; handlers.input();
assert.equal(submit.disabled, true, 'Short phone must be disabled');
form.elements.phone.value = '+7 (700) 000-00-00';
form.elements.name.value = ' '; handlers.input();
assert.equal(submit.disabled, true, 'Blank name must be disabled');
console.log('PASS: empty form, all 8 consent combinations, invalid phone, blank name. No network calls.');
