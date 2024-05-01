import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { SnsEventSourceProps } from 'aws-cdk-lib/aws-lambda-event-sources';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { SqsSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Queue } from 'aws-cdk-lib/aws-sqs';

export function topicToQueue(
  source: Topic,
  target: Queue,
  props?: SnsEventSourceProps
): void {
  // Setup the SQS queue subscription to the SNS topic
  source.addSubscription(new SqsSubscription(target, props));

  // Grant SNS service access to the SQS queue encryption key
  if (target.encryptionMasterKey) {
    target.encryptionMasterKey.grant(
      new ServicePrincipal('sns.amazonaws.com'),
      'kms:Decrypt',
      'kms:GenerateDataKey*'
    );
  }
}
