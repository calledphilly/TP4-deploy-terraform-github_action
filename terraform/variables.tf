variable "bucket_name" {
  description = "The name of the S3 bucket to create"
  type        = string
  default = "mysuperbucketdepoulet"
}

variable "tags" {
  type = object({
    Name = string
    Environment = string
  })
  default = {
    Name = "mytags"
    Environment = "Dev"
  }
}

variable "aws_region" {
  type = string
  default = "eu-west-1"
}