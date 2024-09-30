// Lagrange Interpolation to find the polynomial's constant term
function lagrangeInterpolation(points) {
    let c = 0; // Constant term
    let k = points.length;

    for (let i = 0; i < k; i++) {
        let xi = points[i][0];
        let yi = points[i][1];
        let term = yi;

        // Log the current point being used
        console.log(`Calculating term for point (${xi}, ${yi})`);

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= (0 - points[j][0]) / (xi - points[j][0]);

                // Log the interpolation step
                console.log(`  Interpolating with (${points[j][0]}, ${points[j][1]}), term so far: ${term}`);
            }
        }

        c += term;

        // Log the partial result of constant term c
        console.log(`  Partial result: ${c}`);
    }
    return c;
}

module.exports = { lagrangeInterpolation };
