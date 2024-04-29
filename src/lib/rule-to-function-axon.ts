import { Rule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import {} from 'aws-cdk-lib/aws-lambda-event-sources';
import { Construct } from 'constructs';

export class RuleToFunctionAxon extends Construct {
  constructor(scope: Construct, id: string, source: Rule, target: IFunction) {
    super(scope, id);
    source.addTarget(new LambdaFunction(target));
    target.addPermission(`${source.ruleName}InvokePermission`, {
      principal: new ServicePrincipal('events.amazonaws.com'),
      sourceArn: source.ruleArn
    });
  }
}
