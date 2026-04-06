---
title: AppleシリコンMac miniによる自宅サーバー構築 | つぶやきの本棚
source: https://septel.main.jp/?p=1211
author:
  - '[[Septe_l]]'
published: null
created: 2026-03-24T00:00:00.000Z
description: null
tags:
  - apple-silicon
  - airplay2
  - usb-c
  - smb-server
  - media-streaming
  - mac-mini
  - server-setup
  - homebridge
  - remote-access
  - virtual-windows
image: null
---
![]()
- [ ] #readitlater
![](https://septel.main.jp/wp-content/uploads/2023/07/IMG_0679-2048x1536.jpeg)

ついにMacminiをM1機に買い替え。 [以前の2012年モデル](https://septel.main.jp/?p=242) と比べると大幅な高性能化・省電力化を果たしており、アーキテクチャの変更とOSのアップデートも相まって利便性は格段に向上している。  
M2版が出たことでM1チップ版の中古相場も下がり公式の整備済み製品は税込65,800円から購入可能で、更に今回はメルカリ中古で54,000円で購入出来た。  
今回はそんなM1Macminiを自宅サーバーとして組み込んでいく ~~<sub>非常に勿体無い</sub>~~ 使い方のお話。
## 強化ポイント・直近実装の新機能

### USB-C搭載。ケーブル1本でUSBハブ+モニター接続が可能(2018~)

![](https://septel.main.jp/wp-content/uploads/2023/07/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2023-07-03-19.23.10.png)

MacminiをUltraFineに接続、MacBookProからユニバーサルコントロールで接続。 MacBookProに繋いだMagicMouse・UltraFineに繋いだUSBキーボードが使える

2018から実装されたUSB-Cは、給電・モニター接続・USB接続を1本でこなせる非常に器用な規格。これにはThunderboltも関わっているが、実際にはUSB-Cに含まれる映像規格のDisplayPort Alternate Mode(通称DP)・高速充電規格のPowerDelivery(通称PD)の恩恵がほとんど。  
この万能端子が多くのノート・デスクトップPCに搭載されたことで対応モニターも非常に多い。旧MacのThunderbolt2以前もUSB接続と映像出力をケーブル1本でこなせる規格だったがほとんど普及していなかったため、実質的にUSB-C世代から活かせるようになった形。  
他社PCのUSB-CではDP/PD規格に対応していない機種もそこそこあるが、Macは全機種でフル対応しているので安心。あらゆるハブやモニター・ドックを使いこなせる。

サーバー運用のMacminiではPD規格に頼ることはないが、主にモニターとUSBデバイスを同時に接続する用途で活躍する。ケーブル1本をモニターの近くまで伸ばしておけばモニター・キーボード・マウスを簡単にサーバー機のMacminiに繋げるため、画面共有やVNCに頼らずメンテナンス可能で非常に快適。

補足として、M1MacminiのUSB-Aは5Gbpsで頭打ち。USB-Cは10GbpsのUSB通信に対応しているので、一部の外付けSSD等はUSB-Cに変換してから接続した方が速度が出ることも。

### AirPlay2レシーバー機能。AppleTVの役割も兼ねる(macOS12~)

macOS12 Montereyで実装された機能の一つ。公式には2018年モデルからの対応だが非対応モデルでも使えることが判明しており(MacBook2016で実証済み)、恐らく2014年モデルから使用可能。

![](https://septel.main.jp/wp-content/uploads/2023/07/image.png)

映像・音声の両方受信可能で、Macで使用中のモニター・スピーカーに出力する。Macminiの場合オーディオアンプやテレビにも組み込みやすく、単純なAirPlayレシーバーとしては [AppleTV](https://septel.main.jp/?p=670) 並みに万能。  
[AirPlay2](https://septel.main.jp/?p=574) 規格なのでオーディオであれば複数同時出力の対象にもなり、理論上はHomePodが再生中のオーディオも受け取れる(ただし [謎のバグ](https://septel.main.jp/?p=1199) で現在不安定)。ただしホームAppに登録はできず、Siriに指示しても再生先には設定できない。

細かなデメリットはあるが、映像ならAppleTV・音声なら [AirMacExpress](https://septel.main.jp/?p=173) の代用になる。  
(推測ではあるが)隠し仕様としてAppleTV・HomePodと同じくP2PのAirPlayにも対応しており、検知をBluetooth任せにすることで爆速(2~3秒)で接続出来る。接続に5~10秒ほどかかっていたAirMacExpressとは差別化が可能で、完全な下位互換とはなっていない。

わたしの部屋ではAirMacExpressの代用としてアンプの入力に接続している。ただし2018年モデルからは丸形光デジタルオーディオ出力を失っているので注意。アナログ3.5mm/丸型光デジタル兼用から純粋なアナログ3.5mm出力端子に変更されているため、光デジタル出力したいなら別途USB接続のアダプタが必要になる。

## 引き続き活躍が見込める機能

![](https://septel.main.jp/wp-content/uploads/2023/07/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2023-07-03-19.11.07.png)

細かくは [前の記事](https://septel.main.jp/?p=827) に丸投げ。ここでは新型で快適になったポイント等をまとめておく程度に留める。  
Homebridge以外は全て設定→一般→共有から設定可能。引き継ぐ時には以前とローカルホスト名が被らないように旧機種から修正必須。

### 運用に注意が必要なもの

#### TimeMachineバックアップディスクとしての利用

機能的にはほぼ変わらないが、2014からSSDとHDDの同時内蔵が不可能になっているので容量確保が厳しい。外付けに頼るくらいならということで、わたしは大人しく [TimeCapsule](https://septel.main.jp/?p=1111) を買い替えた。  
あとバックアップする内容はそもそもこいつ自身が抱えるデータがほとんど。そういう意味でも他に頼るのが正解かもしれない。

#### リモート操作×仮想Windows

不可能ではないがParallels推奨。VMwareはベータ版で安定しておらずドライバも足りていない。そもそもメインマシンのアーキテクチャ変更に対応するための用途なので、MacminiまでAppleシリコンにするなら同じくAppleシリコンのメインマシンに直接Parallels導入すれば済む話。  
よってサーバー機側でこなす必要は無くなった。一応できないことはないし、軽めのゲームが出来る程度には動作も快適。

### SMBサーバー

特に変化なし。今まで通り、 [保存した映像のストリーミング](https://septel.main.jp/?p=670) は快適にこなせる。  
ただしファイルの置き場所は外付けHDDより外付けSSD推奨。読み出し速度に大きく差が出るため、高解像度ほど影響が響く。スティック型SSDだと省スペース。  
購入時に内蔵SSDの容量を盛るより、大人しくスティックSSDに頼る方が安上がり(→ [Amazon](https://amzn.to/3RZIz3k))。M1のI/Oの関係でUSBSSDの速度が出づらいという話もあるが、映像ストリーミングでは特に不足しないレベル。

![](https://septel.main.jp/wp-content/uploads/2023/08/IMG_0809-2048x1536.jpeg)

Infuseでのストリーミング速度計測結果。 2012年モデルと変わらない速度が出ている

### Homebridge

今までと変わらず、Homebrew→node.jp(npm)→HomebridgeとインストールしていけばOK。各種プラグインも動作する。Homebrewのインストール時にパス通しを要求されることがあるがご丁寧に全部指示してくれるので、表示されるコマンドをそのまま追加で打てばあっさり終わる。  
当然BLEも使えるのでハブなしのSwitchBot機器等も問題なし。とはいえ相変わらずハブ利用のOpenAPI/Matterほどの安定感はない。

### ミュージックライブラリ母艦&ホームシェアリング

ホームシェアリングも問題なし。引き継ぎ時には以前のMacminiのiTunesStoreの承認設定を解除するのを忘れずに。  
高解像度のアートワークを大量に突っ込むとミュージックAppの動作が非常に重たくなるので、高性能なM1チップが役立つ。とはいえSSDの読み出し速度の影響の方がよっぽど大きいらしく、今回は使っていた外付けSSDをそのまま差し替えたので劇的というほどではなかったかも。

![](https://septel.main.jp/wp-content/uploads/2023/07/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2023-07-03-19.25.46.png)

引き継ぎの際は、以前使っていたスティックSSDを差し替え→Option押しながらミュージックApp起動→スティックSSD内のライブラリを選択、でOK。 [整頓したライブラリ](https://septel.main.jp/?p=744) と全音源がそのまま引き継がれる。  
iCloudミュージックの機能でクラウド同期して移行を試みてもiTunesPlus版しか取得できず、元音源までは同期されないことに注意。

TimeMachineのおかげで、ライブラリを外付けSSDに置いていても随時差分バックアップが確保される。  
鉄壁の [M-DISCアーカイブ](https://septel.main.jp/?p=955) と合わせると、外付けSSD・TimeCapsule・M-DISCの三重保管になり安心。高性能なM1チップとリモートに頼らないUltraFineの恩恵で、取り込み作業からアーカイブまでがMacmini上で非常に快適に進められるようになっている。

### iCloudフォトのアーカイブ

こちらも変わらず。Macminiは全ファイルオリジナル保存にして、定期的にMacmini内にバックアップを取りiCloudから削除していくとクラウドの容量が浮く。  
引き継ぎ方法はミュージックと同じく、Option押しながら起動→ライブラリを選択。ただこちらはiCloudにオリジナルデータがあるので、時間はかかるものの新規にライブラリを作ってiCloudから同期させてもいいかもしれない。

![](https://septel.main.jp/wp-content/uploads/2023/07/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2023-07-03-19.26.34.png)

## 配線・組み込み

ミュージック・写真・ストリーミングする動画を保存するストレージとして、BUFFALOの2TBスティックSSDを常時接続。そしてリモート操作時の解像度固定のため、HDMIポートには以前と変わらずダミーアダプタを常時接続。

操作方法は今まで通りのリモートの他、 [UltraFine](https://septel.main.jp/?p=878) を使っての直接操作も想定。  
UltraFineにはAppleKeyboardを接続しており、キーボード側のUSBポートにマウスを接続すればモニター・キーボード・マウスが揃う。  
加えて今まで通りに有線LAN・Homebridgeで使うWebカメラ・そしてAirPlay2レシーバー用にアンプへ配線を行うため、設置場所はUltraFineから少し離れた場所になってしまった。

![](https://septel.main.jp/wp-content/uploads/2023/07/IMG_0691-2048x1536.jpeg)

左から電源・LAN・UltraFine・ダミーアダプタ・スティックSSD・Webカメラ。 なお干渉したので、後にスティックSSDはUSB-Cに変換して差し直した

そのためUltraFineの置き場所まで届く長めのThunderboltケーブルを調達し、必要に応じてその場でThunderboltケーブルを差し替えるだけで簡単に使い回せるようにする。  
Thunderboltケーブルの選択は純正品以外だとややこしいが、USB4対応のものをチョイスすれば8割方当たりを引ける。今回は3mのパッシブケーブル(=20Gbpsに低下する)を利用。  
不安なら [Apple純正のThunderbolt 4 Proケーブル](https://www.apple.com/jp/shop/product/MN713ZA/A/thunderbolt-4-pro%E3%82%B1%E3%83%BC%E3%83%96%E3%83%AB18m) を使えば確実だが、3mでお値段2万円超えと超高級仕様。流石に手が届かなかった。

![](https://septel.main.jp/wp-content/uploads/2023/07/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2023-07-04-20.21.23.png)

UltraFineとダミーアダプタを両方繋ぎ、UltraFineを主ディスプレイとした後に解像度をお好みで設定。ダミーアダプタはUltraFineをミラーリングさせるよう設定し、解像度の設定もUltraFineに合わせる。

![](https://septel.main.jp/wp-content/uploads/2023/07/IMG_2386.jpeg)

ここで一旦UltraFineを外してリモートで接続(事前に画面共有の設定必須)し、ダミーアダプタの設定を確認する。ダミーアダプタしか繋いでいないため当然ダミーアダプタがメインディスプレイとなり、選択肢がフルHDまでだったので解像度もフルHDになる。リモートではこの程度の解像度が扱いやすく、外出先からならモバイルデータ通信容量の消費も抑えられる。

ここまで設定すると、UltraFine接続時はUltraFine単体で4K解像度・UltraFineなしだとフルHDでリモート操作専用と非常に綺麗な環境が出来上がる。(厳密に言うとUltraFine接続時はUltraFineで4K+ダミーアダプタにミラーリングされるが、どうせ見えないので無意味)  
ケーブル1本繋げばデスクトップ・外せばリモート専用のサーバーマシン。UltraFine+M1チップならモニター性能とチップ性能の両面で24インチiMacに匹敵する高品質な環境を実現できる上、当然UltraFineに余った5GbpsのUSB-CポートもMacminiで自由に使える。  
高級なデスクトップ環境と安定した省電力サーバーマシンを行き来出来る唯一無二の環境に仕上がる。そして今まで通りMacBookやiPadに差し替えれば、Macminiはサーバーマシンとして使いつつそちらをデスクトップ化出来る。正にわたしの夢見た光景。

## Homebridge環境構築・設定の移行

相変わらず単純、Homebrew→node.js(npm)→Homebridgeとコマンドぱちぱちしていくだけであっさり終わる。

まずは [Homebrew公式](https://brew.sh/index_ja) に載っているコマンドをコピペしてEnter。sudoコマンドのためにパスワード入力してEnter、確認が出るのでもう一度Enter。  
途中でXcode Command Line Toolsもインストールされる。

![](https://septel.main.jp/wp-content/uploads/2023/07/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2023-07-06-17.29.33-2.png)

![](https://septel.main.jp/wp-content/uploads/2023/07/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2023-07-06-17.30.22.png)

Appleシリコンだとパス通しの手順が必要だとコマンドが2行提示されるので、1行ずつ順番に打ち込めば終了。

![](https://septel.main.jp/wp-content/uploads/2023/07/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2023-07-06-17.34.17-1.png)

そのままHomebrewの機能でnode(npm)もインストール。

![](https://septel.main.jp/wp-content/uploads/2023/07/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2023-07-06-17.37.19.png)

終わったら「node -v」「npm -v」でそれぞれバージョン確認。結果が帰ってくればきちんと導入完了してる証拠。  
あとは変わらず「sudo npm install -g パッケージ名」で終了。今回は以前のMacminiでインストールしていたものを確認しておいた。

![](https://septel.main.jp/wp-content/uploads/2023/07/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2023-07-06-18.09.28.png)

npmパッケージリスト。全てHomebridge関係

これらをまるっと入れ直し、ユーザーフォルダ/.homebridgeの中身もコピペ。config.jsonのMACアドレスだけ書き換えれば、Homebridgeが以前と同じように使えるようになる。  
ホームAppから以前のブリッジを削除し改めて追加し直せば、Homebridge越しのアクセサリが操作できるはず。

![](https://septel.main.jp/wp-content/uploads/2023/07/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2023-07-06-18.36.14.png)

ちなみに自動起動用のAutomatorは作り直しが必要。コマンドのパスがIntelMacとは完全に異なっているので、typeコマンドで特定しておく必要がある。コマンドの場所さえ特定して書き換えてしまえば、それ以外の中身は以前とほぼ同じでOK。

![](https://septel.main.jp/wp-content/uploads/2023/07/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2023-07-06-18.36.40.png)

また再起動スケジュールもVenturaからはシステム環境設定で設定できなくなっているため、こちらはpmsetコマンドによる設定変更が必要。

![](https://septel.main.jp/wp-content/uploads/2023/07/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2023-07-06-19.06.03.png)

sudo pmset wake \[曜日\] \[時間\]。曜日はMTWRFSUの順で月~日。  
毎週火曜日(T)3:50に設定。ログイン項目に作成したAutomatorのAppを設定しておけば、毎週自動で再起動→Homebridgeが立ち上がる。停電時に自動再起動するように設定すればHomebridgeも復帰するので、電源断・停電対策にもなる。

## 使用感

![](https://septel.main.jp/wp-content/uploads/2023/07/IMG_0718-2048x1668.jpeg)

言わずもがなM1チップ搭載の4Kデスクトップとして使うと快適。ただMagicMouse2は使い回せないので、別途USBマウスをAppleKeyboardに接続してカバーする必要があるのは面倒なポイント。一応ユニバーサルコントロールでMacBookから共有すればカバー可能。

最も恩恵があったのはミュージックライブラリの管理。取り込み・歌詞入れ等の作業でリモート操作のラグが気になっていたが全て解決。アートワークを高画質化するwaifu2xもM1チップのNeural Engineのお陰でMacminiで直接扱えるので、ようやく取り込みから設定まで全て完結するようになった。  
さらにUltraFineを繋ぎ変えることでUSBデバイスを共有できるのでDVDドライブをMacminiに固定する必要がなく、M-DISCアーカイブ作業ではMacBookでUltraFineに接続したDVDドライブを使うことも容易になった。

![](https://septel.main.jp/wp-content/uploads/2023/07/IMG_0720-2048x1536.jpeg)

UltraFineの背面に刺せば、DVDドライブもMacBookとMacmini間で使い回せる

ついでにmacOS14 SonomaではAppleシリコンのMacをリモート操作する時も快適になるらしいので、これまで通りのリモート運用とUltraFine越しの直接操作の両面で格段に快適になることが予想される。  
これに限らずAppleシリコン限定の新機能が最近は増えてきているので、そういう意味でもM1Macminiに買い換えた価値はあったかもしれない。

![](https://septel.main.jp/wp-content/uploads/2023/07/image-1-2048x1230.png)

また [公式](https://support.apple.com/ja-jp/HT201897) 曰く2012→M1では消費電力がほぼ半減している。更に20W消費するAirMacExpressが不要になるのも合わせると下手すると常時50W以上の節電効果も期待でき、常時稼働のMacminiでは電気代が月額で4桁節約出来る可能性も秘めている。サーバー機の買い替えスパンは長くなりがちなので、買い替え費用は次の買い替えまでに電気代だけで元を取れてしまいそうなほど。

リモート操作も今まで以上に快適・モニター越しなら高性能デスクトップPC・サーバーとしても機能増強されておりより省スペースにまとまる・更には消費電力半減と、8年分の進化を感じられる買い替えだった。  
サーバー機らしく目立って効果を感じることはないだろうけど、今後じわじわと効いてくるのかもしれない。