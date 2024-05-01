import { Function as LambdaFunction } from 'aws-cdk-lib/aws-lambda';
import { Queue } from 'aws-cdk-lib/aws-sqs';

export type FunctionToQueuePermission = 'send' | 'consume' | 'purge';

export type FunctionToQueueAxonProps = {
  permissions?: FunctionToQueuePermission[];
  queueEnvironmentVariableName?: string;
};

export function functionToQueueAxon(
  source: LambdaFunction,
  target: Queue,
  props?: FunctionToQueueAxonProps
) {
  const propsWithdefaults = {
    permissions: ['send'],
    queueEnvironmentVariableName: 'QUEUE_URL',
    ...props
  };
  source.addEnvironment(
    propsWithdefaults.queueEnvironmentVariableName,
    target.queueUrl
  );
  propsWithdefaults.permissions.forEach(
    (permission: FunctionToQueuePermission) => {
      switch (permission) {
        case 'send':
          target.grantSendMessages(source);
          break;
        case 'consume':
          target.grantConsumeMessages(source);
          break;
        case 'purge':
          target.grantPurge(source);
          break;
      }
    }
  );
}
