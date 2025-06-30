const parseCsvRow = require('../parseCsvRow');

test('simple comma separated values', () => {
    expect(parseCsvRow('a,b,c')).toEqual(['a', 'b', 'c']);
});

test('quoted values with commas', () => {
    expect(parseCsvRow('a,"b,c",d')).toEqual(['a', 'b,c', 'd']);
});

test('escaped quotes within value', () => {
    expect(parseCsvRow('"a""a",b')).toEqual(['a"a', 'b']);
});

test('values trimmed of spaces', () => {
    expect(parseCsvRow(' " a " , b ')).toEqual(['a', 'b']);
});
