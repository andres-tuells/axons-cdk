import { Function as LambdaFunction } from 'aws-cdk-lib/aws-lambda';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { merge } from 'lodash';

export type FunctionToTopicAxonProps = {
  topicArnEnvironmentVariableName?: string;
  topicNameEnvironmentVariableName?: string;
};

export class FunctionToTopicAxon extends Construct {
  constructor(
    scope: Construct,
    id: string,
    source: LambdaFunction,
    target: Topic,
    props?: FunctionToTopicAxonProps
  ) {
    super(scope, id);
    const propsWithdefaults = merge(
      {
        topicNameEnvironmentVariableName: 'TOPIC_NAME',
        topicArnEnvironmentVariableName: 'TOPIC_ARN'
      },
      props
    );
    source.addEnvironment(
      propsWithdefaults.topicNameEnvironmentVariableName,
      target.topicName
    );
    source.addEnvironment(
      propsWithdefaults.topicArnEnvironmentVariableName,
      target.topicArn
    );
    target.grantPublish(source);
  }
}
