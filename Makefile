DIST:=$(patsubst src/%.jsx, dist/%.js, $(wildcard src/*))

all: $(DIST)

dist/%.js: src/%.jsx
	mkdir -p dist
	babel $< >$@

.PHONY: test
test: $(DIST) test/bundle.js

test/bundle.js: test/main.jsx
	browserify -t babelify -e $< -o $@

clean:
	rm -rf dist
