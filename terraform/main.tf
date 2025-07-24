resource "aws_s3_bucket" "core" {
  bucket = var.bucket_name
  tags   = var.tags
}