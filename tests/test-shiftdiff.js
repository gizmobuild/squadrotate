// ── Tests: computeShiftDiff (issue #15) ──────────────────────────────────────

QUnit.module('computeShiftDiff', () => {

  const players = [
    { id:1, name:'Alex Smith',  positions:['Goalkeeper'] },
    { id:2, name:'Blake Jones', positions:['Defense'] },
    { id:3, name:'Casey Lee',   positions:['Striker'] },
    { id:4, name:'Dana Kim',    positions:['Defense'] },
  ];

  QUnit.test('identical lineups produce empty diff', assert => {
    const sd = { 1:'Goalkeeper', 2:'Defense', 3:'Striker', 4:'Defense' };
    const diff = computeShiftDiff(sd, sd, players);
    assert.deepEqual(diff.off,   [], 'no subs off');
    assert.deepEqual(diff.on,    [], 'no subs on');
    assert.deepEqual(diff.moves, [], 'no moves');
  });

  QUnit.test('player goes from field to bench → appears in off', assert => {
    const sdA = { 1:'Goalkeeper', 2:'Defense', 3:'Striker', 4:'Defense' };
    const sdB = { 1:'Goalkeeper', 2:'Defense', 3:'Bench',   4:'Defense' };
    const diff = computeShiftDiff(sdA, sdB, players);
    assert.equal(diff.off.length, 1, 'one sub off');
    assert.equal(diff.off[0].name, 'Casey', 'correct player');
    assert.equal(diff.off[0].role, 'STR', 'correct previous role');
    assert.deepEqual(diff.on, [], 'no subs on');
  });

  QUnit.test('player goes from bench to field → appears in on', assert => {
    const sdA = { 1:'Goalkeeper', 2:'Defense', 3:'Bench',   4:'Defense' };
    const sdB = { 1:'Goalkeeper', 2:'Defense', 3:'Striker', 4:'Defense' };
    const diff = computeShiftDiff(sdA, sdB, players);
    assert.equal(diff.on.length, 1, 'one sub on');
    assert.equal(diff.on[0].name, 'Casey', 'correct player');
    assert.equal(diff.on[0].role, 'STR', 'new role');
    assert.deepEqual(diff.off, [], 'no subs off');
  });

  QUnit.test('player changes position on field → appears in moves', assert => {
    const sdA = { 1:'Goalkeeper', 2:'Defense',  3:'Striker', 4:'Defense' };
    const sdB = { 1:'Goalkeeper', 2:'Midfield', 3:'Striker', 4:'Defense' };
    const diff = computeShiftDiff(sdA, sdB, players);
    assert.equal(diff.moves.length, 1, 'one move');
    assert.equal(diff.moves[0].name, 'Blake', 'correct player');
    assert.equal(diff.moves[0].from, 'DEF', 'from DEF');
    assert.equal(diff.moves[0].to,   'MID', 'to MID');
    assert.deepEqual(diff.off, [], 'no subs off');
    assert.deepEqual(diff.on,  [], 'no subs on');
  });

  QUnit.test('multiple simultaneous changes', assert => {
    // Casey goes off, Dana comes on from bench, Blake moves
    const sdA = { 1:'Goalkeeper', 2:'Defense',  3:'Striker', 4:'Bench' };
    const sdB = { 1:'Goalkeeper', 2:'Midfield', 3:'Bench',   4:'Striker' };
    const diff = computeShiftDiff(sdA, sdB, players);
    assert.equal(diff.off.length,   1, 'one sub off');
    assert.equal(diff.on.length,    1, 'one sub on');
    assert.equal(diff.moves.length, 1, 'one move');
    assert.equal(diff.off[0].name,   'Casey', 'Casey off');
    assert.equal(diff.on[0].name,    'Dana',  'Dana on');
    assert.equal(diff.moves[0].name, 'Blake', 'Blake moves');
  });

  QUnit.test('player not in either shift treated as bench both sides', assert => {
    // Player 4 missing from both shift dicts → Bench → Bench → no change
    const sdA = { 1:'Goalkeeper', 2:'Defense', 3:'Striker' };
    const sdB = { 1:'Goalkeeper', 2:'Defense', 3:'Striker' };
    const diff = computeShiftDiff(sdA, sdB, players);
    assert.deepEqual(diff.off,   [], 'no off');
    assert.deepEqual(diff.on,    [], 'no on');
    assert.deepEqual(diff.moves, [], 'no moves');
  });

});
