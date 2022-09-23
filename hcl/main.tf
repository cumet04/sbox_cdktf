terraform {
  required_providers {
    aws = {
      source  = "aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    // to initialize, $ terraform init -backend-config="bucket=$BACKEND_BUCKET"
    key    = "sbox_cdktf.terraform.tfstate"
    region = "ap-northeast-1"
  }
}
