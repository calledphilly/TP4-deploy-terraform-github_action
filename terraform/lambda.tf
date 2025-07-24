# Package the Lambda function code
data "archive_file" "lambda_archive" {
  type = "zip"
  source_file = "${path.module}/lambda/lambda.mjs"
  output_path = "${path.module}/lambda/function.zip"
}

# Lambda function
resource "aws_lambda_function" "LambdaFunctionOverHttps" {
  filename = data.archive_file.lambda_archive.output_path
  function_name = "LambdaFunctionOverHttps"
  role = aws_iam_role.lambda_apigateway_role.arn
  handler = "lambda.handler"
  source_code_hash = data.archive_file.lambda_archive.output_base64sha256

  runtime = "nodejs20.x"

  environment {
    variables = {
      ENVIRONMENT = "production"
      LOG_LEVEL   = "info"
    }
  }

  tags = var.tags
}