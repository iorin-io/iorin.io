export type PhotoType = {
    id: string; // 写真のID
    createdAt: string; // 作成日時
    updatedAt: string; // 更新日時
    publishedAt: string; // 公開日時
    revisedAt: string; // 改訂日時
    photo: {
        url: string; // 写真のURL
        height: number; // 写真の高さ
        width: number; // 写真の幅
    };
    caption: string; // 写真の説明
    album: {
        id: string; // アルバムのID
        createdAt: string; // アルバムの作成日時
        updatedAt: string; // アルバムの更新日時
        publishedAt: string; // アルバムの公開日時
        revisedAt: string; // アルバムの改訂日時
        name: string; // アルバムの名前
    };
};

export type AlbumType = {
    id: string; // アルバムのID
    createdAt: string; // 作成日時
    updatedAt: string; // 更新日時
    publishedAt: string; // 公開日時
    revisedAt: string; // 改訂日時
    name: string; // アルバム名
};


export type AlbumSelectorProps = {
    album: AlbumType[]; // アルバムのリスト
    selectedAlbum: string; // 選択されたアルバム
    setSelectedAlbum: (album: string) => void; // アルバム選択を更新する関数
};