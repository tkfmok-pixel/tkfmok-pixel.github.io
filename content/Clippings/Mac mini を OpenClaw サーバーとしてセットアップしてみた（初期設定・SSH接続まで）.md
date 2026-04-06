---
title: Mac mini を OpenClaw サーバーとしてセットアップしてみた（初期設定・SSH接続まで）
source: https://www.komee.org/entry/2026/03/10/011827
author:
  - '[[kome (id:komee)]]'
published: 2026-03-10T00:00:00.000Z
created: 2026-03-24T00:00:00.000Z
description: >-
  OpenClaw を自宅サーバーで動かすために Mac mini をセットアップした手順をまとめました。この記事では Mac mini
  の初期設定から、MacBook Pro から SSH /
  画面共有でリモート操作できる環境の構築までを解説します。ディスプレイなしで運用するための設定や、常時稼働させるための電源・スリープ設定についても紹介します。
tags:
  - openclaw
  - headless-operation
  - remote-access
  - initial-setup
  - screen-sharing
  - mac-mini
  - ai
  - clippings
  - ssh
  - server-setup
image: >-
  https://cdn.image.st-hatena.com/image/scale/f37dc145184e36d1c363dfb6f0f2f9deadd48102/backend=imagemagick;version=1;width=1300/https%3A%2F%2Fcdn-ak.f.st-hatena.com%2Fimages%2Ffotolife%2Fk%2Fkomee%2F20260310%2F20260310011213.png
---
![](https://cdn.image.st-hatena.com/image/scale/f37dc145184e36d1c363dfb6f0f2f9deadd48102/backend=imagemagick;version=1;width=1300/https%3A%2F%2Fcdn-ak.f.st-hatena.com%2Fimages%2Ffotolife%2Fk%2Fkomee%2F20260310%2F20260310011213.png)
- [ ] #readitlater
## 導入

最近 OpenClaw が流行っている。  
海外では特にこれを Mac mini にインストールして動作させる構成が広まりつつあり、タイミングによっては Mac mini の在庫が不足するほどらしい。

ちょうど新しいマシンを一台買おうかと考えていたタイミングだったこともあり、せっかくなら Mac mini を購入して OpenClaw を動かしてみることにした。

思い立ったその日に Apple Store で Mac mini を注文したところ、2日ほどで届いた。

届いたので早速 OpenClaw のセットアップ方法を調べてみたのだが、日本語でまとまった情報があまり見つからなかった。  
そこで、まだ情報が少ないうちに、Mac mini を OpenClaw 用のマシンとしてセットアップしていく過程を記事としてまとめていこうと思う。

今回はその第1回として、

- Mac mini の初期セットアップ
- 自宅ネットワーク内から MacBook Pro でリモート操作できるようにする

ところまでを整理する。

---

## OpenClaw とは

![](https://cdn-ak.f.st-hatena.com/images/fotolife/k/komee/20260310/20260310011213.png) OpenClaw は、生成AIを利用した自動化・エージェント型ツールの一つで、  
Discord や GitHub などのサービスと連携して様々な作業を自動化できる。

例えば次のような用途が想定されている。

- Discord 経由でAIに指示を出す
- コードレビューの自動化
- ワークフローの自動実行
- Botによる作業の代理実行

常時起動しているサーバー上で動作させることが前提となるため、  
自宅サーバーとして Mac mini を使う構成が海外コミュニティではよく紹介されている。

Mac mini は

- 消費電力が低い
- 静音
- 常時稼働させても安定している

という理由で、ちょうどよいマシンとして選ばれることが多いようだ。

## 現在の自宅の環境

今回の構成は以下のようなシンプルな環境で構築している。

```
インターネット: 光回線
LAN: 自宅Wi-Fi (192.168.2.0/24)

クライアント
MacBook Pro

サーバー
Mac mini (OpenClaw 用)
```

Mac mini は基本的に **ヘッドレス運用** を想定している。  
つまりディスプレイやキーボードを常時接続せず、MacBook Pro からリモートで操作する。

## 今回の記事でやること

Mac mini はディスプレイがないので、

- ディスプレイ接続
- キーボード接続
- マウス接続

といった作業を毎回やるのはかなり面倒。

そこで今回は、次の状態までセットアップする。

**同じ自宅Wi-Fiに接続している MacBook Pro から**

- SSH
- 画面共有

で Mac mini を操作できるようにする。

これができれば、Mac mini は机の隅に置いておくだけでよくなる。

---

## Mac mini の初期セットアップ

まずは Mac mini を起動する。かっこいい。

### 配線

Mac mini に以下を接続する。

- 電源
- LAN ケーブル(WiFi AP に直接配線)
- ディスプレイ
- キーボード
- マウス

最初の一度だけはディスプレイが必要になる。

### 初期起動

Mac mini を起動すると、通常の macOS の初期セットアップ画面が表示される。 言語やキーボードを設定して進める。

### Apple Account のスキップ

今回はサーバー用途なので、Apple Account はスキップした。 また OpenClaw に様々な権限を与えたい予定なので、必要以上にアカウントアクセスの権限を Mac mini に与えると、セキュリティリスクになりうる。この辺りも考慮した。 もちろんこれを考慮できるならログインしても問題ない。

## 必要なソフトウェアのインストール

初期セットアップが終わったら、最低限のツールを入れておく。 今回は次をインストールした。

- iTerm2
- Homebrew
- Discord

### iTerm2

ターミナルとして iTerm2 を使用する。

[iterm2.com](https://iterm2.com/)

### Homebrew

パッケージ管理は Homebrew を使う。

[brew.sh](https://brew.sh/ja/)

上記記事に記載の通り、これをインストールした iTerm2 で実行する。

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Discord

OpenClaw は Discord 連携が前提になることが多いので、Discord をインストールしてログインしておく。 また今回、SSH に使用する公開鍵をクライアントの MacBook Pro から送信したかった。 これも Discord を使ってやる。インストールしたらログインしておく。

[discord.com](https://discord.com/)

もちろん、Slack や LINE など好みのものを使ってもらって大丈夫。

## SSH の設定

MacBook Pro から Mac mini に SSH 接続できるようにする。  
※ MacBook Pro 側で秘密鍵/公開鍵のペアは作成済みとする。

### 公開鍵の転送

まず MacBook Pro 側で公開鍵を確認する。

```
cat ~/.ssh/id_rsa.pub
```

この公開鍵を Discord を使って Mac mini に転送する。

### authorized\_keys の作成

まず、Mac mini の Download フォルダに上記公開鍵を保存したとする。 Mac mini 側で次を実行する。

```
mkdir -p ~/.ssh
mv ~/Downloads/id_rsa.pub ~/.ssh/authorized_keys
sudo chmod 600 ~/.ssh/authorized_keys
```

### SSH 設定変更

パスワード認証を無効化して公開鍵認証のみを使う。

```
sudo vi /etc/ssh/sshd_config
```

以下の3つの変数を設定する。コメントアウトを解除したり、yes/no を末尾につけることで設定可能。

- PasswordAuthentication: no
- PubKeyAuthentication: yes
- ChallengeResponseAuthentication: no

## リモートアクセスを有効にする

macOS の設定から SSH と画面共有を有効にする。

設定 > 一般 > 共有

ここで以下をオンにする。

- リモートマネジメント
- リモートログイン

![](https://cdn-ak.f.st-hatena.com/images/fotolife/k/komee/20260310/20260310005712.png)

リモートマネジメントでは次の設定画面を開く。  
開かない場合は、上記画像のトグルの横の(i)ボタンをクリックする。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/k/komee/20260310/20260310010338.png).

ここで接続を許可するユーザーを個別に選択することが可能となる。  
また上記で入力する"パスワード"が画面共有次に入力する必要がある。

リモートログインでも同様に、接続許可するユーザーを選択可能。必要に応じて選択しておく。

## MacBook Pro から接続

MacBook Pro から接続する。 Mac mini の IP アドレスは、192.168.2.109 が割り当てられていた。

```
ssh username@192.168.2.109
```

これを iTerm のコンソールから実行することで、公開鍵認証で接続できる。

また Finder の移動 > サーバーへ接続 から画面共有も実行可能である。 ![](https://cdn-ak.f.st-hatena.com/images/fotolife/k/komee/20260310/20260310010005.png) ![](https://cdn-ak.f.st-hatena.com/images/fotolife/k/komee/20260310/20260310010043.png)

このように、 `vnc://<Mac mini の IP アドレス>` 入力することで、実行可能。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/k/komee/20260310/20260310010153.png)

接続できると、このようにユーザー名とパスワードを聞かれる。 ユーザー名は、接続したいユーザー名を入力する。 パスワードは先ほどリモートマネジメントの設定で入力した、画面共有用のパスワードを入力する。

---

これで今回のほとんどの設定が完了する。 以下は今後 OpenClaw を使用する上でやっておいた方が良い推奨設定を構築する。

## OpenClaw 用の設定

サーバー用途なので、Mac mini がスリープしないようにする。

### スリープ設定

設定 > ロック画面 から、以下の項目を **しない** に設定する。

- ディスプレイスリープ
- スリープ

![](https://cdn-ak.f.st-hatena.com/images/fotolife/k/komee/20260310/20260310010830.png)

### 停電後の自動起動

停電などで停止した場合でも自動起動するようにする。

設定 > エネルギー より、「停電後に自動的に起動」を有効化。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/k/komee/20260310/20260310010914.png)

## まとめ

今回の設定で、

- Mac mini を自宅ネットワークに接続
- SSH 接続
- 画面共有

ができるようになった。

これで Mac mini に **MacBook Pro から完全にリモート操作できる環境** ができた。  
次はいよいよ OpenClaw 本体をセットアップしていく。

## 次回予告

現在の構成では、

**同じ自宅ネットワークにいる場合のみ**  
Mac mini にアクセスできる。

しかし実際には、

などからも自宅の Mac mini にアクセスしたい。

とはいえ、OpenClaw はセキュリティ的にまだ成熟しているとは言えず、  
そのままインターネットに公開するのはかなり危険。

そこで次回は、

**VPN を構築して**

外出先 → VPN → Mac mini

という安全な構成を作る。