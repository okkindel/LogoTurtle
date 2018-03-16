// -------------------------------------------------------

square = function(length) {
	draw ("width 10");
	draw ("color 123");
	for (let i=0; i<4; i++) {
		draw ("mv " + length);
		draw ("rt 90");
	}
}

// -------------------------------------------------------

triangle = function(length) {
	for (let i=0; i<3; i++) {
		draw ("mv " + length);
		draw ("rt 120");
	}
}

// -------------------------------------------------------

snowflake = function(count, length) {
	draw ("rt 30");
	pattern (count, length);
	draw ("rt 120");
	pattern (count, length);
	draw ("rt 120");
	pattern (count, length);
	draw ("rt 90");
}

pattern = function(count, length) {
	if (count == 1) {
		draw("mv "+ length)
	} else {
		count--;
		pattern (count, length);
		draw ("rt 300");
		pattern (count, length);
		draw ("rt 120");
		pattern (count, length);
		draw ("rt 300");
		pattern (count, length);
	}
}

// -------------------------------------------------------

plant = function(depth, length, angle) {
	if (depth == 0)
		return;
	let width = Math.floor(depth/2)
	if (width < 1)
		width = 1;
	draw ("width " + 1);
	draw ("mv " + length);
	draw ("rt " + angle);
	plant ((depth-1), (length*0.7), angle);
	draw ("rt " + (360 - 2 * angle));
	plant ((depth-1), (length*0.7), angle);
	draw ("rt " + angle);
	draw ("rt 180");
	draw ("mv " + length);
	draw ("rt 180");
}

// -------------------------------------------------------