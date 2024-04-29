import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import {
  SnsEventSourceProps
} from 'aws-cdk-lib/aws-lambda-event-sources';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { SqsSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

export class TopicToQueueAxon extends Construct {
  constructor(
    scope: Construct,
    id: string,
    source: Topic,
    target: Queue,
    props?: SnsEventSourceProps
  ) {
    super(scope, id);
    // Setup the SQS queue subscription to the SNS topic
    source.addSubscription(new SqsSubscription(target, props));

    // Grant SNS service access to the SQS queue encryption key
    if (target.encryptionMasterKey) {
      target.encryptionMasterKey.grant(new ServicePrincipal("sns.amazonaws.com"),
        'kms:Decrypt',
        'kms:GenerateDataKey*',
      );
    }
  }
}
