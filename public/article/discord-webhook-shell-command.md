---
title: Discord Webhookでシェルコマンドの実行結果を通知するコマンドを作成した
date: 2025-01-13
description: Discord Webhookを使用して、シェルコマンドの実行結果を即座に通知するシンプルなシェル関数を作成しました。成功・失敗を視覚的に確認でき、サーバー管理やスクリプト実行時に役立ちます。
---

# 背景

先日、期末課題でバカみたいな量の形態素解析をかけたら、死ぬほど時間がかかった。重い処理を行うときは基本放置して待っている間にSNSやyoutubeなどを見ることが多いが、そうすると処理が終わったのに気付かずに時間が溶けていってしまう。コマンドが終わった時に通知が来るといいな〜と思ってこのコマンドを作成した。

# 実装

## 前提

`jq`を使用しているため、入れていない場合は

```sh
$ brew install jq
```

でインストールする必要がある。

## コード

以下のコードを`.zshrc`に追加する。

```sh
function wh() {
  "$@"
  local command_result=$?
  local webhook_url=<YOUR_WEBHOOK_URL>
  local title color

  if [ -z "$*" ]; then
    local request_body=$(jq -n \
    '{username: "Shell Notify", embeds: [{title: "The command has been executed!", color: 12632256 }]}')

    curl -X POST -H "Content-Type: application/json" -d "$request_body" "$webhook_url"
  else
    if [ $command_result -eq 0 ]; then
      title=":white_check_mark: Success!"
      color=65280
    else
      title=":x: Failed..."
      color=16711680
    fi
    local request_body=$(jq -n \
      --arg title "$title" \
      --argjson color $color \
      --arg command "$*" \
      --arg command_result "$command_result" \
      '{username: "Shell Notify", embeds: [{title: $title, color: $color, fields:[{ name: "Command", value: $command, inline: false }, { name: "Result", value: $command_result, inline: false }]}]}')

    curl -X POST -H "Content-Type: application/json" -d "$request_body" "$webhook_url"
  fi
}
```

.zshrc を保存した後、以下のコマンドで設定を反映する。

```sh
$ source ~/.zshrc
```

これで`wh`コマンドが使用可能になる。

## 使い方

以下のように、引数に実行したいコマンドを指定して使用する。

```sh
$ wh ls
```

`ls`コマンドが終了すると、discordにこのような通知がくるようになっている。

![成功時のイメージ](/blogImage/discord-webhook-shell-command/success.webp)

失敗すると、以下のようになる。

```sh
$ wh hoge
wh:1: command not found: hoge
```

![失敗時のイメージ](/blogImage/discord-webhook-shell-command/failed.webp)

## 解説

この関数では、ざっくり以下の処理を行っている。

1. `$@`を使用して、引数に指定されたコマンドを実行
2. `$?`を利用して、コマンドの終了ステータスを取得
3. `curl`コマンドで、Webhookに実行結果を送信

# 個人的知見

- embed、いいね
- 色を10進数表記することあるんだ
  - `10進数 = 赤 * 65536 + 緑 * 256 + 青`のように表現されるらしい
