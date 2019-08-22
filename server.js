
const express = require('express');
const bodyParser = require('body-parser');
const mockServerData = require('./mockServerData');
const utils = require('./utils');
const generateId = require('uuid/v4');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// GET requests
app.get('/api/patterns', (req, res, next) => {

  setTimeout(() => res.send({ patterns: mockServerData.patterns }), 200);
  // next('test error')

});

app.get('/api/patterns/:patternId', (req, res, next) => {

  const patternId = req.params.patternId;
  const pattern = mockServerData.patterns.byId[patternId];

  if (pattern) {
    const patterns = {
      byId: { [patternId]: pattern },
      allIds: [patternId]
    };
    let sections = { byId: {}, allIds: [] };
    if (pattern.sectionIds) {
      sections = {
        byId: utils.filterObject(mockServerData.sections.byId, pattern.sectionIds),
        allIds: pattern.sectionIds
      };
    }
    setTimeout(() => res.send({ patterns, sections }), 200);
  }
  else {
    res.status(404).send({ error: "pattern not found "});
  }

  // next('test error');

});

app.get('/api/sections/:sectionId', (req, res) => {

  const sectionId = req.params.sectionId;
  const section = mockServerData.sections.byId[sectionId];

  const sections = {
    byId: { [section.sectionId]: section },
    allIds: [section.sectionId],
  };
  res.send({ sections });

});


// POST requests
app.post('/api/patterns', (req, res, next) => {

  const patternId = generateId();
  let pattern = req.body.pattern;
  pattern.patternId = patternId;
  pattern.sectionIds = [];

  setTimeout(() => res.send(pattern), 500);
  // next('test error');

});

app.post('/api/sections', (req, res) => {

  const sectionId = generateId();
  let section = req.body.section;
  section.sectionId = sectionId;
  section.currentRow = 1;

  res.send(section);
});


// PATCH REQUESTS
app.patch('/api/sections/:sectionId', (req, res, next) => {

  let sectionUpdates = req.body;
  sectionUpdates.sectionId = req.params.sectionId;

  if (sectionUpdates.currentRow === 3) {
    next('test error');
  }
  else {
    // res.send(sectionUpdates);
    setTimeout(() => res.send(sectionUpdates), 500);
  }

});

// DELETE REQUESTS
app.delete('/api/patterns/:patternId', (req, res, next) => {

  const patternId = req.params.patternId;
  const sectionIds = mockServerData.patterns.byId[patternId].sectionIds;

  setTimeout(() => res.send({ patternId, sectionIds }), 200);
  // next('test error');

});

app.delete('/api/sections/:sectionId', (req, res, next) => {

  const sectionId = req.params.sectionId;
  const patternId = mockServerData.sections.byId[sectionId].patternId;

  setTimeout(() => res.send({ patternId, sectionId }), 200);
  // next('test error');

});



app.listen(port, () => console.log(`Listening on port ${port}`));
