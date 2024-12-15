---
title: XCodeでhidapi.hをインクルードしようとしたらcwcharでエラーが出た話
date: 2024-11-24
description: "Fusion360のアドインをC++で作成しようとしたところ、ビルドで詰まったので備忘録を書きました。"
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

プロジェクト設定から、`Build Settings > Search Paths > Header Search Paths`にいき、以下の値を設定しました。

```
/opt/homebrew/include	recursive
```

![Header Search Pathsに値を設定する様子](/blogImage/xcode-include-setting-error-path-setting.webp)

ここでビルドすると、おしまいの画面が表示されます。

![おしまいの画面](/blogImage/xcode-include-setting-error-cwchar-error.webp)

エラー文を見るとグローバルな名前空間に関数が見当たらないよ〜と言われていますね。

```sh
/opt/homebrew/include/c++/14/cwchar:64:11 No member named 'mbstate_t' in the global namespace

/opt/homebrew/include/c++/14/cwchar:141:11 No member named 'wint_t' in the global namespace

/opt/homebrew/include/c++/14/cwchar:143:11 No member named 'btowc' in the global namespace

/opt/homebrew/include/c++/14/cwchar:144:11 No member named 'fgetwc' in the global namespace

/opt/homebrew/include/c++/14/cwchar:145:11 No member named 'fgetws' in the global namespace

/opt/homebrew/include/c++/14/cwchar:146:11 No member named 'fputwc' in the global namespace

/opt/homebrew/include/c++/14/cwchar:147:11 No member named 'fputws' in the global namespace

/opt/homebrew/include/c++/14/cwchar:148:11 No member named 'fwide' in the global namespace

/opt/homebrew/include/c++/14/cwchar:149:11 No member named 'fwprintf' in the global namespace

/opt/homebrew/include/c++/14/cwchar:150:11 No member named 'fwscanf' in the global namespace

/opt/homebrew/include/c++/14/cwchar:151:11 No member named 'getwc' in the global namespace

/opt/homebrew/include/c++/14/cwchar:152:11 No member named 'getwchar' in the global namespace

/opt/homebrew/include/c++/14/cwchar:153:11 No member named 'mbrlen' in the global namespace

/opt/homebrew/include/c++/14/cwchar:154:11 No member named 'mbrtowc' in the global namespace

/opt/homebrew/include/c++/14/cwchar:155:11 No member named 'mbsinit' in the global namespace

/opt/homebrew/include/c++/14/cwchar:156:11 No member named 'mbsrtowcs' in the global namespace

/opt/homebrew/include/c++/14/cwchar:157:11 No member named 'putwc' in the global namespace

/opt/homebrew/include/c++/14/cwchar:158:11 No member named 'putwchar' in the global namespace

/opt/homebrew/include/c++/14/cwchar:160:11 No member named 'swprintf' in the global namespace

```

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
