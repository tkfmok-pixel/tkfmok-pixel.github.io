![Image from Gyazo|400](https://i.gyazo.com/ae68ddc50e10e45e16f46fa5c9658c4d.png)

# 概要
間接部門の業務効化に取り組んできました。その関係で、業務フロー・データの可視化→TOBEの構築→実行というところに強みがあります。
好きなのはデータから意味を見出してBIツールで理解しやすい形に可視化する部分です。
もう少し本格的にデータアナリスト・データサイエンティストの領域に踏み込みたいと思いつつ、仕事の関係でAIの勉強などをしています。
#ImOnIt 

# 学習状況
%% DATAVIEW_PUBLISHER: start
```dataview
TABLE file.mtime AS "更新日"
FROM "000_Publish/02.Study"
WHERE file.path != this.file.path
AND file.folder = "000_Publish/02.Study"
SORT file.mtime DESC
```
%%

| File                                 | 更新日                      |
| ------------------------------------ | ------------------------ |
| [[000_Publish/02.Study/G検定.md\|G検定]] | 2025-September-13 10:24  |

%% DATAVIEW_PUBLISHER: end %%