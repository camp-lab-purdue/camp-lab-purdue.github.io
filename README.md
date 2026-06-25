# CAMP Lab website

A Jekyll site for the Collaborative AI for Machines and People (CAMP) Lab.
Publications render automatically from a BibTeX file via
[jekyll-scholar](https://github.com/inukshuk/jekyll-scholar); people and news are
simple Markdown files.

## Running locally

### Option A — Docker (recommended, nothing to install but Docker)

```bash
docker compose up --build
```

Then open <http://localhost:4000>. Edits to content reload automatically.
Stop with `Ctrl-C`.

### Option B — local Ruby (you have Ruby 3.3)

```bash
bundle install
bundle exec jekyll serve --livereload
```

Then open <http://localhost:4000>.

## Where things live

```
_config.yml          Site-wide settings (title, contact links, scholar config)
index.html           Home page (assembles the sections below)
_includes/
  hero.html          Interactive hill/robot hero  (script: assets/js/hero.js)
  research.html      "Research" hub (vision + areas)
  projects.html      Featured projects (data: _data/projects.yml)
  news.html          Recent news (from _news/)
  nav.html footer.html logo.svg head.html
_pages/
  people.md          People listing
  publications.md    Publications (reads _bibliography/papers.bib)
  prospective.md     Prospective students + interest-form placeholder
_layouts/
  default.html person.html bib.html
_people/*.md         One file per lab member (front matter = their profile)
_news/*.md           One file per news item (filename starts with the date)
_bibliography/papers.bib   The publication list the site reads
assets/css/main.css  Theme (edit :root variables to recolor)
assets/js/hero.js    Hero animation (respects prefers-reduced-motion)
```

## Common edits

**Add a lab member:** copy any file in `_people/`, change the front matter
(`name`, `role`, `type: faculty|phd`, `started`, contact links, `interests`,
`selected` publications) and the bio below it. Drop a headshot in
`assets/img/people/` and set `photo:` to its path; otherwise initials are shown.

**Add a publication:** add a BibTeX entry to `_bibliography/papers.bib`. Only
2024-and-later (lab-era) papers are displayed — see `_pages/publications.md`,
which has one block per year. To start a new year, copy a block and change the
year in both the heading `id` and the `--query` filter. Optional entry fields
`pdf`, `code`, `arxiv`, `html` become link buttons. The full career list
(including pre-lab papers) lives in `papers.bib` at the repo root and is meant
for your personal site, not this one.

**Add news:** create `_news/YYYY-MM-DD-title.md` with a `date:` in the front
matter and one line of text in the body.

**Featured projects:** edit `_data/projects.yml`.

**Prospective-students form:** in `_pages/prospective.md`, replace the
`form_url` value with your Google Form link (and/or uncomment the inline embed).

**Recolor / re-font:** edit the `:root` variables and font links in
`assets/css/main.css` and `_includes/head.html`. The logo is `_includes/logo.svg`.

## Deploying to GitHub Pages

Because this uses the `jekyll-scholar` plugin, build with GitHub **Actions**
(GitHub's default Pages build does not allow custom plugins):

1. Push this folder to a GitHub repo.
2. In the repo: Settings → Pages → Build and deployment → Source = **GitHub Actions**.
3. Choose the "Jekyll" workflow it suggests (it runs `bundle exec jekyll build`).
4. If serving from `https://<user>.github.io/<repo>`, set `baseurl: "/<repo>"`
   in `_config.yml`.
