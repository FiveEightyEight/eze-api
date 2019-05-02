test('it should pass', done =>{
    expect(true).toBe(true);
    done();
});

test('it should NOT pass', done =>{
    expect(false).toBe(false);
    done();
});