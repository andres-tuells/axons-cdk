import { Rule } from 'aws-cdk-lib/aws-events';
import { SqsQueue, SqsQueueProps } from 'aws-cdk-lib/aws-events-targets';
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import {} from 'aws-cdk-lib/aws-lambda-event-sources';
import { Queue } from 'aws-cdk-lib/aws-sqs';

export function ruleToQueueAxon(
  source: Rule,
  target: Queue,
  props?: SqsQueueProps
) {
  source.addTarget(new SqsQueue(target, props));
  target.grantSendMessages(
    new ServicePrincipal('events.amazonaws.com', {
      conditions: {
        ArnEquals: { 'aws:SourceArn': source.ruleArn }
      }
    })
  );
}
