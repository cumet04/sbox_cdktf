resource "aws_subnet" "snPrivate1" {
  availability_zone = "ap-northeast-1a"
  cidr_block ="10.0.2.0/24"
  vpc_id = "${module.cdktf.vpc_id}"
}
