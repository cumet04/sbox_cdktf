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

module "cdktf" {
  source = "./modules/cdktf"
  sn_public_ids = [aws_subnet.snPublic1.id, aws_subnet.snPublic2.id]
}

locals {
  aws_vpc_vpc_id = module.cdktf.vpc_id
}

resource "aws_subnet" "snPublic1" {
  availability_zone = "ap-northeast-1a"
  cidr_block ="10.0.0.0/24"
  vpc_id = local.aws_vpc_vpc_id
}

resource "aws_subnet" "snPublic2" {
  availability_zone = "ap-northeast-1c"
  cidr_block ="10.0.1.0/24"
  vpc_id = local.aws_vpc_vpc_id
}
