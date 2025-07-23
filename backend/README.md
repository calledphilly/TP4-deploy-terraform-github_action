# Backend configuration for Terraform

We create the backend configuration of our terraform by creating:
- The S3 bucket for our state file location
- The Dynamodb table for managing or lock file
- The KMS key for encrypting our S3 bucket

To deploy those resources, we use cloudformation and create a stack
To do it you have to make the file deploy.sh executable if you are using a linux or mac os OS
and deploy your config with the command : ./deploy.sh 