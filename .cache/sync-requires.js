
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-404-tsx": preferDefault(require("/Users/kyong/dev/devlog/src/pages/404.tsx")),
  "component---src-pages-index-tsx": preferDefault(require("/Users/kyong/dev/devlog/src/pages/index.tsx")),
  "component---src-pages-info-tsx": preferDefault(require("/Users/kyong/dev/devlog/src/pages/info.tsx")),
  "component---src-templates-post-template-tsx": preferDefault(require("/Users/kyong/dev/devlog/src/templates/post_template.tsx"))
}

