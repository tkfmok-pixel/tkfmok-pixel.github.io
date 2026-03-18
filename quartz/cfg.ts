import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: `<img src="static/icon.png" alt="StrayOjisanの日々" style="height: 1.8em; vertical-align: middle; margin-right: 10px;"> StrayOjisanの日々`,
    pageTitleSuffix: " | Digital Garden",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible", // 必要に応じて "google" 等に変更してください
    },
    locale: "ja-JP", // 日本語の日付形式に最適化
    baseUrl: "strayojisan.github.io", // ご自身のドメインに合わせて変更してください
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Serif JP", // タイトルは美しい明朝体
        body: "Noto Sans JP",    // 本文は読みやすいゴシック体
        code: "JetBrains Mono",  // コードは見やすい等幅フォント
      },
      colors: {
        lightMode: {
          light: "#fafaf8",       // 温かみのある紙のような白
          lightgray: "#e5e5e5",   // 境界線
          gray: "#b8b8b8",        // 補助テキスト
          darkgray: "#4e4e4e",    // 読みやすい濃いグレーの本文
          dark: "#2b2b2b",        // 見出しの黒
          secondary: "#384b73",   // 知的なネイビーブルー（リンク等）
          tertiary: "#84a59d",    // 落ち着いたセージグリーン（ホバー等）
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff2ad",
        },
        darkMode: {
          light: "#161618",       // 深い夜空のような黒
          lightgray: "#393639",   // 境界線
          gray: "#646464",        // 補助テキスト
          darkgray: "#d4d4d4",    // 目に優しい明るいグレーの本文
          dark: "#ebebec",        // 見出しの白
          secondary: "#7b97aa",   // 夜に映える淡い青
          tertiary: "#84a59d",    // セージグリーン
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa02",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config