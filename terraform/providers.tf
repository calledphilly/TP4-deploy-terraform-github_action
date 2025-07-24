terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "6.4.0"
    }
  }
  backend "s3" {
    bucket = "terraform-backend-terraformbackends3bucket-briwblccrvlk"
    key = "terraform.tfstate"
    region = "eu-west-1"
    dynamodb_table = "terraform-backend-TerraformBackendDynamoDBTable-16XI0CRUAIC7F"
  }
}

provider "aws" {
  region = "eu-west-1"
}