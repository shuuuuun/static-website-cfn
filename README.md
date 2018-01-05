# static-website-cfn

## How to use

1. プロジェクトのディレクトリにファイルをコピー
1. envファイルの中身を状況に合わせて変更
1. `functions/basic_auth/`以下の`allow-ips.js`, `allow-passwd.js`, `allow-uas.js`を適宜変更
1. `bin/init`を実行
1. `lambda_func_arn.txt`が更新されるのでコミットするとよいでしょう
1. S3に適当なhtmlファイルを置いて確認してみましょう
1. ドメインの設定は入れてないので手動でやりましょう
1. 完成！

## Notes

* `bin/init`の中身は下記を実行している
    1. `bin/create-role`
    1. `bin/lambda-init`
    1. `bin/lambda-publish`
    1. `bin/cfn-init`
* staging/productionなどステージを分けて作成する場合は、envファイルの`STAGE`変数を変更し、`bin/cfn-init`を実行する
* CFnの設定(CFやS3の設定)を変更した場合は、`bin/cfn-update`を実行する
* lambda関数を変更した場合は、`bin/lambda-deploy`, `bin/lambda-publish`, `bin/cfn-update`を実行する
* `bin/cf-wait`というCFのデプロイ完了を教えてくれる便利コマンドもあるよ
