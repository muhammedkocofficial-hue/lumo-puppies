/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS VM loader for isolated evidence tests. */
const fs = require("node:fs"),
  path = require("node:path"),
  vm = require("node:vm"),
  assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const ts = require(root + "/node_modules/typescript");
const React = require(root + "/node_modules/react");
const { renderToStaticMarkup } = require(
  root + "/node_modules/react-dom/server",
);
function loader(fixtures = {}) {
  const cache = {};
  function load(file) {
    let full = file.startsWith("@/")
      ? path.join(root, "src", file.slice(2))
      : file;
    if (!path.extname(full))
      full += fs.existsSync(full + ".tsx") ? ".tsx" : ".ts";
    if (cache[full]) return cache[full];
    let code = fs.readFileSync(full, "utf8");
    for (const [key, value] of Object.entries(fixtures))
      if (full.replaceAll("\\", "/").endsWith("/data/" + key + ".ts"))
        code = code.replace(
          new RegExp("(export const " + key + ": [^=]+ = )\\[\\];"),
          "$1" + JSON.stringify(value) + ";",
        );
    const sandbox = {
      exports: {},
      process: { env: {} },
      require: (specifier) =>
        specifier.startsWith("@/")
          ? load(specifier)
          : specifier.startsWith(".")
            ? load(path.resolve(path.dirname(full), specifier))
            : require(require.resolve(specifier, { paths: [root] })),
    };
    vm.runInNewContext(
      ts.transpileModule(code, {
        compilerOptions: {
          jsx: ts.JsxEmit.ReactJSX,
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2020,
        },
      }).outputText,
      sandbox,
    );
    return (cache[full] = sandbox.exports);
  }
  return load;
}
let checks = 0;
const { Proofs } = loader()("@/components/ui/Proofs");
let html = renderToStaticMarkup(
  React.createElement(Proofs, {
    items: [
      {
        title: "UNVERIFIED_TEST",
        description: "must not appear",
        verified: false,
      },
    ],
  }),
);
assert.equal(html, "");
checks++;
html = renderToStaticMarkup(
  React.createElement(Proofs, {
    items: [
      { title: "VERIFIED_TEST", description: "test record", verified: true },
    ],
  }),
);
assert.ok(html.includes("VERIFIED_TEST"));
checks++;
for (const verified of [false, true])
  for (const consent of [false, true]) {
    const mod = loader({
      testimonials: [
        {
          displayName: "TEST ONLY",
          quote: "CONSENT_GATE_TEST",
          verified,
          consent,
        },
      ],
    })("@/components/home/Stories");
    html = renderToStaticMarkup(React.createElement(mod.FamilyStories));
    assert.equal(html.includes("CONSENT_GATE_TEST"), verified && consent);
    checks++;
  }
for (const verified of [false, true]) {
  const mod = loader({
    awards: [
      {
        title: "AWARD_GATE_TEST",
        organisation: "Test",
        year: 2000,
        description: "Test only",
        verified,
      },
    ],
  })("@/components/home/Stories");
  html = renderToStaticMarkup(React.createElement(mod.AwardFeature));
  assert.equal(html.includes("AWARD_GATE_TEST"), verified);
  checks++;
  const teamMod = loader({
    team: [
      { name: "TEAM_GATE_TEST", role: "Test", biography: "Test", verified },
    ],
  })("@/components/home/Stories");
  html = renderToStaticMarkup(React.createElement(teamMod.People));
  assert.equal(html.includes("TEAM_GATE_TEST"), verified);
  checks++;
}
console.log(JSON.stringify({ evidenceGateChecks: checks, passed: true }));
