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

resource "aws_subnet" "snPrivate1" {
  availability_zone = "ap-northeast-1a"
  cidr_block ="10.0.2.0/24"
  vpc_id = local.aws_vpc_vpc_id
}

resource "aws_subnet" "snPrivate2" {
  availability_zone = "ap-northeast-1c"
  cidr_block ="10.0.3.0/24"
  vpc_id = local.aws_vpc_vpc_id
}
