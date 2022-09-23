MODULE_JSON = hcl/modules/cdktf/cdk.tf.json

synth: $(MODULE_JSON)

$(MODULE_JSON): cdktf/src/*.ts
	cd cdktf; npx cdktf synth
	jq 'del(.terraform.backend)' cdktf/cdktf.out/stacks/cdktf/cdk.tf.json > $(MODULE_JSON)

.PHONY: synth
