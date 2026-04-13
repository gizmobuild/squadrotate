// ── Tests: rankSwapCandidates (issue #10) ────────────────────────────────────

QUnit.module('rankSwapCandidates', () => {

  const players = [
    makePlayer({ id:1, name:'Alex',  power:3, positions:['Goalkeeper','Defense'] }),
    makePlayer({ id:2, name:'Blake', power:2, positions:['Midfield','Striker']   }),
    makePlayer({ id:3, name:'Casey', power:1, positions:['Defense']              }),
  ];

  QUnit.test('locked session returns empty array', assert => {
    const shiftData = { 1:'Goalkeeper', 2:'Defense', 3:'Bench' };
    const session   = makeSession({ locked: true });
    const result    = rankSwapCandidates(shiftData, 2, 'Midfield', players, session);
    assert.deepEqual(result, [], 'no candidates for locked session');
  });

  QUnit.test('target player excluded from candidates', assert => {
    const shiftData = { 1:'Goalkeeper', 2:'Defense', 3:'Bench' };
    const session   = makeSession({ locked: false });
    const result    = rankSwapCandidates(shiftData, 2, 'Striker', players, session);
    const ids = result.map(c => c.player.id);
    assert.notOk(ids.includes(2), 'target player (id:2) not in candidates');
  });

  QUnit.test('player with matching position preference ranked higher', assert => {
    const shiftData = { 1:'Goalkeeper', 2:'Defense', 3:'Bench' };
    const session   = makeSession({ locked: false });
    // Moving player 1 to 'Striker' — Blake has Striker in positions, Casey does not
    const result = rankSwapCandidates(shiftData, 1, 'Striker', players, session);
    assert.ok(result.length >= 2, 'at least 2 candidates');
    assert.equal(result[0].player.id, 2, 'Blake (has Striker pref) ranked first');
  });

  QUnit.test('returns current roles for each candidate', assert => {
    const shiftData = { 1:'Goalkeeper', 2:'Defense', 3:'Bench' };
    const session   = makeSession({ locked: false });
    const result    = rankSwapCandidates(shiftData, 1, 'Striker', players, session);
    const blakeCand = result.find(c => c.player.id === 2);
    assert.equal(blakeCand.currentRole, 'Defense', 'Blake current role is Defense');
    const caseyCand = result.find(c => c.player.id === 3);
    assert.equal(caseyCand.currentRole, 'Bench', 'Casey current role is Bench');
  });

  QUnit.test('null session treated as unlocked', assert => {
    const shiftData = { 1:'Goalkeeper', 2:'Defense', 3:'Bench' };
    const result    = rankSwapCandidates(shiftData, 1, 'Striker', players, null);
    assert.ok(result.length > 0, 'candidates returned for null session');
  });

});
