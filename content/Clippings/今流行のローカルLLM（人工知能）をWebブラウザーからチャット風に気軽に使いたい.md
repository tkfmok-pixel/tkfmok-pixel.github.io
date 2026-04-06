---
title: "今流行のローカルLLM（人工知能）をWebブラウザーからチャット風に気軽に使いたい"
source: "https://qiita.com/iruka/items/4a19a63e5e0c341e4466"
author:
  - "[[iruka]]"
published: 2024-06-30
created: 2026-03-08
description: "概要 ローカルLLM（GoogleのGemma2、MSのPhi3、Qwen、cohere Command-R、・・・等）はどんどん賢くなりつつありますが、自分のサーバー上で動かすなら電気代だけで済みますし、レート制限や毎月課金もありません。 おうちLinuxサーバ..."
tags:
  - "clippings"
image: "https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnMzLWFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb20lMkZxaWl0YS1pbWFnZS1zdG9yZSUyRjAlMkYyODE4NiUyRjM4MTdlYmJkMGJlNDMyY2JkZmQ4NjljNzkyNzlmMDI4MDJjNjVkZjUlMkZ4X2xhcmdlLnBuZyUzRjE2NDkzOTMzMjI_aXhsaWI9cmItNC4wLjAmYXI9MSUzQTEmZml0PWNyb3AmbWFzaz1lbGxpcHNlJmJnPUZGRkZGRiZmbT1wbmczMiZzPWEyOGRmNzg3OTc0MjVjNWJkOGZiMTJmYmI1N2EwMmY1%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3D7ac526c118c99143251f9209931867ae?ixlib=rb-4.0.0&w=1200&fm=jpg&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9JUU0JUJCJThBJUU2JUI1JTgxJUU4JUExJThDJUUzJTgxJUFFJUUzJTgzJUFEJUUzJTgzJUJDJUUzJTgyJUFCJUUzJTgzJUFCTExNJUVGJUJDJTg4JUU0JUJBJUJBJUU1JUI3JUE1JUU3JTlGJUE1JUU4JTgzJUJEJUVGJUJDJTg5JUUzJTgyJTkyV2ViJUUzJTgzJTk2JUUzJTgzJUE5JUUzJTgyJUE2JUUzJTgyJUI2JUUzJTgzJUJDJUUzJTgxJThCJUUzJTgyJTg5JUUzJTgzJTgxJUUzJTgzJUEzJUUzJTgzJTgzJUUzJTgzJTg4JUU5JUEyJUE4JUUzJTgxJUFCJUU2JUIwJTk3JUU4JUJCJUJEJUUzJTgxJUFCJUU0JUJEJUJGJUUzJTgxJTg0JUUzJTgxJTlGJUUzJTgxJTg0JnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnR4dC1jb2xvcj0lMjMxRTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9NTYmdHh0LXBhZD0wJnM9N2I1NzE0MDU5Y2NmODcyMzgxMzZlZGRkYjMxMTFiNGQ&mark-x=120&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDBpcnVrYSZ0eHQtY29sb3I9JTIzMUUyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTM2JnR4dC1wYWQ9MCZzPTFjZDdiYjgwYzhmNWI4NjU1Y2NjNzVjYzZmYTBlY2Nl&blend-x=242&blend-y=480&blend-w=838&blend-h=46&blend-fit=crop&blend-crop=left%2Cbottom&blend-mode=normal&s=0849a37d210f318de3b187e341196f2c"
---
![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnMzLWFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb20lMkZxaWl0YS1pbWFnZS1zdG9yZSUyRjAlMkYyODE4NiUyRjM4MTdlYmJkMGJlNDMyY2JkZmQ4NjljNzkyNzlmMDI4MDJjNjVkZjUlMkZ4X2xhcmdlLnBuZyUzRjE2NDkzOTMzMjI_aXhsaWI9cmItNC4wLjAmYXI9MSUzQTEmZml0PWNyb3AmbWFzaz1lbGxpcHNlJmJnPUZGRkZGRiZmbT1wbmczMiZzPWEyOGRmNzg3OTc0MjVjNWJkOGZiMTJmYmI1N2EwMmY1%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3D7ac526c118c99143251f9209931867ae?ixlib=rb-4.0.0&w=1200&fm=jpg&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9JUU0JUJCJThBJUU2JUI1JTgxJUU4JUExJThDJUUzJTgxJUFFJUUzJTgzJUFEJUUzJTgzJUJDJUUzJTgyJUFCJUUzJTgzJUFCTExNJUVGJUJDJTg4JUU0JUJBJUJBJUU1JUI3JUE1JUU3JTlGJUE1JUU4JTgzJUJEJUVGJUJDJTg5JUUzJTgyJTkyV2ViJUUzJTgzJTk2JUUzJTgzJUE5JUUzJTgyJUE2JUUzJTgyJUI2JUUzJTgzJUJDJUUzJTgxJThCJUUzJTgyJTg5JUUzJTgzJTgxJUUzJTgzJUEzJUUzJTgzJTgzJUUzJTgzJTg4JUU5JUEyJUE4JUUzJTgxJUFCJUU2JUIwJTk3JUU4JUJCJUJEJUUzJTgxJUFCJUU0JUJEJUJGJUUzJTgxJTg0JUUzJTgxJTlGJUUzJTgxJTg0JnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnR4dC1jb2xvcj0lMjMxRTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9NTYmdHh0LXBhZD0wJnM9N2I1NzE0MDU5Y2NmODcyMzgxMzZlZGRkYjMxMTFiNGQ&mark-x=120&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDBpcnVrYSZ0eHQtY29sb3I9JTIzMUUyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTM2JnR4dC1wYWQ9MCZzPTFjZDdiYjgwYzhmNWI4NjU1Y2NjNzVjYzZmYTBlY2Nl&blend-x=242&blend-y=480&blend-w=838&blend-h=46&blend-fit=crop&blend-crop=left%2Cbottom&blend-mode=normal&s=0849a37d210f318de3b187e341196f2c)
- [ ] #readitlater
![](https://relay-dsp.ad-m.asia/dmp/sync/bizmatrix?pid=c3ed207b574cf11376&d=x18o8hduaj&uid=)

## Qiitaにログインして、便利な機能を使ってみませんか？

あなたにマッチした記事をお届けします

便利な情報をあとから読み返せます

[ログイン](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Firuka%2Fitems%2F4a19a63e5e0c341e4466&realm=qiita) [新規登録](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Firuka%2Fitems%2F4a19a63e5e0c341e4466&realm=qiita)

この記事は最終更新日から1年以上が経過しています。

## 概要

- ローカルLLM（GoogleのGemma2、MSのPhi3、Qwen、cohere Command-R、・・・等）はどんどん賢くなりつつありますが、自分のサーバー上で動かすなら電気代だけで済みますし、レート制限や毎月課金もありません。
- おうちLinuxサーバー上にサクッとインストール出来る人工知能ライブラリ Ollama に、LibreChatという、外見ChatGPTそっくりさんのWeb UI を組み合わせて、ローカルLLMサーバーを作成する手順を解説していきます。

[![ai.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/28186/dfea66ba-1cba-5cce-bfa8-4dc0cf0371d4.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F28186%2Fdfea66ba-1cba-5cce-bfa8-4dc0cf0371d4.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=c3816b8bba931349d3a07f825c39e284)

## 前提条件

- Linuxは **Ubuntu 22.04 LTS が動いていること** を前提に話を進めます。
- 導入手順は、大きく分けて、 **Ollama のインストール** （１行コマンドを打つだけでサクッと終わります）と、 **LibreChat のインストール** の２段階があります。
- LibreChatのインストールの前準備として、  
	1)　Node.js を導入する  
	2)　MongoDB を導入する
- が必要ですが、これも手順の中で説明します。

## 導入手順

## (1) Ollama の導入

- 一番簡単なので、こいつから行きます。
- 書いてある通りにします。

```text
$ curl -fsSL https://ollama.com/install.sh | sh
```

これだけです。

- インストール出来たら

```text
$ ollama run gemma2
```

- これだけで、gemma2 がコマンドラインで動きます。
- 初回だけ、人工知能Gemma2: 9B のモデルデータのダウンロードが入ります。(5.5GB)
- 二回目からは、すぐに走ります。
- nVidiaのグラボ（と、nVidiaサイトから導入したCUDAのドライバー)がLinuxに導入済であれば、そのままグラボを認識してGPUで走ります。
- グラボ無しのLinuxの場合は、CPUのみで推論が実行されます。（やや遅いです）
- グラボは、メモリー容量があればあるほど良いです。自分は、安物RTX-3060 (12GB) を挿してます。

## (2) Node.jsを導入

（npmも同時に入ります）

- Node.js 本家に書いてある通りにします。
- [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager)
- とりあえず、最新版 (Ver 22.3.0 current) On Linux With NVM でいきます。

```text
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# download and install Node.js (you may need to restart the terminal)
nvm install 22

# verifies the right Node.js version is in the environment
node -v # should print \`v22.3.0\`
# verifies the right NPM version is in the environment
npm -v # should print \`10.8.1\`
```

- 罠としては、

```text
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

したあと、一回ログアウトして入りなおすか、bash にシェルを読ませてPATHを追加しないと、次の

```text
nvm install 22
```

が動きません。

- あと、node.jsの導入先dirは、  
	$(HOME)/.nvm/versions/node/v22.3.0/bin/node
- みたいな場所になるようです。

## (3) MongoDBを導入

- LibreChat公式 より  
	[https://www.librechat.ai/docs/configuration/mongodb/mongodb\_community](https://www.librechat.ai/docs/configuration/mongodb/mongodb_community)
- MongoDB Community を導入します（例） Ubuntu22.04の apt にリポジトリ、キーを追加して、 apt install です。

## (4) LibreChatの導入

（Dockerのほうは無視して、普通にLinuxにローカルインストールします）

- LibreChat 公式より、
- 具体的には、GitHubからLibreChatをまるっと取ってきます。

```text
git clone https://github.com/danny-avila/LibreChat.git
```

- 次に、cloneしたディレクトリに cd して、環境ファイル.env をテンプレートからコピーして作ります。

```text
cd LibreChat

cp .env.example .env

### Important: Edit the newly created .env file to update the MONGO_URI
### with your own MongoDB instance URI.

# Install dependencies
npm ci

# Build the Frontend
npm run frontend

# Start LibreChat!
npm run backend

# Visit http://localhost:3080/
```

- MongoDB のURIとかはなにも弄らなくてOkだった気がします。気になるようでしたら、.envの中を確認してください
- あとは、nodejsの npm コマンドに全部任せて、依存を更新して、実行です。
- このLinuxの [http://localhost:3080/](http://localhost:3080/) で動いているはずです。
- Linuxを再起動した場合は、  
	npm run backend
- これだけで起動します。
- 外部からLibreChat にアクセスしたい場合は.envファイルにある、

```text
#==================================================#
#               Server Configuration               #
#==================================================#

#HOST=localhost
HOST=0.0.0.0
PORT=3080
```

- HOST=localhost になっているところを HOST=0.0.0.0 にすると、外部IFのポートからも繋がるようになります。また、PORT=3080 になっていますが、他のWebサーバーとぶつからないのでこのままにしておいて、外部からアクセス出来るWebサーバーのnginxからリバースプロキシーを掛けて、LibreChatに繋ぐと良いかもしれません。（BASIC認証とかもnginx側で設定できますので。）
- ここでは nginxの設定については割愛です。

## (5) LibreChatの設定

- Ollamaは今年初めぐらいにAPIのエンドポイントがOpenAI互換になったので、LibreChatからOllamaが動いているマシンのURIを指定するだけで、連携できます。一応この説明文書では、同じLinuxで動いていることにしているので、localhostでいいのかな。
- 別マシンのOllamaにアクセスする場合でもLibreChat側のyamlではURIを合わせるだけでいいですが、Ollama（推論）側では アクセスするIP、ポートを 127.0.0.1 ではなく、0.0.0.0 にして他のマシンからも接続できるようにしておきます。（編集ファイルは、 /etc/systemd/system/ollama.server ）

```text
[Service]
ExecStart=/usr/local/bin/ollama serve
User=ollama
Group=ollama
Restart=always
RestartSec=3
Environment="PATH=略"
Environment="OLLAMA_HOST=0.0.0.0:11434"
Environment="OLLAMA_FLASH_ATTENTION=True"
```

- "OLLAMA\_FLASH\_ATTENTION=True" は、Qwen2 がうまく動かなかったときのおまじないで、別に無くても問題ありません
- :
- 設定ファイル librechat.yaml は、 librechat.example.yaml をコピーして作ります。
- 自分の場合、librechat.yaml に、以下のような項目を追加して、自分のローカルLLMを足しました。
- baseURL は自分の場合、192.168.9.99になってますが、同一マシン上でOllamaが動いている場合はlocalhost:11434のほうを使ってください。

```text
- name: "Ollama"
      apiKey: "ollama"
      # use 'host.docker.internal' instead of localhost if running LibreChat in a docker container
      baseURL: "http://localhost:11434/v1/chat/completions"
      #baseURL: "http://192.168.9.99:11434/v1/chat/completions"
      models:
        default: [
          "llama2",
          "mistral",
          "codellama",
          "dolphin-mixtral",
          "mistral-openorca"
          ]
        # fetching list of models is supported but the name field must start
        # with ollama (case-insensitive), as it does in this example.
        fetch: true
      titleConvo: true
      titleModel: "current_model"
      summarize: false
      summaryModel: "current_model"
      forcePrompt: false
      modelDisplayLabel: "Ollama"
```

- models: の一覧 \[ \] は、Ollamaサーバーに接続したところで、pull済のモデル一覧に全部差し替わりますので、yamlの中は適当でいいです。
- あと、librechat.yaml から、不要なエントリー(有料サービスでAPIキーを取得しないと使えないサービス)を全部削除しておくとすっきりします。

## Tips

- ollama で使える人工知能モデルの一覧

HuggingFace みたいに、アカウント取得したり、モデル使用許諾を取ったりとかなしで、いきなりコマンドラインから、

```text
$ ollama run LLM名:サイズ
```

みたいな感じでモデルを取得して、即実行できます。

- gemma2 とか qwen2 のように新しい人工知能モデルデータがリリースされた場合は、Ollamaのアップデートが必要になる場合もあります。手順はインストールのときと同じです。
- LibreChat側では、増えたモデルが一覧には出てこないので、LibreChatの再起動が必要です。
- Ollamaで、ダウンロード済の人工知能モデルの一覧を見たいときは、

```text
$ ollama list
```

で見れます。

- お勧めの人工知能モデル：  
	とりあえず、gemma2 は賢いので試してください。  
	ほかは、Microsoft のPhi3 / Phi4 、alibabaのqwen2.5 、それとプログラミング知識が入ってるcodeナントカ・・・  
	データ量多くて遅いですが、cohere command-r: 35B (350億パラメータ、20GB)は一番賢いと思います。  
	command-r+の104B (4bit量子化しても、データサイズ 59GB)っていうのもありますが、動くんですかね？  
	試したことないです。パソコンのメモリー128GBある人は試してみてください（自分のPCでは64GBしかありません）

金、暴力、グラボ！  
金、暴力、グラボ！

こんな感じで、VRAMいっぱい欲しいー。

## 人工知能 gemma2 の回答例

### あなた：

銀河系から、マゼラン星雲へ旅をしています。  
孤独の寂しさをまぎらわす方法を教えてください

### Gemma2 9B：

銀河系からマゼラン星雲へ、なんて壮大な旅ですね！孤独な気持ち、よく分かります。宇宙の広がりの中で、自分だけの時間と空間を過ごすのは、時に寂しくなるものです。

でも、大丈夫！孤独を乗り越える方法はたくさんありますよ。旅の途中で、あなたを励ましてくれる方法をいくつか提案させてください。

1. **宇宙の美しさに浸る:**  
	あなたは、銀河系からマゼラン星雲へ旅しているという、かけがえのない経験をしているのです。  
	宇宙の壮大なスケール、星々の光り輝き、そして未知の天体たちを目の当たりにする喜びを味わってください。
- **日誌をつける:** 毎日、見た景色、感じたこと、考えたことを書き留めてみましょう。あなたの旅の記録となり、後から振り返ると温かい気持ちになれるはずです。
- **星空観察:** マゼラン星雲に近づくにつれて、銀河系の景色も変わってきます。今まで見たことのない星々や星座に出会えるかもしれません。星図を広げて、天体を探索してみるのもおすすめです。
- **宇宙音楽を聴く:** 壮大な宇宙をイメージさせる音楽を聴きながら、旅の気分を高めましょう。宇宙の神秘的な雰囲気に浸り、心を落ち着かせましょう。

２. **創造性を活かす:**  
宇宙空間での自由な時間は、あなたの創造性を刺激するチャンスです。

- **詩や短編小説を書く:** 宇宙での体験や感じたことを、言葉で表現してみましょう。あなたの旅の物語は、きっと人々を感動させるでしょう。
- **宇宙旅行記を作る:** 写真や動画をまとめ、あなたの壮大な旅を記録してみましょう。旅行記を通して、多くの人とあなたの体験を共有できるかもしれません。
- **宇宙アートを描く:** 宇宙の美しさ、広がり、そして神秘感を、あなたの感性で表現してみましょう。宇宙のエネルギーをチャージし、あなた自身の創造性を開花させてください。

３. **未来への夢を描き続ける:**

マゼラン星雲へ行く目的、あなた自身の夢を忘れないようにしましょう。

- **目標を明確にする:** マゼラン星雲での探検、研究、そしてあなたの夢の実現に向けて、具体的な目標を設定しましょう。目標があることで、旅のモチベーションを高く保つことができます。
- **未来の自分を想像する:** マゼラン星雲での探検を終えたあなた、そしてその先の未来を想像してみましょう。夢を実現するために、今できることを一つずつ進めていきましょう。
- **ポジティブな思考を持つ:** 旅の途中で困難に直面しても、諦めないでください。困難は乗り越えることで、あなたを成長させ、より強い精神力を育みます。ポジティブな思考を保ち、未来への希望を捨てずに進みましょう。  
	あなたにとって、マゼラン星雲への旅が、かけがえのない体験となることを心より願っています。

## 参考

- ollama と LibreChat を連携させる  
	[https://blog.itod.dev/story/text-generation-local/](https://blog.itod.dev/story/text-generation-local/)
- Llama.cppのOpenAI互換モードを使って、OpenAIから少ない手間でローカルLLMに乗り換える  
	[https://note.com/eurekachan/n/nfcf35803534f](https://note.com/eurekachan/n/nfcf35803534f)

雑多情報源  
[https://github.com/ollama/ollama?tab=readme-ov-file#model-library](https://github.com/ollama/ollama?tab=readme-ov-file#model-library)  
なんJLLM部 避難所2 [https://mercury.bbspink.com/test/read.cgi/onatech/1714642045/](https://mercury.bbspink.com/test/read.cgi/onatech/1714642045/)  
なんJLLM部 避難所3 [https://mercury.bbspink.com/test/read.cgi/onatech/1717886234/](https://mercury.bbspink.com/test/read.cgi/onatech/1717886234/)  
なんJLLM部 避難所4 [https://mercury.bbspink.com/test/read.cgi/onatech/1725931151/](https://mercury.bbspink.com/test/read.cgi/onatech/1725931151/)  
なんJLLM部 避難所5 [https://mercury.bbspink.com/test/read.cgi/onatech/1735186391/](https://mercury.bbspink.com/test/read.cgi/onatech/1735186391/)  
うみゆきさん Twtter [https://twilog.togetter.com/umiyuki\_ai](https://twilog.togetter.com/umiyuki_ai)  
LLMの現在 いもす様 [https://speakerdeck.com/pfn/llmnoxian-zai](https://speakerdeck.com/pfn/llmnoxian-zai)

[0](https://qiita.com/iruka/items/#comments)

コメント一覧へ移動

X（Twitter）でシェアする

Facebookでシェアする

はてなブックマークに追加する

新規登録して、もっと便利にQiitaを使ってみよう

1. あなたにマッチした記事をお届けします
2. 便利な情報をあとで効率的に読み返せます
3. ダークテーマを利用できます
[ログインすると使える機能について](https://help.qiita.com/ja/articles/qiita-login-user)

[新規登録](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Firuka%2Fitems%2F4a19a63e5e0c341e4466&realm=qiita) [ログイン](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Firuka%2Fitems%2F4a19a63e5e0c341e4466&realm=qiita)