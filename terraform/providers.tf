terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.4.0"
    }
  }
  backend "s3" {
    bucket = "terraform-backend-terraformbackends3bucket-z4zqaq2pyhlv"
    key = "terraform.tfstate"
    region = "eu-west-1"
    dynamodb_table = "terraform-backend-TerraformBackendDynamoDBTable-1I2XRHJ5X3CIX"
  }
}

provider "aws" {
  region = "eu-west-1"
}