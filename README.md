# static-website-cfn

## how to use

1. プロジェクトのディレクトリにファイルをコピー
1. envファイルの中身を状況に合わせて変更
1. `cloudformation.yml` の Parameters を状況に合わせて変更
1. `functions/basic_auth/`以下の`allow-ips.js`, `allow-passwd.js`, `allow-uas.js`を適宜変更
1. `bin/init`を実行

    * 中身は下記を実行している
    1. `bin/create-role`
    1. `bin/lambda-init`
    1. `bin/lambda-publish`
    1. `bin/cfn-init`

1. `lambda_func_arn.txt`が更新されるのでコミットするとよいでしょう
