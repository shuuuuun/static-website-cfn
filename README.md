# static-website-cfn

静的サイトを手軽に構築しちゃうやーつ

## How to use

1. プロジェクトのディレクトリにファイルをコピー
1. envファイルの中身を状況に合わせて変更
1. `functions/basic_auth/`以下の`allow-ips.js`, `allow-passwd.js`, `allow-uas.js`を適宜変更
1. `bin/init`を実行 （※失敗したら中身のコマンドを順番に実行する）
1. `lambda_func_arn.txt`が更新されるのでコミットするとよいでしょう
1. S3に適当なhtmlファイルを置いて確認してみましょう
    * `bin/s3-upload-sample`でサンプルhtmlをアップロードできます
1. ドメインの設定は入れてないので手動でやりましょう
1. 完成！

## Notes

* `bin/init`の中身は下記を実行している
    1. `bin/create-role`
    1. `bin/lambda-init`
    1. `bin/lambda-publish`
    1. `bin/cfn-init`
* productionなど別のステージを作成する場合は、環境変数STAGEを設定して`bin/cfn-init`を実行する（デフォルトはstaging）
    ```
    $ STAGE=production bin/cfn-init
    ```
* envファイルの`USER_AGENT_FOR_ACCESS_RESTRICTION`に適当な文字列を設定すると、UserAgentヘッダを利用してS3への直アクセスを概ね防止できます
* CFnの設定(CFやS3の設定)を変更した場合は、`bin/cfn-update`を実行する
* lambda関数を変更した場合は、`bin/lambda-deploy`, `bin/lambda-publish`, `bin/cfn-update`を実行する
* `bin/cf-wait`というCFのデプロイ完了を教えてくれる便利コマンドもあるよ
* このCFnでずっと運用するというよりは、初期設定をミスなく手軽にしようというくらいのイメージです
    * 手動でCFやS3などの設定を変えた場合は、その後CFnデプロイすると元に戻ってしまうので注意！

## Diagram

![diagram](https://user-images.githubusercontent.com/7542105/34598264-f970ac20-f22e-11e7-8c8c-8454fc3a4ac6.png)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/shuuuuun/static-website-cfn.

## License

Copyright (c) 2018 shuuuuun  
Released under the MIT license  
http://opensource.org/licenses/mit-license.php
