variable "bucket_name" {
  description = "The name of the S3 bucket to create"
  type        = string
  default = "mybucket"
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