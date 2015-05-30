DIST:=$(patsubst src/%.jsx, dist/%.js, $(wildcard src/*))

PKGNAME:=borjes-react
PUBLISH_URL:=garciasevilla.com:/var/www/pkgs/

all: $(DIST)

$(DIST): dist/%.js: src/%.jsx
	mkdir -p dist
	babel $< >$@

test: test/bundle.js

test/bundle.js: test/main.jsx $(DIST)
	browserify -t babelify -e $< -o $@

clean:
	rm -rf dist

publish: $(DIST)
	mkdir -p .publish/$(PKGNAME)
	cp -r dist package.json .publish/$(PKGNAME)
	cd .publish && tar -czf $(PKGNAME).tar.gz $(PKGNAME)
	scp .publish/$(PKGNAME).tar.gz $(PUBLISH_URL)
	rm -rf .publish

.PHONY: test clean publish
