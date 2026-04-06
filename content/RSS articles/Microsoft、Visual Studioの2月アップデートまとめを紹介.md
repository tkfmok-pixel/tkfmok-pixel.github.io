---
title: "Microsoft、Visual Studioの2月アップデートまとめを紹介"
date: 2026年2月28日
tags: [saved]
source: "CodeZine"
link: https://codezine.jp/article/detail/23483
author: ""
feedTitle: "CodeZine"
guid: "https://codezine.jp/article/detail/23483"
---

# Microsoft、Visual Studioの2月アップデートまとめを紹介

　Microsoftは2月24日（現地時間）、Visual Studio 2026 Stable Channel向けに2月のアップデート（18.3）内容まとめを同社ブログ内で紹介した。今月のアップデートでは、AI支援、デバッグ、テスト、コードモダナイゼーションの強化が主な焦点となっている。

　WinForms開発向けには「WinForms Expert Agent」が搭載され、デザイナーと通常コードの違いの理解や最新の.NETパターン対応、レイアウトや例外処理などについてのガイダンスを提供する。このエージェントが必要に応じて自動的に実装され、WinFormsコードの品質向上に寄与する。

　テスト作成の効率化として、GitHub CopilotによるC#コードのインテリジェントな単体テスト生成が可能となった。xUnit、NUnit、MSTestと連携し、チャットで@Testと入力してテスト内容を指示するだけで、該当するテストコードが自動生成される。

　Copilot Chatにはカスタムプロンプトを素早く呼び出せるスラッシュコマンド機能が追加されている。/generateInstructionsや/savePromptなど新コマンドも用意され、開発フローのパターン化や再利用性を高めている。

　C++プロジェクトでは、GitHub Copilotによる「App Modernization」がパブリックプレビューとして提供され、MSVCの新バージョン対応やアップグレード課題の解決支援が強化された。

　デバッグ関連では、IEnumerable VisualizerでDataTipsが利用可能となり、コレクション内部の複雑なオブジェクト構造の確認が容易となった。さらに、コールスタック解析にCopilotが対応し、実行停止時のスタック全体の状況を説明する機能も新たに追加されている。

[Source](https://codezine.jp/article/detail/23483)