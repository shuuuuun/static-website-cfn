# static-website-cfn

## how to use

1. ファイルをコピー
1. envファイルの中身を状況に合わせて変更
1. `cloudformation.yml` の Parameters を状況に合わせて変更
1. `functions/basic_auth/`以下の`allow-ips.js`, `allow-passwd.js`, `allow-uas.js`を適宜変更
1. `bin/cfn-init`
1. `bin/lambda-init`
1. `bin/lambda-publish` (lambda_func_arn.txt が更新されるのでコミットする)
1. `bin/cfn-update`
