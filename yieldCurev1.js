var data = [],
    n = 100,
    a = 1,
    b = 2;

for (var k = 0; k < 100; k++) {
    data.push({x: 0.01 * k, y: a * Math.pow(b, 0.01 * k)});
}