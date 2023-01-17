# GitHub Flow 運用テスト リポジトリー<br><small>Ver1.0</small>

<br>

## 目次

1. [概要](#概要)
2. [６つのシンプルなルール](#６つのシンプルなルール)
3. [運用方法](#運用方法)
4. [リリース後のバグ修正](#リリース後のバグ修正)
5. [ケーススタディー](#ケーススタディー)
   <br><br><br>

## 概要

GitHub Flow は、**Git Flow** よりも **GitHub Flow**が優れているということではなく、単に開発スタイルの問題です。

頻繁にリリース（デプロイ）する GitHub の開発には「Git Flow」は適していませんでした。<br>逆に、「GitHub Flow」では**頻繁にリリースすること**を主軸においています。

**こちらは小〜中規模の案件に向いています。**

<img src="https://engineer-life.dev/wp-content/uploads/2020/06/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2020-06-07-14.54.22.png">

<br><br>

## Git Flow と GitHub Flow の違い

GitHub Flow は、よく Git Flow と比較されます。<br>ここでは、Git Flow との違いをみていきましょう。<br>
プロジェクトや開発スタイルによって、どちら向いているかは変わってきます。
<br><br>

### ブランチの種類

Git Flow では 6 種類のブランチを使い分けるのに対して、GitHub Flow では 2 種類のブランチ（main、topic）しか使いません。このため、Git Flow のほうがより厳格ですが、手間が多くなりがちです。場合によっては、そこまで必要ないと思うこともあるでしょう。
<br><br>

### リリースの扱い

Git Flow では、リリースのために新しいブランチを作ります。しかし、GitHub Flow では、main ブランチへのマージとリリース（デプロイ）はほぼ同義です。つまり、Git Flow ではリリースを特別なイベントと見なしていますが、GitHub Flow では日常の一部です。このため、main ブランチは常に安定している必要があります。

<br><br>

## GitHub Flow の ４つのルール

GitHub Flow は、6 つのルールから成り立っています。この 6 つのルールを守ることで、開発の流れができてきます。
<br><br>

### ・main ブランチは常にリリース可能な状態にしておく

GitHub Flow では、main ブランチへマージした時、すぐにデプロイを行います。そのため、main ブランチが不安定になるようなマージを行ってはいけません。
<br><br>

### ・かならず main ブランチから topic ブランチを切る

機能の追加・変更、バグフィックスの際には、main ブランチから topic ブランチを切って作業を行います。直接 main ブランチ上で作業してしまうことのないようにしましょう。
<br><br>

### ・命名規則は以下のように則る

- 機能追加：feature-機能を表す名称<br>
  例） feature-user-notice<br><br>
- バグフィックス：fix-修正を表す名称<br>
  例） fix-login-validation<br><br>
- 変更：mod-変更内容を表す名称<br>
  例）mod-color-change<br><br>

### ・プルリクエストを使ってコードレビューをする

GitHub Flow では、、頻繁にコードレビューを行うことになります。GitHub にはプルリクエストという機能があり、これを活用すると簡単にコードレビューが行えます。。
<br><br>

### ・コードレビューを通過したらすみやかにマージする

コードレビューを通過したら、できるだけ早くマージしましょう。あまり放置していると他の開発者とマージが衝突しやすくなってしまいます。

<br><br>

## GitHub Flow の 運用の流れ

### 1. 作業開始

main ブランチにチェックアウト後、作業ブランチを作成する

<pre>
git checkout -b 【ブランチ名(※ルール参照)】
</pre>
<br>
〜 作業中 〜
<br><br>

### 2. タスク完了後コミットを行う

各タスクでブランチを切っているためタスクが完了したら一度コミットする

1. 作業したファイルをステージングする。
<pre>
git add *
</pre>
2. コミットを行う
<pre>
git commit -m "コミットメッセージ"
</pre>
3. プッシュする
<pre>
git push origin implement-app-base
</pre>

<small>※origin…リモートリポジトリのことを指す</small>

   <br>
   <br>

### 3. プルリクエストを GitHub 上で行い、マージする。

1.  main ブランチ派生させたブランチは main ブランチにデータの上書きをしてよいかのリクエストを送らなければならない = プルリクエスト(プルリク)
    <br>
    <br>
2.  その後、プルリクを main ブランチに依頼し、main ブランチはなるべく早くマージさせる。
    <br>
    <br>
3.  マージ後、派生させたブランチは削除する。

<br>
<br>

### 4.ローカルブランチも削除する。

1. main ブランチにチェックアウト
<pre>
git checkout main
</pre>

2. 派生させたローカルブランチを削除
<pre>
git branch -D implement-app-base
</pre>

#### リモートブランチを削除したのにローカルリポジトリに残っている場合…

以下のコマンドで解決します。

<pre>
git remote prune origin
</pre>

<br>
<small>※削除されるものを確認したい場合</small>

<pre>
git remote prune origin --dry-run
</pre>

現在存在するリモートブランチを確認する

<pre>
git remote show origin
</pre>

<small>※origin…リモートリポジトリのことを指す</small>

<br><br>

### 5. ローカル main ブランチ(root)のデータを更新する(プル)

ローカルの master ブランチが古いままなので、リモート（GitHub）から pull して更新します。次のコマンドを入力すれば OK です。

<pre>
git pull origin main
</pre>

<small>※origin…リモートリポジトリのことを指す</small>

