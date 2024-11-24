---
title: XCodeでhidapi.hをインクルードしようとしたらcwcharでエラーが出た話
date: 2024-11-24
---

こんにちは。先日Fusion360のアドインをC++で作成しようとしたところ、ビルドで詰まったので備忘録を残しておきます。

# 環境

XCodeはVersion 16.1

clangはこんな感じ

```zsh
$ clang++ -v
Apple clang version 16.0.0 (clang-1600.0.26.4)
Target: arm64-apple-darwin23.5.0
Thread model: posix
InstalledDir: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin
```

# 発生した問題

`main.cpp`で`#include<hidapi.h>`しようとしました。

`hidapi`はデフォルトでは存在せず、`brew install`したため、XCodeでパスを通してあげる必要がありました。

プロジェクト設定から、`Build Settings > Search Paths > Header Search Paths`にいき、以下の値を登録しました。

```
/opt/homebrew/include	recursive
```

![Header Search Pathsに値を設定する様子](/blogImage/xcode-include-setting-error-path-setting.webp)

ここでビルドすると、おしまいの画面が表示されます。

![おしまいの画面](/blogImage/xcode-include-setting-error-cwchar-error.webp)

# 解決方法

`Header Search Paths`の指定方法が悪かったようです。

## 修正内容

以下のように設定を変更することで、問題が解決しました：

```
/opt/homebrew/include/hidapi   non-recursive
```

## 修正のポイント

recursive（再帰的探索）を指定すると、/opt/homebrew/include以下のすべてのディレクトリが検索対象になります。その結果、macOSのデフォルトC++環境と競合するヘッダーファイルやライブラリが誤って参照されたのではないかな？と思いました。
non-recursiveを指定し、hidapiディレクトリのみを探索対象とすることで、競合を回避できます。

```
/opt/homebrew/include/hidapi	non-recursive
```

# さいごに

普段XCode使わないので、解決策に辿り着くまでかなりの時間を消費してしまい結構しんどかったです。

XCodeでC++開発をする物好きがいるかわかりませんが、誰かの参考になれば幸いです。

それでは。
