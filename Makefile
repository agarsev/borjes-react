DIST:=$(patsubst src/%.jsx, dist/%.js, $(wildcard src/*))

all: $(DIST)

$(DIST): dist/%.js: src/%.jsx
	mkdir -p dist
	babel $< >$@

test: test/bundle.js

test/bundle.js: test/main.jsx $(DIST)
	browserify -t babelify -e $< -o $@

clean:
	rm -rf dist

.PHONY: test clean
