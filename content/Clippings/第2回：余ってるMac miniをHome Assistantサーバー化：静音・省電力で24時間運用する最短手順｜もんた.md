---
title: 第2回：余ってるMac miniをHome Assistantサーバー化：静音・省電力で24時間運用する最短手順｜もんた
source: https://note.com/ysk373/n/n49ee6da26ac0
author:
  - '[[もんた]]'
published: 2025-10-24T00:00:00.000Z
created: 2026-03-24T00:00:00.000Z
description: >-
  🏠 前回のおさらい  前回は「ラズパイで詰んだ人へ」というテーマで、 Mac miniをHome
  Assistant（以下HA）のサーバーにする発想を紹介しました。  👉 今回はいよいよ 実際に構築 します。 難しい話は抜きで、まずは
  無料で動く最小構成 を目標にしましょう。   💡 今回のゴール   💻 中古のMac mini（2014〜2018）を使って、
  静音・省電力で24時間稼働できるスマートホーム環境をつくる！    🧰 Home Assistant の導入支援について  🧰 Home
  Assistant の導入支援も行っています。Mac mini や Raspberry P
tags:
  - home-assistant
  - mac-mini
  - smart-home
  - server-setup
  - docker
  - clippings
  - household
  - mac
image: >-
  https://assets.st-note.com/production/uploads/images/224450801/rectangle_large_type_2_3101adc3de7a39464a3e166a3bd23acc.png?fit=bounds&quality=85&width=1280
---
![](https://assets.st-note.com/production/uploads/images/224450801/rectangle_large_type_2_3101adc3de7a39464a3e166a3bd23acc.png?fit=bounds&quality=85&width=1280)
- [ ] #readitlater
![見出し画像](https://assets.st-note.com/production/uploads/images/224450801/rectangle_large_type_2_3101adc3de7a39464a3e166a3bd23acc.png?width=1280)

## 第2回：余ってるMac miniをHome Assistantサーバー化：静音・省電力で24時間運用する最短手順

## 🏠 前回のおさらい

前回は「ラズパイで詰んだ人へ」というテーマで、  
Mac miniをHome Assistant（以下HA）のサーバーにする発想を紹介しました。

👉 今回はいよいよ **実際に構築** します。  
難しい話は抜きで、まずは **無料で動く最小構成** を目標にしましょう。

---

## 💡 今回のゴール

> 💻 中古のMac mini（2014〜2018）を使って、  
> 静音・省電力で24時間稼働できるスマートホーム環境をつくる！

---

## 🧰 Home Assistant の導入支援について

🧰 Home Assistant の導入支援も行っています。Mac mini や Raspberry Pi を使った構築・Frigate通知設定・Zigbee連携など、  
実際の環境に合わせてリモートで導入をサポートしています。

👉 [ココナラで詳細を見る（導入支援プラン）](https://coconala.com/services/3932819)

---

## 🍎 なぜMac miniがHAサーバーに向くのか

おさらいを兼ねて、ポイントをまとめます👇

- 💤 **静音＆省電力** ：軽負荷時は10〜15W前後。ラズパイとほぼ同等。
- 🧊 **安定性** ：ファン制御が優秀で熱暴走なし。長期稼働も安心。
- 🧩 **拡張性** ：Docker上でHome Assistant／Frigate／MQTTを同居運用。
- 💰 **コスパ** ：中古1〜4万円台。性能・安定性・電力のバランスが◎。

この1台で、センサー監視・通知・録画・省エネ管理まで完結できます。  
「もうラズパイ探しで悩まなくてOK」です。

[**【整備済み品】 Apple Mac mini A1347 Late 2014 小型デスクミニデスクトップPC MacOS Monterey12.7.2 \[第4世代Core i7 メモリ16G SSD 512GB 無線 BT （整備済み品）** *amzn.to*](https://amzn.to/4ovXT6g)

[*45,000円* (2025年11月08日 20:45時点](https://amzn.to/4ovXT6g)

[

Amazon.co.jpで購入する

](https://amzn.to/4ovXT6g)

[**ORICO M.2 NVMe SSD 外付けケース USB 3.2 Gen2 10Gbps高速データ転送 NVMe/PCIE 対応2230/2242/2260/2280 SSD ケース M2 SSD 外付けケース 8TB容量に対応 UASPサポート ABS+アルミ材質 黑 M2PV-BK** *amzn.to*](https://amzn.to/3JJCN4Y)

[*2,209円* (2025年11月08日 20:46時点](https://amzn.to/3JJCN4Y)

[

Amazon.co.jpで購入する

](https://amzn.to/3JJCN4Y)

[**エレコム LANケーブル CAT6A 1m ツメが折れない 爪折れ防止コネクタ やわらか ブラック ECLD-GPAYTBK10** *amzn.to*](https://amzn.to/3LO7sia)

[*580円* (2025年11月08日 20:47時点](https://amzn.to/3LO7sia)

[

Amazon.co.jpで購入する

](https://amzn.to/3LO7sia)

---

## ⚙️ 構築に必要なもの

- **Mac mini（2014〜2020のIntel機）**  
	　macOS Monterey以上推奨。
- **ストレージ** ：内蔵SSDでOK（録画用途なら外付けHDDを追加）
- **ネットワーク** ：有線LAN推奨。固定IP or DHCP予約で安定。
- **初期接続** ：セットアップ時だけモニタ＋キーボードを使用。以後ブラウザ操作で完結。

💡 準備ができたら、次に「どの方式で動かすか」を決めます。

---

## 🧭 構築方式を選ぶ（Docker版 vs VM版）

どちらもHAを動かす方法ですが、結論から言うと👇

> 🔧 **初心者・安定重視ならDocker版が最短。**

### 🐳 Docker版（おすすめ）

- Macの通常利用と両立できる
- 管理がシンプル、アップデートも楽
- 永続ボリューム設定で再構築が容易
- Supervisorなど一部機能は非対応（多くの人は問題なし）

### 💻 HAOS VM版（UTM / VirtualBoxなど）

- Home Assistant OSをそのまま仮想マシンとして起動
- 公式Add-onが全て使える
- ただしリソース消費が多く、VM管理が少し手間

---

## 🧩 全体イメージ

```
Mac mini
 └─ Docker
      ├─ homeassistant（メイン）
      ├─ mosquitto（MQTTブローカー）
      └─ frigate（AIカメラ監視）
```

この構成をベースに、今後Frigate通知・Zigbee制御などを足していきます。  
まずは「Home Assistant単体」を動かしてみましょう。

---

## 🚀 無料でできる最小構築ガイド

ここでは **Docker Desktop** を使ってHome Assistantを動かします。

---

### 1️⃣ Dockerをインストール

→ [Docker公式サイト](https://www.docker.com/) からDesktop版を導入。

---

### 2️⃣ 設定フォルダを作成

```javascript
mkdir -p ~/ha/config
```

---

### 3️⃣ Home Assistantコンテナを起動

> （※本格運用向けの docker-compose.yml は後半の有料パートで配布）

```ruby
docker run -d \
  --name homeassistant \
  --restart unless-stopped \
  -v ~/ha/config:/config \
  -p 8123:8123 \
  ghcr.io/home-assistant/home-assistant:stable
```

---

### 4️⃣ ブラウザでアクセス

```javascript
http://<MacのIP>:8123
```

初期セットアップウィザードが表示されたら、  
案内に従ってアカウントを作成します。

---

### 5️⃣ 動作確認

ダッシュボードが表示され、センサー類が自動検出されれば成功！🎉

---

## 🧯 よくあるつまずきと解決法

**① ブラウザで開けない**  
→ 同一LANに接続されているか確認。  
　必要なら --network host モードで再起動。

**② HomeKit連携できない**  
→ ルーターでmDNS（マルチキャスト）転送を有効にする。

**③ 設定が消えた**  
→ 永続ボリューム指定が抜けている。  
　docker-compose.yml 例（有料パート）で解決可。

**④ タイムゾーンがズレる**  
→ configuration.yaml に  
　time\_zone: Asia/Tokyo を追加、または TZ=Asia/Tokyo を指定。

---

## 📊 実際に動かしてみた感想

Mac miniで1週間連続稼働しても、

- CPU使用率：10〜15%前後
- 消費電力：平均12W
- ファン音：ほぼ無音

Frigateを追加しても安定稼働。録画と通知を両立できるだけの余裕があります。  
「電気代より静音・安定性を優先したい」人にはベストです。

---

## 💬 有料パート（後半）

💡ここから先では、すぐ使える **構築テンプレートZIP** を配布します。

¥ 100

[ログイン](https://note.com/login?redirectPath=%2Fysk373%2Fn%2Fn49ee6da26ac0)

- [
	#スマートホーム
	](https://note.com/hashtag/%E3%82%B9%E3%83%9E%E3%83%BC%E3%83%88%E3%83%9B%E3%83%BC%E3%83%A0)
- [
	#docker
	](https://note.com/hashtag/docker)
- [
	#RaspberryPi
	](https://note.com/hashtag/RaspberryPi)
- [
	#Macmini
	](https://note.com/hashtag/Macmini)
- [
	#自宅サーバー
	](https://note.com/hashtag/%E8%87%AA%E5%AE%85%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC)
- [
	#省電力
	](https://note.com/hashtag/%E7%9C%81%E9%9B%BB%E5%8A%9B)
- [
	#HomeAssistant
	](https://note.com/hashtag/HomeAssistant)
- [
	#Mac活用術
	](https://note.com/hashtag/Mac%E6%B4%BB%E7%94%A8%E8%A1%93)
- [
	#Frigate
	](https://note.com/hashtag/Frigate)
- [
	#もんたのHA構築記録
	](https://note.com/hashtag/%E3%82%82%E3%82%93%E3%81%9F%E3%81%AEHA%E6%A7%8B%E7%AF%89%E8%A8%98%E9%8C%B2)