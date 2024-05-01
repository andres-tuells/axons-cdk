import { Function as LambdaFunction } from 'aws-cdk-lib/aws-lambda';
import { Topic } from 'aws-cdk-lib/aws-sns';

export type FunctionToTopicAxonProps = {
  topicArnEnvironmentVariableName?: string;
  topicNameEnvironmentVariableName?: string;
};

export function functionToTopic(
  source: LambdaFunction,
  target: Topic,
  props?: FunctionToTopicAxonProps
): void {
  const propsWithdefaults = {
    topicNameEnvironmentVariableName: 'TOPIC_NAME',
    topicArnEnvironmentVariableName: 'TOPIC_ARN',
    ...props
  };
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
