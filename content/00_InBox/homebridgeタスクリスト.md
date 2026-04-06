https://docs.google.com/presentation/d/17-JemzuOWXMn3OX1GTjZvmFUcPy7tQHB1_yZ9GsjEtM/edit?usp=sharing

Mac miniを「ホームサーバー」として活用するための、さらに丁寧なステップバイステップガイドを作成しました。初心者の方でも、ターミナルの操作に迷わないようコマンドの意味を含めて解説します。

---

## 🏗️ Homebridge 構築・完全ガイド

### Phase 1：Mac mini 本体のサーバー化（物理・OS設定）

まずは、Mac miniが24時間眠らずに働ける環境を整えます。

1. **スリープの徹底排除**
    
    - 「システム設定」＞「省エネルギー」＞「**ディスプレイがオフのときにコンピュータを自動でスリープさせない**」を**オン**。
        
2. **停電対策**
    
    - 「システム設定」＞「省エネルギー」＞「**停電後に自動的に起動**」を**オン**。
        
3. **リモート操作の準備**（MacBook Airから操作するために必須）
    
    - 「システム設定」＞「一般」＞「共有」＞「**画面共有**」を**オン**。
        
4. **住所（IPアドレス）の固定**
    
    - Mac miniのIPアドレスが変わると接続できなくなります。ルーターの設定画面から、Mac miniのMACアドレスに対してIPアドレス（例: `192.168.1.50`）を固定割り当てしてください。
        

---

### Phase 2：Node.js と Homebridge のインストール

Homebridgeを動かすための「エンジン」である Node.js の導入から始めます。

#### ① Node.js をインストールする

1. [Node.js 公式サイト](https://nodejs.org/)にアクセスし、**「LTS（推奨版）」**をダウンロードしてインストールしてください。
    
2. 完了後、Macの「ターミナル」アプリを開き、以下のコマンドを打って数字が表示されれば成功です。
    
    Bash
    
    ```
    node -v
    npm -v
    ```
    

#### ② Homebridge 本体をインストールする

ターミナルに以下のコマンドを1行ずつコピー＆ペーストして、Enterキーを押してください。

1. **Homebridgeのインストール**（パスワードを求められたらMacのログインパスワードを入力）
    
    Bash
    
    ```
    sudo npm install -g --unsafe-perm homebridge homebridge-config-ui-x
    ```
    
2. **バックグラウンド実行（サービス化）の設定**
    
    これを実行することで、Macを起動したときに自動でHomebridgeが立ち上がります。
    
    Bash
    
    ```
    sudo hb-service install --user $(whoami)
    ```
    
    - ※もし「Port 8581 is already in use」と出たら、末尾に `--port 8582` と付けて実行し直してください。
        

#### ③ 管理画面にログインする

ブラウザ（Safariなど）を開き、アドレス欄に `http://localhost:8581` （または固定したIPアドレス:8581）と入力します。初期設定画面が出るので、ユーザー名とパスワードを作成してください。

---

### Phase 3：Nature Remo 連携（エアコン・照明など）

1. **アクセストークンの取得**
    
    - [Nature Remo Cloud API](https://home.nature.global/) にログインし、「Generate Access Token」をクリック。表示された長い文字列をメモ帳にコピーします。
        
2. **プラグインの導入**
    
    - Homebridge管理画面の「プラグイン」タブで `nature remo` を検索。
        
    - `homebridge-nature-remo-cloud-utils` または `@kryker/homebridge-nature-remo-platform` をインストール。
        
3. **設定（Config）**
    
    - 設定画面の「Access Token」欄に、先ほどメモした文字列を貼り付けて「保存」→「再起動（右上の電源ボタン）」。これでiPhoneの「ホーム」アプリに家電が現れます。
        

---

### Phase 4：TP-Link Kasa 連携（スマートプラグ）

1. **プラグインの導入**
    
    - 「プラグイン」で `homebridge-tplink-smarthome` を検索し、インストール。
        
2. **自動検出**
    
    - Kasaデバイス（スマートプラグ等）がMac miniと同じWi-Fiに繋がっていれば、設定不要で自動認識されます。
        
    - **注意：** Kasaアプリの設定で「認証」や「ローカル制御」の設定が必要なモデルがあるため、反映されない場合はアプリ側の設定を確認してください。
        

---

### 🚨 トラブル遭遇時の「お守り」コマンド集

作業が止まってしまったら、以下のコマンドをターミナルで試してください。

|**症状**|**原因**|**解決コマンド**|
|---|---|---|
|**権限エラー (EACCES)**|ファイルをいじる権限がない|`sudo chown -R $(whoami) ~/.npm`|
|**Nodeを上げたら動かない**|リンクの破損|`sudo hb-service rebuild-nodejs`|
|**ポート 8581 重複エラー**|古いプロセスが残存|`sudo lsof -i :8581` でPIDを確認し、`sudo kill -9 [数字]`|
|**最新プラグインが動かない**|Nodeのバージョンが古い|`sudo hb-service update-node`|

---

### 📈 運用のコツ

- **バックアップの習慣：** 設定が完了したら、管理画面の「バックアップ・アーカイブ」を必ずダウンロードし、iCloudやMacBook Airへ保存しておきましょう。
    
- **iPhoneからの仕上げ：** Homebridgeの管理画面に出るQRコードを、iPhoneの「ホーム」アプリで「アクセサリを追加」から読み込めば、すべての連携デバイスが一気に登録されます。