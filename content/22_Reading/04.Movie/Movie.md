![[Pasted image 20250920195913.jpg|800]]

# 概要
学生の頃は年に50本くらい観ていましたが、社会人になってからはあまり観なくなってしまいました。
ひとりで観る時は内省的な作品を観ることが多いです。お気に入りは初恋とか。
# 履歴
%% DATAVIEW_PUBLISHER: start
```dataview
TABLE
rating AS "評価",
summary AS "概要",
watchdate AS "観た日",
genre AS "ジャンル"
FROM "000_Publish/04.Movie"
WHERE file.path != this.file.path
AND file.folder = "000_Publish/04.Movie"
SORT watchdate DESC
```
%%

| File                                       | 評価    | 概要                                                        | 観た日                | ジャンル             |
| ------------------------------------------ | ----- | --------------------------------------------------------- | ------------------ | ---------------- |
| [[000_Publish/04.Movie/ラストマイル.md\|ラストマイル]] | ★★★☆☆ | 巨大通販企業「DAILY FAST」の物流拠点を舞台に、効率化と利益追求の影で働く人々の葛藤を描く社会派サスペンス | 2025-September-20  | #social #mystery |

%% DATAVIEW_PUBLISHER: end %%