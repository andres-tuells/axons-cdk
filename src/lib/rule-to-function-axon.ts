import { Rule } from 'aws-cdk-lib/aws-events';
import {
  LambdaFunction,
  LambdaFunctionProps
} from 'aws-cdk-lib/aws-events-targets';
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import {} from 'aws-cdk-lib/aws-lambda-event-sources';

export function ruleToFunctionAxon(
  source: Rule,
  target: IFunction,
  props?: LambdaFunctionProps
) {
  source.addTarget(new LambdaFunction(target, props));
  target.addPermission(`${source.ruleName}InvokePermission`, {
    principal: new ServicePrincipal('events.amazonaws.com'),
    sourceArn: source.ruleArn
  });
}
