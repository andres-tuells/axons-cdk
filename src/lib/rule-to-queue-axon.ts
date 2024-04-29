import { Rule } from 'aws-cdk-lib/aws-events';
import { SqsQueue } from 'aws-cdk-lib/aws-events-targets';
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import {} from 'aws-cdk-lib/aws-lambda-event-sources';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

export class RuleToQueueAxon extends Construct {
  constructor(scope: Construct, id: string, source: Rule, target: Queue) {
    super(scope, id);
    source.addTarget(new SqsQueue(target));
    target.grantSendMessages(
      new ServicePrincipal('events.amazonaws.com', {
        conditions: {
          ArnEquals: { 'aws:SourceArn': source.ruleArn }
        }
      })
    );
  }
}
