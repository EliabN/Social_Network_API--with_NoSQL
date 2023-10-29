// Add seed Data in here
const names = [
  'Aaran',
  'Jane',
  'Aarez',
  'Abdul',
  'Zubayr',
  'Zuriel',
];

const thoughtText = [
  'I love the Decision Trackers app',
  'Running can help to keep fit',
  'Exploring new technologies is exciting!'
]

const reactions = [[
  {
    reactionBody: 'Decision Trackers is awesome',
    userName: 'Sean'
  },
  {
    reactionBody: 'Awesome app!',
    userName: 'Jamie Doe'
  },

],
[
  {
    reactionBody: 'Yess Agreed',
    userName: 'Ben J'
  },
],
[
  {
    reactionBody: 'Definitely a fact!',
    userName: 'Kobe Teh'
  },
]];

// Export the functions for use in seed.js
module.exports = { names, thoughtText, reactions }
