all: $(patsubst src/%.jsx, dist/%.js, $(wildcard src/*))

dist/%.js: src/%.jsx
	mkdir -p dist
	jsx --harmony $< >$@

clean:
	rm -rf dist
