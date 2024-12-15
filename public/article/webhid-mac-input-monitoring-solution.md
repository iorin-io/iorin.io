---
title: "MacでWebHIDの「NotAllowedError: Failed to open the device」を解決する方法"
date: 2024-12-16
description: "WebHIDを使用したWebアプリでHIDデバイスを開こうとしたところ、`NotAllowedError: Failed to open the device`というエラーで詰まったので、メモがてら記録を残しました。"
---

先日、WebHIDを使用したWebアプリでHIDデバイスを開こうとしたところ、`NotAllowedError: Failed to open the device`というエラーで詰まったので、メモがてら記録を残しておきます。

# 問題の概要

WebHIDを使用してHIDデバイスに接続しようとした際、次のエラーが出力された。

```sh
NotAllowedError: Failed to open the device.
```

## 現象

### 環境

環境は以下の通り

- OS: Sonoma 14.5
- Browser: Google Chrome 131.0.6778.140
- 接続デバイス XIAO RP2040

### エラーが発生した経緯

- デバイスをMacにUSB-Cケーブルで接続
- Webアプリ上のデバイス選択ボタンをクリック
- デバイスはChromeのデバイス選択ダイアログに表示される
- XIAO RP2040をクリック
- `NotAllowedError`が出る

エラーを吐いていたコードはこの部分

```ts
export async function connectHIDDevice(): Promise<void> {
	try {
		const devices = await navigator.hid.requestDevice({
			filters: [
				{
					usagePage: 0x01,
				},
			],
		});

		if (devices.length === 0) {
			throw new Error("No devices selected");
		}

		connectedDevice = devices[0];
		if (!connectedDevice.opened) {
			await connectedDevice.open();
		}
	} catch (error) {
		console.error("Failed to connect device", error);
		throw error;
	}
}
```

どうやら`connectedDevice.open();`がうまくいっていないようだった。

# 原因

Macのセキュリティと権限まわりが原因だった。

# 解決策

- システム設定 > プライバシーとセキュリティ > 入力監視 に移動
- Chrome を ON に
- Chromeを再起動
